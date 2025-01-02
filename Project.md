# LDS Church Cleaning Reminder App

## Overview

This project aims to create a mobile-friendly application to help an LDS ward Organizer manage and remind members when it’s their turn to clean the church on Saturdays. The app will allow for scheduling, quick messaging, and the ability to track which members have been contacted.

## Goals

1. **Streamline the Reminder Process**: Automatically generate a cleaning schedule based on specified months and ward-member groupings.  
2. **Efficient Notifications**: Easily send personalized SMS reminders with a single tap.  
3. **Automated Scheduling**: Support monthly selections, group rotations, and special fifth-Saturday rules.  
4. **User-Friendly and Modern UI**: Ensure the application is sleek, responsive, and intuitive for on-the-go usage.

---

## User Stories & Acceptance Criteria

### 1. Importing Ward Members via CSV

**User Story**  
As an **Organizer**, I want to import a CSV file of members (names and phone numbers), so that I can quickly build and update my contact list without manually entering each member.

**Acceptance Criteria**  
- The system must accept a CSV file with columns for first name, last name, and phone number.  
- After uploading, the system should validate the CSV and display any invalid rows or missing fields.  
- The system shows a summary of the import results (added records, errors, duplicates).

---

### 2. Defining the Predefined Message Template

**User Story**  
As an **Organizer**, I want to set up a predefined message template that automatically inserts the member’s name, so I can send personalized reminders quickly.

**Acceptance Criteria**  
- The app should provide a template editor where placeholders (e.g., `{FirstName}`, `{LastName}`, `{FullName}`) can be inserted.  
- When sending a message, the relevant name(s) are automatically injected into the template.  
- The template is editable and saved for future use.

---

### 3. Selecting Months and Generating the Cleaning Schedule

**User Story**  
As an **Organizer**, I want to select the months for our cleaning campaign so the application will generate a schedule following our rules.

**Acceptance Criteria**  
- The app allows me to pick multiple months in a calendar year (e.g., January, February, March).  
- The schedule is generated based on the following rules:
  1. Cleanings occur every Saturday.  
  2. The ward is split into four groups by last name (e.g., A–F, G–L, M–R, S–Z).  
  3. One group is assigned each Saturday.  
  4. In months with five Saturdays, everyone (A–Z) is contacted on that fifth Saturday.  
  5. The user can decide if the order is forward (A–F → G–L → M–R → S–Z) or backward (S–Z → M–R → G–L → A–F).
- Once the months are selected, the system automatically calculates and displays which group is assigned each Saturday.

---

### 4. Viewing and Contacting the Assigned Cleaners

**User Story**  
As an **Organizer**, I want to see who is assigned for the upcoming Saturday’s cleaning, so I can easily send them a reminder.

**Acceptance Criteria**  
- On opening the app, a list of that next Saturday’s assigned cleaners is displayed.  
- Each entry shows the person’s name and phone number.  
- I can tap or click on an individual’s name to initiate sending them a reminder.

---

### 5. Sending the Reminders (SMS Integration)

**User Story**  
As an **Organizer**, I want to click on each name to open my phone’s messaging app with a pre-filled message and recipient, so I can quickly send reminders.

**Acceptance Criteria**  
- On the weekly contact list screen, clicking on a person’s name:
  - Marks that person as contacted.  
  - Automatically opens the default SMS/messaging app with:
    - The phone number already filled in.  
    - The predefined message template, inserted and personalized with the user’s name.
- The UI should show a visual indicator (e.g., checkmark) next to those who have been contacted.

---

### 6. “Do Not Contact” List

**User Story**  
As an **Organizer**, I want to mark certain members as “Do Not Contact,” so they no longer appear in the cleaning reminder list.

**Acceptance Criteria**  
- An option to mark or unmark a user as “Do Not Contact.”  
- Marked users are excluded from the weekly assignments and reminders.  
- The user’s data remains in the system, but they no longer receive notifications.

---

### 7. Managing the Alphabetical/Reverse Order Cleaning Cycle

**User Story**  
As an **Organizer**, I want to decide if we go through A–F → G–L → M–R → S–Z or reverse (S–Z → M–R → G–L → A–F), so I have flexibility in planning.

**Acceptance Criteria**  
- During schedule setup, the user can choose “Forward Alphabetical” or “Reverse Alphabetical.”  
- The schedule generator respects the chosen order throughout the selected months.

---

### 8. Handling Fifth Saturdays (All A–Z)

**User Story**  
As an **Organizer**, I want the system to automatically schedule every member (A–Z) for the fifth Saturday in months that have five Saturdays.

**Acceptance Criteria**  
- If a month has five Saturdays, the system assigns all ward members (except those on the Do Not Contact list) on that fifth Saturday.  
- The list shows every eligible member, allowing the Organizer to easily message them.

---

### 9. Mobile-Friendly, Modern UI

**User Story**  
As an **Organizer**, I want the application to have a sleek, mobile-friendly design, so it’s easy to navigate and send reminders on-the-go.

**Acceptance Criteria**  
- The UI must be responsive and work well on mobile devices (portrait and landscape).  
- Importing CSV, viewing assignments, and sending messages should be intuitive with minimal taps.  
- Visual design should follow modern guidelines (clean typography, color scheme, consistent spacing).

---

### 10. Tracking Contact Status in Real Time

**User Story**  
As an **Organizer**, I want to see at a glance who has or hasn’t been contacted yet for a given Saturday, so I can ensure I complete my reminders.

**Acceptance Criteria**  
- The weekly reminder screen displays a status badge or checkmark next to each person.  
- Once a person is contacted, their status updates immediately.  
- The system can show how many remain uncontacted at any given time.

---

### 11. Viewing or Editing the Generated Schedule

**User Story**  
As an **Organizer**, I want to view the overall cleaning schedule and edit individual assignments if needed, so that I have flexibility to handle exceptions.

**Acceptance Criteria**  
- A schedule view shows each Saturday along with the assigned group or individuals.  
- The Organizer can override assignments (e.g., remove an individual or swap them).  
- Changes are saved and reflected in the weekly contact list.

---

## Future Considerations

- **Organizer Reminders**: Automatic notifications prompting the Organizer to send out reminders each week.  
- **Calendar Integration**: Sync cleaning events with external calendars (e.g., Google Calendar, iCal).  
- **Multi-User Access**: Multiple ward leaders or volunteers can log in and help manage and send reminders.

---

**End of File**
