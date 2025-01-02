import React, { useState, useRef, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonListHeader, IonList, IonLabel, IonItem, IonIcon, IonCard, IonCardHeader, IonCardContent, IonSearchbar, IonMenuButton } from '@ionic/react';
import { search, trashBin } from 'ionicons/icons';
import './Contacts.css';
import Papa from 'papaparse';
import Fuse from 'fuse.js';

interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

    // Configure Fuse.js
    const fuse = new Fuse(contacts, {
        keys: ['firstName', 'lastName', 'phoneNumber'],
        threshold: 0.3, // Adjust the threshold for sensitivity
    });

    // Perform the search
    const results = searchQuery ? fuse.search(searchQuery).map((result: { item: any; }) => result.item) : contacts;

    // Load contacts from local storage on component mount
    useEffect(() => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results: Papa.ParseResult<any>) => {
                    const parsedContacts: Contact[] = results.data.map((contact: any) => ({
                        firstName: contact['First Name'],
                        lastName: contact['Last Name'],
                        phoneNumber: contact['Phone Number'],
                    }));
                    setContacts(parsedContacts);
                    localStorage.setItem('contacts', JSON.stringify(parsedContacts));
                },
            });
        }
    };

    const handleDeleteContact = (index: number) => {
        const updatedContacts = contacts.filter((_, i) => i !== index);
        setContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Contacts</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                Import
                            </label>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light" className="ion-padding">
                <IonCard>
                    <IonCardHeader className="ion-no-padding">
                        <IonToolbar color="secondary">
                            {isSearch ? (
                                <IonSearchbar
                                    ref={searchbarRef}
                                    value={searchQuery}
                                    onIonInput={(e) => setSearchQuery(e.detail.value!)}
                                    placeholder="Search Contacts"
                                    style={{ flex: 1, marginRight: '10px' }}
                                />
                            ) : (
                                <IonTitle>IMPORTED CONTACTS</IonTitle>
                            )}
                            <IonButtons slot="end">
                                <IonButton
                                    slot="icon-only"
                                    onClick={() => {
                                        setIsSearch(!isSearch);
                                        if (!isSearch) {
                                            setTimeout(() => searchbarRef.current?.setFocus(), 0);
                                        } else {
                                            setSearchQuery('');
                                        }
                                    }}
                                >
                                    {isSearch ? 'DONE' : <IonIcon icon={search} />}
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonCardHeader>
                    <IonCardContent className="ion-no-padding contacts-card-content">
                        <IonList className="ion-no-padding">
                            <IonItem color="light" lines="none">
                                CONTACTS
                                <IonButtons slot="end">
                                    <IonButton onClick={() => setIsEdit(!isEdit)} slot="end">
                                        {isEdit ? 'Done' : 'Edit'}
                                    </IonButton>
                                </IonButtons>
                            </IonItem>
                            {results.map((contact, index) => (
                                <IonItem key={index}>
                                    <IonLabel>
                                        {contact.firstName} <b>{contact.lastName}</b>
                                    </IonLabel>
                                    <IonLabel slot="end">{contact.phoneNumber}</IonLabel>
                                    {isEdit && (
                                        <IonButtons slot="end">
                                            <IonButton slot="icon-only" color="danger" onClick={() => handleDeleteContact(index)}>
                                                <IonIcon icon={trashBin} />
                                            </IonButton>
                                        </IonButtons>
                                    )}
                                </IonItem>
                            ))}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Contacts;

