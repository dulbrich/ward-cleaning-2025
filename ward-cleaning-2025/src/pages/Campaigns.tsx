import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Campaigns: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Campaigns</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>Campaigns stuff to go here.</IonContent>
        </IonPage>
    );
};

export default Campaigns;
