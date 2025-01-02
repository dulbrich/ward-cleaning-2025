import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Schedule: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Schedule</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>Schedule stuff to go here.</IonContent>
        </IonPage>
    );
};

export default Schedule;

