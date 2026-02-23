import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword,
			name,
		});

		generateTokenAndSetCookie(user._id, res);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		res.status(200).json({
			success: true,
			message: "Password reset token generated",
			resetToken, // for testing
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;

		await user.save();

		res.status(200).json({
			success: true,
			message: "Password reset successful",
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};