import { Directory, Filesystem } from "@capacitor/filesystem"
import { base64FromPath } from "@ionic/react-hooks/filesystem"
import { useRef, useState, useContext } from 'react';

import { IonRow, IonBackButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonButton, IonButtons, IonIcon, IonLabel, IonInput, IonSelect, IonSelectOption, IonContent, IonGrid} from '@ionic/react';
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import MemoriesContext, {Memory} from "../data/memories-context";
import { useHistory } from "react-router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios';

const NewMemory: React.FC = () => {
    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);
    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();
    const [lat, setLat] = useState<number>(-6);
    const [lng, setLng] = useState<number>(106);
    const url = "http://localhost/week10/insert_new_memories.php";

    const containerStyle ={
        width: '100%',
        height: '400px'
    }

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    }
    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined;
        preview: string;
    }>();
    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(photo);

        if(!photo || /*!photo.path ||*/ !photo.webPath){
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath
        });
    }

    const selectPos = (e: google.maps.MapMouseEvent) => {
        if(e.latLng?.lat()){ 
            setLat(e.latLng?.lat()); 
        }
        if(e.latLng?.lng()){ 
            setLng(e.latLng?.lng()); 
        }
    };

    //const addMemoryHandler = async () => {
        //const enteredTitle = titleRef.current?.value;
        //if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
            //return;
        //}
        
        //const fileName = new Date().getTime() + '.jpeg';
        //const base64 = await base64FromPath(takenPhoto!.preview);
        //await Filesystem.writeFile({
            //path: fileName,
            //data: base64,
            //directory: Directory.Data
        //});

        //memoriesCtx.addMemory(fileName,base64, enteredTitle.toString(), chosenMemoryType, lat, lng);
        //history.length > 0 ? history.goBack() : history.replace('/goodMemories');
    //};

    const insertHandler = async() => {
        const formData = new FormData();
        const enteredTitle = titleRef.current?.value;
        if (!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType) {
            return;
        }

        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });

        const id= Math.floor(Math.random()*100);
        const idString = id.toString();
        const lngString = lng.toString();
        const latString = lat.toString();
  
        formData.append('id', idString);
        formData.append('title', enteredTitle.toString());
        formData.append('imagePath', fileName);
        formData.append('type', chosenMemoryType);
        formData.append('base64url', base64);
        formData.append('lat', latString);
        formData.append('lng', lngString);
  
        axios.post(url, formData).then((res: any) =>{
            console.log(res);
        })
        history.length > 0 ? history.goBack() : history.replace('/goodMemories');

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>
                        Add New Memory
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        <IonContent>
            <IonRow>
                <IonInput placeholder="Memory Title" type="text" ref={titleRef}></IonInput>
            </IonRow>
            <IonGrid>
            <IonRow>
                <IonCol>
                    <IonLabel>Memory Type</IonLabel>
                    <IonSelect onIonChange={selectMemoryTypeHandler} placeholder="Memory Type">
                        <IonSelectOption value="good">Good Memory</IonSelectOption>
                        <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
                <IonCol>
                    <div className="image-preview">
                        {!takenPhoto && <h3>No photo chosen.</h3>}
                        {takenPhoto && <img src={takenPhoto.preview} alt="Preview"/>}
                    </div>
                    <IonButton fill="clear" onClick={takePhotoHandler}>
                        <IonIcon slot="start" icon={camera}/>
                        <IonLabel>Take Photo</IonLabel>
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <LoadScript googleMapsApiKey="AIzaSyDfXf90uHwFkq64vEChgADjJaBCoguuOkI">
                        <GoogleMap
                            onClick={selectPos}
                            mapContainerStyle={containerStyle}
                            center={{ lat: lat, lng: lng }}
                            zoom={10}>
                            <Marker position={{ lat: lat, lng: lng }} />
                        </GoogleMap>
                    </LoadScript>
                </IonCol>
            </IonRow>
            <IonRow className="ion-margin-top">
                <IonCol className="ion-text-center">
                    <IonButton onClick={insertHandler}>Add Memory</IonButton>
                </IonCol>
            </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
    )
}

export default NewMemory;