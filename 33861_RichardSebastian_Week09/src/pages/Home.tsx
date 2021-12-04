import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {GoogleMap, InfoWindow, LoadScript, Marker} from "@react-google-maps/api";
import {Geolocation} from '@capacitor/geolocation';
import { useState } from 'react';

const Home: React.FC = () => {

  const [lat,setLat] = useState(0);
  const [lng,setLng] = useState(0);

  const containerStyle ={
    width: '100%',
    height: '100%'
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});

    console.log('Current position', coordinates);
    console.log('Lat:', coordinates.coords.latitude);
    console.log('Lng:', coordinates.coords.longitude);
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){setLat(e.latLng?.lat()); }
    if(e.latLng?.lng()){setLng(e.latLng?.lat()); }
  }

  const trackPosition = async() => {
    const data = await Geolocation.watchPosition({
      enableHighAccuracy:true,
      timeout: 1000
    }, (position, err) =>{
      if(position){
        console.log(position);
      }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
        </IonRow>
        <IonRow>
          <IonCol>
            <LoadScript googleMapsApiKey ="AIzaSyDfXf90uHwFkq64vEChgADjJaBCoguuOkI">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{/*lat:-6.257377926995551, lng:106.61829861017398*/lat: lat, lng:lng}}
                    zoom={10}>
                    { /* Child component, such as markers, info windows, etc */}
                    <></>
                    <Marker position={{/*lat:-6.257377926995551, lng:106.61829861017398*/lat: lat, lng: lng}}/>
                    <InfoWindow position={{lat:-6.257377926995551, lng:106.61829861017398}}>
                      <div>
                        <h1>Kampus paling keren.</h1>
                      </div>
                    </InfoWindow>
                </GoogleMap>
            </LoadScript>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
