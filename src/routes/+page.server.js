import config from './config.js'
/* import env from "dotenv";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

env.config();

const firebaseConfig = {
    apiKey: "AIzaSyAJ53fI-qsgMJ9HEdnYv6chv7c--BX6x1w",
    authDomain: "svc-9e818.firebaseapp.com",
    projectId: "svc-9e818",
    storageBucket: "svc-9e818.appspot.com",
    messagingSenderId: "379021395912",
    appId: "1:379021395912:web:21e7213ee26e1544da22fd",
    measurementId: "G-604T6K2N18"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log('123')
console.log(process.env.APIKEY) */

export function load({ params }) {
    return config;
}