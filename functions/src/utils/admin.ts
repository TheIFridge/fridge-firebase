import {getAuth} from "firebase/auth";
import {getApp, initializeApp} from "firebase/app";
import admin from "firebase-admin";
import config from "./config";

admin.initializeApp(config);

initializeApp(config);

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

const auth = getAuth(getApp());

export {admin, db, auth};
