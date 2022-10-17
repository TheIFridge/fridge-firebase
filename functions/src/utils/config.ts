import {FirebaseOptions} from "firebase/app";

// https://github.com/firebase/firebase-tools/issues/4239
const config: FirebaseOptions = {
  apiKey: "AIzaSyBjGNnd8K4U-cXarwJx-DBaU7DjxXFEMxY",
  authDomain: "ifridge-9bb1e.firebaseapp.com",
  databaseURL: "https://ifridge-9bb1e-default-rtdb.firebaseio.com",
  projectId: "ifridge-9bb1e",
  storageBucket: "ifridge-9bb1e.appspot.com",
  messagingSenderId: "505666645968",
  appId: "1:505666645968:web:09548759bb235a3d4293d5",
  measurementId: "G-51DJVT92FZ",
};

if (!config.apiKey) {
  throw new Error("Missing FireBase API Key");
}

export default config;
