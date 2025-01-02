import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Messenger: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Messenger</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>Messenger stuff to go here.</IonContent>
        </IonPage>
    );
};

export default Messenger;
