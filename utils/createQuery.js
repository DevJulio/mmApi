import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/app.js";
import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

async function getByParams(tabela, params) {
  try {
    const ref = collection(db, tabela);
    let whereConds = [];

    for (let w of params) {
      whereConds.push(where(w[0], w[1], w[2]));
    }
    const q = query(ref, whereConds);
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
    const newDate = new Date();
    const docRef = await addDoc(collection(db, tabela), {
      ...data,
      createdAt: {
        seconds: newDate.getTime() / 1000,
        nanoseconds: newDate.getMilliseconds(),
      },
    });
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
  const newDate = new Date();
  try {
    await updateDoc(docRef, {
      ...data,
      updatedAt: {
        seconds: newDate.getTime() / 1000,
        nanoseconds: newDate.getMilliseconds(),
      },
    });
    return { message: "update success", status: true };
  } catch (e) {
    console.log(e);
    return { message: "Error: ", e, status: false };
  }
}

async function updateWhere(tabela, payload, chave, valor) {
  try {
    const newDate = new Date();
    const ref = collection(db, tabela);
    const q = query(ref, where(chave, "==", valor));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const resArr = [];
      querySnapshot.forEach(async (docRes) => {
        const docRef = doc(db, tabela, docRes.id);
        resArr.push(
          await updateDoc(docRef, {
            ...payload,
            updatedAt: {
              seconds: newDate.getTime() / 1000,
              nanoseconds: newDate.getMilliseconds(),
            },
          })
        );
      });
      const updateRes = await Promise.all(resArr)
        .then(() => {
          return {
            status: true,
            message: "Atualizado com sucesso!",
          };
        })
        .catch((error) => {
          console.error(error);
          return {
            status: false,
            message: "Erro ao atualizar",
          };
        });
      return updateRes;
    } else {
      const response = {
        status: false,
        message: "sem correspondência.",
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    return { message: error, status: false };
  }
}
export {
  getByParam,
  getByDocId,
  createDocument,
  updateDocument,
  updateWhere,
  getByParams,
};
