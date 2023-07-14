import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// En una aplicacion real esta informacion siempre debe estar en el servidor y desde el servidos solicitar la data
// a la base de datos para luego enviarla al frontend, incluso usando un archivo .env en el frontend no es apropiado
// por lo que agrego esta nota para aclarar que es solo por tratarse de un ejercicio

const firebaseConfig = {
  apiKey: "AIzaSyDCBGTF-JpocNWyRfqaC6gn0rjyoV_HIAo",
  authDomain: "multiplos-d88bd.firebaseapp.com",
  projectId: "multiplos-d88bd",
  storageBucket: "multiplos-d88bd.appspot.com",
  messagingSenderId: "748017388442",
  appId: "1:748017388442:web:bbd586771ff7f096708823",
  measurementId: "G-X90YPVHD7L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
