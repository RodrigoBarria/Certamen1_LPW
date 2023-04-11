import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    deleteDoc,
    getDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9xgfM_pibFEGTTLRdlq2s2ZkwfjT8EYk",
    authDomain: "certamen1-6fd51.firebaseapp.com",
    projectId: "certamen1-6fd51",
    storageBucket: "certamen1-6fd51.appspot.com",
    messagingSenderId: "1022755220969",
    appId: "1:1022755220969:web:7ce589eb4b76efe7c92f78"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//función que retorna la base de datos
const db = getFirestore()

export const guardar = (nombre, apellido, especialidad, fecha, hora, nmedico) => {
    addDoc(collection(db, 'horasmedicas'), { nombre, apellido, especialidad, fecha, hora, nmedico })
}
//función que obtiene los datos de la base de datos, a través de un callback
export const obtener = (retorno) => {
    //onsnapshot es un listener que se ejecuta cada vez que hay un cambio en la base de datos
    onSnapshot(collection(db, 'horasmedicas'), retorno)
}
export const eliminarPaciente = (id) => {
    //deleteDoc es una función que recibe un documento, y luego lo elimina
    //doc es una función que recibe la base de datos, a la colección y lleva el id documento
    deleteDoc(doc(db, 'horasmedicas', id))
}
//getDoc es una función que recibe un id retorna un documento de la base de datos
export const obtenerUno = (id) => getDoc(doc(db, 'horasmedicas', id))

//Método o función que permite editar datos por su ID
export const editarPaciente = (id,datos) => {
    //UpdateDoc es una función que recibe un documento y un objeto, permitiendo editar el registro
    updateDoc(doc(db,'horasmedicas',id),datos)
}