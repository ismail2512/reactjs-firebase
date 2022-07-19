import { db } from '../Firebase';
import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const dataCollectionRef = collection(db, 'MyData');
class DataServices {
  addData = (newData) => {
    return addDoc(dataCollectionRef, newData);
  };
  updateData = (id, updatedData) => {
    const dataDoc = doc(db, 'MyData', id);
    return updateDoc(dataDoc, updatedData);
  };

  deleteData = (id) => {
    const dataDoc = doc(db, 'MyData', id);
    return deleteDoc(dataDoc);
  };
  getAllData = () => {
    return getDocs(dataCollectionRef);
  };

  getData = (id) => {
    const dataDoc = doc(db, 'MyData', id);
    return getDoc(dataDoc);
  };
}

export default new DataServices();
