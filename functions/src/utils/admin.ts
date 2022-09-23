import admin from "firebase-admin";
import config from "./config";

admin.initializeApp(config);

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

const auth = admin.auth();

export { admin, db, auth };