import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Menu from './components/Menu';
//import Page from './pages/Page';
import Campaigns from './pages/Campaigns';
import Contacts from './pages/Contacts';
import Messenger from './pages/Messenger';
import Schedule from './pages/Schedule';
import Instructions from './pages/Instructions';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <SpeedInsights />
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/campaigns" exact={true}>
              <Campaigns />
            </Route>
            <Route path="/contacts" exact={true}>
              <Contacts />
            </Route>
            <Route path="/messenger" exact={true}>
              <Messenger />
            </Route>
            <Route path="/schedule" exact={true}>
              <Schedule />
            </Route>
            <Route path="/instructions" exact={true}>
              <Instructions />
            </Route>
            <Redirect exact from="/" to="/messenger" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
