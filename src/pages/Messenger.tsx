import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonToast, IonList, IonItem, IonLabel, IonIcon, IonButtons, IonMenuButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { checkmarkCircle } from 'ionicons/icons';

interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface ScheduleEntry {
    date: string;
    group: string;
}

interface Template {
    [key: string]: string;
}

const Messenger: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
    const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('A-Z');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [contacted, setContacted] = useState<Set<number>>(new Set());

    useEffect(() => {
        const storedContacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
        const storedCampaign: number | null = JSON.parse(localStorage.getItem('selectedCampaignTemplateIndex') || 'null');
        const storedSchedule: ScheduleEntry[] = JSON.parse(localStorage.getItem('cleaningSchedule') || '[]');

        setContacts(storedContacts);
        setSelectedCampaign(storedCampaign);
        setSchedule(storedSchedule);

        if (!storedContacts.length || storedCampaign === null) {
            setToastMessage('Please ensure you have imported contacts, selected a campaign, and set a schedule.');
            setShowToast(true);
        } else {
            determineCurrentGroup(storedSchedule);
        }
    }, []);

    const determineCurrentGroup = (schedule: ScheduleEntry[]): void => {
        const today = new Date();
        const nextSaturday = new Date(today.setDate(today.getDate() + (6 - today.getDay())));
        const nextSaturdayEntry = schedule.find(entry => new Date(entry.date).toDateString() === nextSaturday.toDateString());

        if (nextSaturdayEntry) {
            setSelectedGroup(nextSaturdayEntry.group);
            setToastMessage(`Group ${nextSaturdayEntry.group} is scheduled to clean on ${nextSaturdayEntry.date}.`);
        } else {
            setSelectedGroup('A-Z');
            setToastMessage('No cleaning scheduled for this Saturday.');
        }
        setShowToast(true);
    };

    const handleContactClick = (index: number): void => {
        if (contacted.has(index)) return;

        const contact = contacts[index];
        const templateIndex = localStorage.getItem('selectedCampaignTemplateIndex');
        const templates: Template[] = JSON.parse(localStorage.getItem('savedCampaignTemplates') || '[]');
        const template = templates[Number(templateIndex)] || '';

        if (template) {
            console.log('Template before replacement:', template);
            console.log('Contact details:', contact);

            const messageTemplate: string = String(template);

            console.log('Message Template before replacement:', messageTemplate);

            const message = messageTemplate
                .replace(/{FirstName}/g, contact.firstName)
                .replace(/{LastName}/g, contact.lastName)
                .replace(/{FullName}/g, `${contact.firstName} ${contact.lastName}`)
                .replace(/{Group}/g, selectedGroup);

            console.log('Message after replacement:', message);

            localStorage.setItem('lastMessage', message);

            // Logic to open the messaging app with a pre-filled message
            window.open(`sms:${contact.phoneNumber}?body=${encodeURIComponent(message)}`, '_self');
        }

        setContacted(new Set(contacted).add(index));
    };

    const handleGroupChange = (group: string): void => {
        setSelectedGroup(group);
        sortContactsByLastName();
    };

    const sortContactsByLastName = (): void => {
        const sortedContacts = [...contacts].sort((a, b) => {
            const lastNameA = a.lastName || '';
            const lastNameB = b.lastName || '';
            return lastNameA.localeCompare(lastNameB);
        });
        setContacts(sortedContacts);
    };

    const filterContactsByGroup = (): Contact[] => {
        if (selectedGroup === 'A-Z') return contacts;

        const groupRanges: { [key: string]: [string, string] } = {
            'A-F': ['A', 'F'],
            'G-L': ['G', 'L'],
            'M-R': ['M', 'R'],
            'S-Z': ['S', 'Z']
        };

        const [start, end] = groupRanges[selectedGroup];
        return contacts.filter(contact => {
            const lastNameInitial = contact.lastName ? contact.lastName.charAt(0).toUpperCase() : '';
            return lastNameInitial >= start && lastNameInitial <= end;
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Messenger</IonTitle>
                    <IonSelect slot="end" value={selectedGroup} onIonChange={e => handleGroupChange(e.detail.value)}>
                        {['A-F', 'G-L', 'M-R', 'S-Z', 'A-Z'].map(group => (
                            <IonSelectOption key={group} value={group}>{group}</IonSelectOption>
                        ))}
                    </IonSelect>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                {(!contacts.length || selectedCampaign === null) ? (
                    <div style={{ textAlign: 'center', marginTop: '50%' }}>
                        <ol>
                            <li><a href="/contacts">Import Contacts</a></li>
                            <li><a href="/campaigns">Select a Campaign</a></li>
                            <li><a href="/schedule">Set a Schedule</a></li>
                        </ol>
                    </div>
                ) : (
                    <IonList>
                        {filterContactsByGroup().map((contact: Contact, index: number) => (
                            <IonItem
                                key={index}
                                button={!contacted.has(index)}
                                color={contacted.has(index) ? 'light' : undefined}
                                onClick={() => handleContactClick(index)}
                            >
                                <IonLabel>
                                    {contact.firstName} {contact.lastName}
                                </IonLabel>
                                <IonLabel slot="end">{contact.phoneNumber}</IonLabel>
                                {contacted.has(index) && (
                                    <IonIcon slot="end" icon={checkmarkCircle} color="success" />
                                )}
                            </IonItem>
                        ))}
                    </IonList>
                )}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={5000}
                    color="secondary"
                    buttons={[
                        {
                            text: 'DISMISS',
                            role: 'cancel',
                            handler: () => {
                                setShowToast(false);
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Messenger;
