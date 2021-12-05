import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {collection, addDoc, getDocs} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';
import '../firebaseConfig';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';


const Home: React.FC = () => {
  
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const storage = getStorage();
  const db = getFirestore();
  const [students, setStudents] = useState<Array<any>>([]);

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  useEffect(()=> {
    async function getData() {
      const querySnapShot = await getDocs(collection(db, "students"));
      console.log('querySnapShot:', querySnapShot);
      setStudents(querySnapShot.docs.map((doc) => ({...doc.data(), id:doc.id})));

      querySnapShot.forEach((doc) => {
        console.log('${doc.id} => ${doc.data()}');
        console.log('doc', doc);
      });
    }
    getData();
  }, [])

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name);
  };

  const insertHandler = async() => {
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, selectedFile as Blob).then(()=>{
      console.log('upload file success');
      getDownloadURL(ref(storage, fileName)).then((url)=>{
        addData(url);
      })
    })
  };

  const addData = async(url: string) => {
    try {
      const docRef = await addDoc(collection(db, "students"), {
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: fileName,
        fotoUrl: url
      });
      console.log("Document written with ID", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //useEffect(() => {
    //const addData = async() => {
      //try {
        //const docRef = await addDoc(collection(db, "users"), {
          //first: "Ada",
          //last: "Lovelace",
          //born: 1815
        //});
        //console.log("Document written with ID:", docRef.id);
      //} catch (e) {
        //console.error("Error adding document: ", e);
      //}
    //}
    //addData();
  //})


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">NIM</IonLabel>
          <IonInput ref={nim}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nama</IonLabel>
          <IonInput ref={nama}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prodi</IonLabel>
          <IonInput ref={prodi}></IonInput>
        </IonItem>
        <IonItem>
          <input type="file" onChange={fileChangeHandler}></input>
        </IonItem>
        <IonButton onClick={insertHandler}>Simpan</IonButton>
      </IonContent>
      <IonContent>
        <IonList>
        {students.map(student => (
            <IonItem key={student.id}>
              <IonAvatar slot="start">
                <img src={student.fotoUrl} />
              </IonAvatar>
              <IonLabel>
                {student.nim}
                <br/>
                {student.nama}
                <br/>
                {student.prodi}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
