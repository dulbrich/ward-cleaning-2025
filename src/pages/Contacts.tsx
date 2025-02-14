import React, { useState, useRef, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonSearchbar,
    IonMenuButton,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';
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
    const [doNotContactList, setDoNotContactList] = useState<Contact[]>([]);
    const [isEditDoNotContact, setIsEditDoNotContact] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('contacts');

    // Helper function to sort an array of contacts by last name alphabetically.
    const sortContactsByLastName = (contactsArray: Contact[]): Contact[] => {
        return [...contactsArray].sort((a, b) => a.lastName.localeCompare(b.lastName));
    };

    // Configure Fuse.js
    const fuse = new Fuse(contacts, {
        keys: ['firstName', 'lastName', 'phoneNumber'],
        threshold: 0.3, // Adjust the threshold for sensitivity
    });

    // Perform the search
    const results = searchQuery ? fuse.search(searchQuery).map((result: { item: any; }) => result.item) : contacts;

    // Load contacts and do not contact list from local storage on component mount
    useEffect(() => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            const parsedContacts = JSON.parse(storedContacts);
            setContacts(sortContactsByLastName(parsedContacts));
        }
        const storedDoNotContactList = localStorage.getItem('doNotContactList');
        if (storedDoNotContactList) {
            const parsedDoNotContacts = JSON.parse(storedDoNotContactList);
            setDoNotContactList(sortContactsByLastName(parsedDoNotContacts));
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

                    // Filter out contacts that are in the do not contact list
                    const filteredContacts = parsedContacts.filter(contact =>
                        !doNotContactList.some(doNotContact =>
                            doNotContact.firstName === contact.firstName &&
                            doNotContact.lastName === contact.lastName &&
                            doNotContact.phoneNumber === contact.phoneNumber
                        )
                    );

                    const sortedContacts = sortContactsByLastName(filteredContacts);
                    setContacts(sortedContacts);
                    localStorage.setItem('contacts', JSON.stringify(sortedContacts));
                },
            });
        }
    };

    const handleDeleteContact = (contactToDelete: Contact) => {
        const updatedContacts = contacts.filter(contact =>
            contact.firstName !== contactToDelete.firstName ||
            contact.lastName !== contactToDelete.lastName ||
            contact.phoneNumber !== contactToDelete.phoneNumber
        );
        const sortedUpdatedContacts = sortContactsByLastName(updatedContacts);
        setContacts(sortedUpdatedContacts);
        localStorage.setItem('contacts', JSON.stringify(sortedUpdatedContacts));

        // Add to do not contact list
        const updatedDoNotContactList = [...doNotContactList, contactToDelete];
        const sortedDoNotContact = sortContactsByLastName(updatedDoNotContactList);
        setDoNotContactList(sortedDoNotContact);
        localStorage.setItem('doNotContactList', JSON.stringify(sortedDoNotContact));
    };

    const handleRemoveFromDoNotContact = (contactToRemove: Contact) => {
        const updatedDoNotContactList = doNotContactList.filter(contact =>
            contact.firstName !== contactToRemove.firstName ||
            contact.lastName !== contactToRemove.lastName ||
            contact.phoneNumber !== contactToRemove.phoneNumber
        );
        const sortedUpdatedDoNotContactList = sortContactsByLastName(updatedDoNotContactList);
        setDoNotContactList(sortedUpdatedDoNotContactList);
        localStorage.setItem('doNotContactList', JSON.stringify(sortedUpdatedDoNotContactList));

        // Add back to contacts
        const updatedContacts = [...contacts, contactToRemove];
        const sortedUpdatedContacts = sortContactsByLastName(updatedContacts);
        setContacts(sortedUpdatedContacts);
        localStorage.setItem('contacts', JSON.stringify(sortedUpdatedContacts));
    };

    const showToast = (message: string) => {
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = 0; // Set duration to 0 to keep the toast on screen
        toast.buttons = [
            {
                text: 'Dismiss',
                role: 'cancel'
            }
        ];

        document.body.appendChild(toast);
        return toast.present();
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
            <IonContent color="light" className="ion-no-padding">
                <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value as string)}>
                    <IonSegmentButton value="contacts">
                        <IonLabel>Contact</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="doNotContact">
                        <IonLabel>Do Not Contact</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {selectedTab === 'contacts' && (
                    <IonCard mode="md">
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
                                                <IonButton slot="icon-only" color="danger" onClick={() => handleDeleteContact(contact)}>
                                                    <IonIcon icon={trashBin} />
                                                </IonButton>
                                            </IonButtons>
                                        )}
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                )}

                {selectedTab === 'doNotContact' && (
                    <IonCard mode="md">
                        <IonCardHeader className="ion-no-padding">
                            <IonToolbar color="secondary">
                                <IonTitle>DO NOT CONTACT</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton onClick={() => setIsEditDoNotContact(!isEditDoNotContact)} slot="end">
                                        {isEditDoNotContact ? 'Done' : 'Edit'}
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonCardHeader>
                        <IonCardContent className="ion-no-padding contacts-card-content">
                            <IonList className="ion-no-padding">
                                {doNotContactList.map((contact, index) => (
                                    <IonItem key={index}>
                                        <IonLabel>
                                            {contact.firstName} <b>{contact.lastName}</b>
                                        </IonLabel>
                                        <IonLabel slot="end">{contact.phoneNumber}</IonLabel>
                                        {isEditDoNotContact && (
                                            <IonButtons slot="end">
                                                <IonButton slot="icon-only" color="danger" onClick={() => handleRemoveFromDoNotContact(contact)}>
                                                    <IonIcon icon={trashBin} />
                                                </IonButton>
                                            </IonButtons>
                                        )}
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Contacts;

