import { User } from '../models/user.js'
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from '../utils/generateToke.js';


export const signup = async (req, res) => {
    console.log("Signup function called");
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if (emailRegex.test(email)) {
        //     return res.status(400).json({ message: "Invalid email" });
        // }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be atleast 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const existingUserByUserName = await User.findOne({ username: username })

        if (existingUserByUserName) {
            return res.status(400).json({ message: "User with this username already exists" });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save()
            res.status(201).json({ success: true, message: "User created successfully" })
        } else {
            res.status(500).json({ success: false, message: "Internal server error" })
        }




    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: ""
            }
        })
    } catch (error) {
        console.log("Error in login controller", error.message)

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
    }
}
