import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const createUser = async (req, res) => {
    try {
        const { username, password,email } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the number of salt rounds

        // Create the user with the hashed password
        const user = await User.create({ username,email, password: hashedPassword });

        // Send the response with the created user (exclude password for security)
        res.status(201).json({
            id: user._id,
            username: user.username,
            email:user.email,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// export const createUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.create({username, password });
//         res.status(201).json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

export const updateUser = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const user = await User.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
