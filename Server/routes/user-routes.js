import express from "express";
import { getAllUsers, signUp, login } from "../controllers/user-controller";

const router = express.Router()

router.route('/')
    .get(getAllUsers)

router.route('/signup')
    .post(signUp)

router.route('/login')
    .post(login)

// router.route('/delete/:id')
//     .delete(deleteUser)

    

export default router