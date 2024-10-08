import { User } from '../models/user.js'


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

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password,
            username,
            image
        })

        await newUser.save()


    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    res.send("login route ");
}

export const logout = async (req, res) => {
    res.send("logout route ");
}
