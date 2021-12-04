import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonIcon, IonLabel, IonContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, isPlatform } from '@ionic/react';
import { add } from 'ionicons/icons';
import MemoriesContext, {Memory} from "../data/memories-context";
import { useHistory } from "react-router";
import { useRef, useState, useContext } from 'react';
import MemoryItem from '../components/MemoryItem';

const GoodMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type == 'good');

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
                        <MemoryItem key={memory.id} id={memory.id} base64Url={memory.base64Url} title={memory.title} lat={memory.lat} lng={memory.lng}/>
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