import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonModal, IonButton, IonButtons, IonFab, IonFabButton, IonIcon, IonRadioGroup, IonRadio, IonList, IonTextarea } from '@ionic/react';
import { add, trashBin } from 'ionicons/icons';
import './Campaigns.css';

const Campaigns: React.FC = () => {
    const [template, setTemplate] = useState<string>('');
    const [savedTemplates, setSavedTemplates] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const textareaRef = useRef<HTMLIonTextareaElement>(null);

    useEffect(() => {
        const storedTemplates = JSON.parse(localStorage.getItem('savedCampaignTemplates') || '[]');
        setSavedTemplates(storedTemplates);
        const storedIndex = localStorage.getItem('selectedCampaignTemplateIndex');
        if (storedIndex !== null) {
            setSelectedTemplateIndex(parseInt(storedIndex, 10));
        }
    }, []);

    useEffect(() => {
        if (isModalOpen && textareaRef.current) {
            textareaRef.current.setFocus();
        }
    }, [isModalOpen]);

    const handleSaveTemplate = () => {
        const updatedTemplates = [...savedTemplates, template];
        setSavedTemplates(updatedTemplates);
        localStorage.setItem('savedCampaignTemplates', JSON.stringify(updatedTemplates));
        setSelectedTemplateIndex(updatedTemplates.length - 1);
        localStorage.setItem('selectedCampaignTemplateIndex', (updatedTemplates.length - 1).toString());
        setTemplate('');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setTemplate('');
        setIsModalOpen(false);
    };

    const handleSelectTemplate = (index: number) => {
        setSelectedTemplateIndex(index);
        localStorage.setItem('selectedCampaignTemplateIndex', index.toString());
    };

    const insertPlaceholder = (placeholder: string) => {
        setTemplate(template + placeholder);
    };

    const handleDeleteTemplate = (index: number) => {
        const updatedTemplates = savedTemplates.filter((_, i) => i !== index);
        setSavedTemplates(updatedTemplates);
        localStorage.setItem('savedCampaignTemplates', JSON.stringify(updatedTemplates));
        if (selectedTemplateIndex === index) {
            setSelectedTemplateIndex(null);
            localStorage.removeItem('selectedCampaignTemplateIndex');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Campaigns</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
                <IonCard className="ion-no-padding" color="light">
                    <IonToolbar color="secondary">
                        <IonTitle>Message Templates</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsEdit(!isEdit)}>
                                {isEdit ? 'Done' : 'Edit'}
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                    <IonCardContent className="ion-no-padding templates-card-content">
                        {isEdit ? (
                            <IonList className="ion-no-padding">
                                {savedTemplates.map((savedTemplate, index) => (
                                    <IonItem key={index}>
                                        <IonLabel>{savedTemplate}</IonLabel>
                                        <IonButtons slot="end">
                                            <IonButton slot="icon-only" color="danger" onClick={() => handleDeleteTemplate(index)}>
                                                <IonIcon icon={trashBin} />
                                            </IonButton>
                                        </IonButtons>
                                    </IonItem>
                                ))}
                            </IonList>
                        ) : (
                            <IonRadioGroup value={selectedTemplateIndex} onIonChange={(e) => handleSelectTemplate(e.detail.value)}>
                                {savedTemplates.map((savedTemplate, index) => (
                                    <IonItem key={index}>
                                        <IonLabel>{savedTemplate}</IonLabel>
                                        <IonRadio slot="start" value={index} />
                                    </IonItem>
                                ))}
                            </IonRadioGroup>
                        )}
                        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="ion-padding">
                            <IonFabButton color="secondary" onClick={() => setIsModalOpen(true)}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </IonCardContent>
                </IonCard>
                <IonModal isOpen={isModalOpen}>
                    <IonHeader>
                        <IonToolbar color="secondary">
                            <IonTitle>NEW CAMPAIGN</IonTitle>
                            <IonButtons slot="start">
                                <IonButton onClick={handleCancel}>CANCEL</IonButton>
                            </IonButtons>
                            <IonButtons slot="end">
                                <IonButton onClick={handleSaveTemplate}>SAVE</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-no-padding" color="light">
                        <IonList className="ion-no-padding">
                            <IonItem>
                                <IonLabel position="stacked">Template</IonLabel>
                                <IonTextarea
                                    ref={textareaRef}
                                    value={template}
                                    onIonChange={(e) => setTemplate(e.detail.value!)}
                                    placeholder="Enter your message template"
                                    rows={4}
                                    autoGrow={true}
                                />
                            </IonItem>  
                        </IonList>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="4">
                                    <IonCard button onClick={() => insertPlaceholder('{FirstName}')}>
                                        <IonCardContent className="ion-text-center">
                                            Insert First Name
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol size="4">
                                    <IonCard button onClick={() => insertPlaceholder('{LastName}')}>
                                        <IonCardContent className="ion-text-center">
                                            Insert Last Name
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol size="4">
                                    <IonCard button onClick={() => insertPlaceholder('{FullName}')}>
                                        <IonCardContent className="ion-text-center">
                                            Insert Full Name
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="4">
                                    <IonCard button onClick={() => insertPlaceholder('{Group}')}>
                                        <IonCardContent className="ion-text-center">
                                            Insert Group
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Campaigns;
