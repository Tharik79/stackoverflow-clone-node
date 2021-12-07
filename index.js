import express from "express";
import{MongoClient} from "mongodb";
import dotenv from "dotenv";
import {usersRouter} from "./routes/users.js";


dotenv.config(); //all keys it will put in process
const app = express();
//const PORT = 9000; 
const PORT = process.env.PORT;

app.use(express.json());

//const PORT = process.env.PORT; // this code for heroku to autoassign the port after deploy there.
// const PORT = 9000; // change this to above code before deploy to heroku.

app.get('/', function (request, response) {
    response.send("Hello 🌏*****😀");
  });

  const MONGO_URL= process.env.MONGO_URL;            //"mongodb+srv://Tharik:welcome123@cluster0.ofjdk.mongodb.net";


  async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect(); //promise
    console.log("mongodb connected");
    return client;
  
  }
  export const client = await createConnection();

  app.use("/users", usersRouter);

app.listen(PORT, () => console.log("App is started in", PORT)
    );

  