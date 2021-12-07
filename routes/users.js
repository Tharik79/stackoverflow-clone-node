import express from "express";
import { genPassword, createUser} from "../helper.js";
import {getUserByName} from "../helper.js";
import bcrypt from "bcrypt";


const router = express.Router();

router.route("/signup").post(async ( request, response) => {
    const { username, password} = request.body;

    const userFromDB = await getUserByName(username);

    console.log(userFromDB);

    //Below if condition code to check validation of the username and password
    //the below code is used to check the user exist in mongodb cloud.
    if(userFromDB) {
        response.status(400).send({ message:"username already exists"});
        return;
    }

    // status 400 is given for bad request in creating.
    if(password.length < 8) {
        response.status(400).send({ message: "password must be stronger"});
        return;
    }

    // now check the pattern of password below
    if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
    ) {
        response.status(400).send({message: "password pattern does not match" });
    }

    const hashedPassword = await genPassword(password);

    const result = await createUser({username, password: hashedPassword });
    response.send(result);
    //response.send

});

// below code is to check the credentials during login process.
router.route("/login").post(async (request, response) => {
    const {username, password} = request.body;
    const userFromDB =await getUserByName(username);
    if(!userFromDB) {
        response.status(400).send( {message: "invalid credentials"});
        return;
    }

    const storedPassword = userFromDB.password;
    console.log(storedPassword);

    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);

    if (isPasswordMatch) {
        response.send({message: "sucessful login"});
    } else {
        response.status(400).send( {message: "invalid credentials"});
    }

});

export const usersRouter = router;