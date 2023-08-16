import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/app.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { response } from "express";
const auth = getAuth(app);
const db = getFirestore(app);
const user = auth.currentUser;

async function getByParam(tabela, chave, valor) {
  try {
    const ref = collection(db, tabela);
    const q = query(ref, where(chave, "==", valor));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const response = {
        status: true,
        data: [],
      };
      querySnapshot.forEach((doc) => {
        response.data.push({ ...doc.data(), docId: doc.id });
      });
      return response;
    } else {
      const response = {
        status: false,
        message: "sem correspondência.",
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return response;
  }
}
async function getByDocId(tabela, id) {
  try {
    const docRef = doc(db, tabela, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const response = {
        status: true,
        data: docSnap.data(),
      };
      return response;
    } else {
      const response = {
        status: false,
        message: "sem correspondência.",
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return response;
  }
}
async function createDocument(tabela, data) {
  try {
    const docRef = await addDoc(collection(db, tabela), data);
    const message = {
      status: true,
      message: "Document written",
      id: docRef.id,
    };
    return message;
  } catch (e) {
    const message = {
      status: false,
      message: "Error adding document: ",
      error: e,
    };
    return message;
  }
}
async function updateDocument(tabela, data, docId) {
  const docRef = doc(db, tabela, docId);
  try {
    await updateDoc(docRef, data);
    return { message: "user update success", status: true };
  } catch (e) {
    console.log(e);
    return { message: "Error: ", e, status: false };
  }
}
export { getByParam, getByDocId, createDocument, updateDocument };
