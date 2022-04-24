import User from '../models/User'
import Blog from '../models/Blog'
import bcrypt from 'bcryptjs'

export async function getAllUsers(req, res) {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
// export async function getUserNameById(req, res) {
//     try {
//         const id = req.params.id
//         const user = await User.findById(id)
//         res.status(200).json({ user })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }


export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        else {
            const hashedPassword = bcrypt.hashSync(password)
            const user = new User({
                name,
                email,
                password: hashedPassword,
                blogs: []
            })
            await user.save()
            res.status(201).json({ user })
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: "No user found by this E-mail" })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "incorrect password" })
        }

        return res.status(200).json({ message: "login Successfull", user: existingUser })


    } catch (error) {
        res.status(500).json({ msg: error })
    }
}




// export async function deleteUser(req, res) {
//     try {
//         const userId = req.params.id

//         const deleteUser = await User.findByIdAndDelete(userId)

//         if (!deleteUser) {
//             return res.status(404).json({ message: "No user found to delete" })
//         }

//         res.status(200).json({ deleteUser, message: "User deleted successfully" })

//     } catch (error) {
//         res.status(500).json({ msg: error })
//         console.log(error);
//     }
// }