import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { bookmarkOutline, peopleOutline, peopleSharp, chatbubbleOutline, chatbubbleSharp, calendarOutline, calendarSharp, megaphoneOutline, megaphoneSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Messenger',
    url: '/messenger',
    iosIcon: chatbubbleOutline,
    mdIcon: chatbubbleSharp
  },
  {
    title: 'Campaigns',
    url: '/campaigns',
    iosIcon: megaphoneOutline,
    mdIcon: megaphoneSharp
  },
  {
    title: 'Contacts',
    url: '/contacts',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
  {
    title: 'Schedule',
    url: '/schedule',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp
  },
  {
    title: 'Instructions',
    url: '/instructions',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonImg 
          src="/water-logo-large.png" 
          style={{ height: '200px', width: '200px', display: 'block', margin: '0 auto' }} 
        />
        <IonList id="inbox-list">
          <IonListHeader>Ward Cleaning</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
