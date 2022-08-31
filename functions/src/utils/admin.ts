import admin from "firebase-admin";
import config from "./config";

admin.initializeApp(config);

const db = admin.firestore();

export { admin, db };