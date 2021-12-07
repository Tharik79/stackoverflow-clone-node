import bcrypt from "bcrypt";
import {client} from "./index.js";
import {ObjectId} from "mongodb";


async function createUser(data){
    return await client.db("guvi").collection("users").insertOne(data);

  }

  async function getUserByName(username) {
      return await client.db("guvi").collection("users").findOne({ username: username});
  }


  async function genPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;

  }

  export {getUserByName, createUser, genPassword,};
