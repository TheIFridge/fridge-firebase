import * as functions from "firebase-functions";
import express, { Express} from "express";
import { initializeApp } from "firebase/app";

import config from "@utils/config";
import loginUser from "@api/authentication/login";
import signUpUser from "@api/authentication/signup";
import { getUser, updateUser } from "@api/users/users";
import { isAuthenticated } from "@api/authentication/authentication";

initializeApp(config);

const app: Express = express();

app.post("/auth/login", loginUser);
app.post("/auth/register", signUpUser);

app.post("/users/:userId", isAuthenticated, updateUser);
app.get("/users/:userId", isAuthenticated, getUser);

exports.api = functions.https.onRequest(app);