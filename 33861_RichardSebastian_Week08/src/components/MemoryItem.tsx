import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";

const MemoryItem: React.FC<{ id: string, base64Url: string, title: string }> = props => {
    return (
        <IonRow key={props.id}>
                <IonCard>
                    <img src={props.base64Url} alt={props.title} />
                    <IonCardHeader>
                        <IonCardTitle>{props.title}</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
        </IonRow>
    );
}

export default MemoryItem;