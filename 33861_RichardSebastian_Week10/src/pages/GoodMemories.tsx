import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonIcon, IonLabel, IonContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, isPlatform } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from "react-router";
import { useRef, useState, useContext, useEffect, SetStateAction } from 'react';
import MemoryItem from '../components/MemoryItem';
import axios, { AxiosResponse } from 'axios';

interface Memory { id: string, image_path: string, title: string, type: string, base64Url: string,lat: string, lng: string}

const GoodMemories: React.FC = () => {
    const [data, setData] = useState<AxiosResponse>();
    //const goodMemories = memoriesCtx.memories.filter(memory => memory.type == 'good');
    const url="http://localhost/week10/select_all_memories.php";
    const [memories, setMemories] = useState<Array<Memory>>([]);
    const goodMemories = memories.filter(goodMemories => goodMemories.type == "good");

    useEffect(() => {
        axios.get(url).then((data) => {
          setData(data);
          console.log(data);
          setMemories(data?.data.memories);
        });}, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Good Memories
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
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No good memories found</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {goodMemories.map(memory => (
                        <MemoryItem key={memory.id} id={memory.id} base64Url={memory.base64Url} title={memory.title} lat={parseInt(memory.lat)} lng={parseInt(memory.lng)}/>
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

export default GoodMemories;