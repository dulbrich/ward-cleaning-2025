import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton  } from '@ionic/react';
import ReactMarkdown from 'react-markdown';

const Instructions: React.FC = () => {
  const [instructions, setInstructions] = useState<string>('');

  useEffect(() => {
    fetch('/INSTRUCTIONS.md')
      .then(response => response.text())
      .then(text => setInstructions(text))
      .catch(error => console.error('Error fetching instructions:', error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
          <IonTitle>Instructions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ReactMarkdown>{instructions}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};

export default Instructions; 