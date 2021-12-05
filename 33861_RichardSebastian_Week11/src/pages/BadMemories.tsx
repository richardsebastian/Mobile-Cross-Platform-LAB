import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonIcon, IonLabel, IonContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, isPlatform } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from "react-router";
import { useRef, useState, useContext, useEffect, SetStateAction } from 'react';
import MemoryItem from '../components/MemoryItem';
import axios, { AxiosResponse } from 'axios';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Memory { id: string, image_path: string, title: string, type: string, base64Url: string,lat: string, lng: string}

const BadMemories: React.FC = () => {
    const [data, setData] = useState<AxiosResponse>();
    const [memories, setMemories] = useState<Array<any>>([]);
    const db = getFirestore();
    //const goodMemories = memoriesCtx.memories.filter(memory => memory.type == 'bad');
    const badMemories = memories.filter(badMemories => badMemories.type == "bad");
    //const url="http://localhost/week10/select_all_memories.php";

    //useEffect(() => {
        //axios.get(url).then((data) => {
          //setData(data);
          //console.log(data);
          //setMemories(data?.data.memories);
        //});}, []);

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "memories"));
            console.log('querySnapshot: ', querySnapshot);
            setMemories(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                console.log('doc : ', doc);
            })
        }
    getData();
    }, []);
    

    return (
        <IonPage>
            {(() => {
                        if (isPlatform("ios")) {
                            return (
                                <>
                                    <IonButtons slot="end" >
                                        <IonButton href="/NewMemory">
                                            <IonIcon color="primary" slot="icon-only" icon={add} />
                                        </IonButton>
                                    </IonButtons>
                                </>
                            )
                        }
                    })()}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Bad Memories
                    </IonTitle>
                    {(() => {
                        if (isPlatform("ios")) {
                            return (
                                <>
                                    <IonButtons slot="end" >
                                        <IonButton href="/NewMemory">
                                            <IonIcon color="primary" slot="icon-only" icon={add} />
                                        </IonButton>
                                    </IonButtons>
                                </>
                            )
                        }
                    })()}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {badMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No bad memories found</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {badMemories.map(memory => (
                        <MemoryItem key={memory.id} id={memory.id} base64Url={memory.base64Url} title={memory.title} lat={parseInt(memory.lat)} lng={parseInt(memory.lng)} />
                    ))}
                </IonGrid>
                {(() => {
                    if (isPlatform("android")) {
                        return (
                            <>
                                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                    <IonFabButton href="/NewMemory">
                                        <IonIcon icon={add} />
                                    </IonFabButton>
                                </IonFab>
                            </>
                        )
                    }
                })()}
            </IonContent>
        </IonPage>
    )
}

export default BadMemories;