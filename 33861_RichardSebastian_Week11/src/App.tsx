import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonFab, IonFabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { add, happy, happyOutline, sad, sadOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import GoodMemories from './pages/GoodMemories';
import BadMemories from './pages/BadMemories';
import NewMemory from './pages/NewMemory';
import Home from './pages/Home';

const App: React.FC = () => {  
  return (
    <IonApp>
      <IonReactRouter>
        {/* <MemoriesContextProvider> */}
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/NewMemory" component={NewMemory} />
              <Route path="/BadMemories" component={BadMemories} />
              <Route path="/GoodMemories" component={GoodMemories} />
              <Redirect exact from="/" to="/GoodMemories" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" color="success" >
              <IonTabButton tab="GoodMemories" href="/GoodMemories">
                <IonIcon icon={happy} />
                <IonLabel>Good Memories</IonLabel>
              </IonTabButton>
              <IonTabButton tab="BadMemories" href="/BadMemories">
                <IonIcon icon={sad} />
                <IonLabel>Bad Memories</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        {/* </MemoriesContextProvider> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
