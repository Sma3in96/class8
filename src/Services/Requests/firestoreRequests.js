import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

import { db } from '../../firebase';


export async function addData(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return {
      status: "Ok",
      content: docRef
    };
  } catch (error) {
    return {
      status: "Error",
      content: error
    }
  }
}

export async function setData(collectionName, id, data, mergeData = true) {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: mergeData });
    return true;
  } catch (error) {
    console.error("Error setting data: ", error);
    return error;
  }
}

export async function queryFirestore(collectionName, options) {
  try {
    let q = collection(db, collectionName);

    if (options) {
      if (options.where) {
        options.where.forEach(condition => {
          q = query(q, where(...condition));
        });
      }
      if (options.orderBy) {
        q = query(q, orderBy(...options.orderBy));
      }
      if (options.limit) {
        q = query(q, limit(options.limit));
      }
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    return error;
  }
}
