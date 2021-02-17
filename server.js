import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import signinHandler from "./controllers/signin.js";
import imageHandler from "./controllers/image.js";
import profileHandler from "./controllers/profile.js";
// import Clarifai from 'clarifai'

// const app = new Clarifai.App({
// 	apiKey: "eea810b65864447c9ac8eb2fe6d540e2",
// });
console.log(process.env);
const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "5EuroBit",
		database: "facerecognition",
	},
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("sucess - process.env");
});

app.post("/signin", (req, res) => {
	signinHandler(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
	handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
	profileHandler(req, res, db);
});

app.put("/image", (req, res) => {
	imageHandler(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT} `);
});
