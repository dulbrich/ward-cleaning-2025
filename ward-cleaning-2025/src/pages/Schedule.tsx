import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonAlert, IonList, IonItem, IonLabel, IonCardHeader } from '@ionic/react';
import React, { useState } from 'react';

const Schedule: React.FC = () => {
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [order, setOrder] = useState<'forward' | 'reverse'>('forward');
    const [schedule, setSchedule] = useState<{ date: string, group: string }[]>([]);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const groups = ['A-F', 'G-L', 'M-R', 'S-Z'];

    const handleMonthSelection = (month: string) => {
        setSelectedMonths(prev => 
            prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
        );
    };

    const generateSchedule = () => {
        const generatedSchedule: { date: string, group: string }[] = [];
        const groupOrder = order === 'forward' ? groups : [...groups].reverse();

        selectedMonths.forEach(month => {
            const monthIndex = months.indexOf(month);
            const year = new Date().getFullYear();
            const firstDay = new Date(year, monthIndex, 1);
            let saturdayCount = 0;

            for (let day = 1; day <= 31; day++) {
                const date = new Date(year, monthIndex, day);
                if (date.getMonth() !== monthIndex) break; // Stop if the month changes

                if (date.getDay() === 6) { // Saturday
                    saturdayCount++;
                    const group = saturdayCount <= 4 ? groupOrder[(saturdayCount - 1) % 4] : 'A-Z';
                    generatedSchedule.push({ date: date.toDateString(), group });
                }
            }
        });

        setSchedule(generatedSchedule);
        localStorage.setItem('cleaningSchedule', JSON.stringify(generatedSchedule));
        setShowAlert(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Schedule</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
                {schedule.length > 0 && (
                    <IonCard className="ion-no-padding" color="light">
                        <IonCardHeader className="ion-no-padding">
                            <IonToolbar color="secondary">
                                <IonTitle>Cleaning Schedule</IonTitle>
                            </IonToolbar>
                        </IonCardHeader>
                        <IonCardContent className="ion-no-padding">
                            <IonList className="ion-no-padding">
                                {schedule.map((entry, index) => (
                                    <IonItem key={index}>
                                        <IonLabel>
                                            <strong>Date:</strong> {entry.date} <br />
                                            <strong>Group:</strong> {entry.group}
                                        </IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                )}
                <IonGrid className="ion-no-padding">
                    <IonRow>
                        {months.map(month => (
                            <IonCol size="6" sizeLg="4" key={month}>
                                <IonCard 
                                    color={selectedMonths.includes(month) ? 'secondary' : undefined}
                                    onClick={() => handleMonthSelection(month)}
                                >
                                    <IonCardContent className="ion-text-center">
                                        {month}
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonButton onClick={() => setOrder('forward')} color={order === 'forward' ? 'primary' : 'medium'}>
                                Forward Order
                            </IonButton>
                            <IonButton onClick={() => setOrder('reverse')} color={order === 'reverse' ? 'primary' : 'medium'}>
                                Reverse Order
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton className="ion-padding" onClick={generateSchedule}>Generate Schedule</IonButton>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Schedule Generated'}
                    message={'Schedule generated and saved!'}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default Schedule;

