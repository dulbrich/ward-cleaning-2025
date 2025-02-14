# LDS Church Cleaning Reminder App Instructions

## Overview

The LDS Church Cleaning Reminder App is designed to assist ward organizers in efficiently managing and reminding members of their cleaning duties for church buildings. This application addresses the challenge of sending bulk text messages by dividing the ward into four groups and enabling users to send personalized messages with minimal effort. While the app does not automate message sending, it streamlines the process, making it easier for organizers to keep track of who needs to be contacted.

## How the App Works

1. **Import Contacts**: Regularly import your ward's contact list to ensure it is up-to-date. The app supports CSV file imports, which should include columns for first name, last name, and phone number. You can download a [CSV template here](template.csv).

2. **Create a Texting Template or Campaign**: Set up message templates that automatically insert member details, such as names and groups, for personalized communication. [Go to Campaigns Tab](/campaigns)

3. **Generate Cleaning Schedules**: With a few clicks, create cleaning schedules that assign groups to specific Saturdays. Wards are split up into four groups based on the last letter of the first name (groups include A-F, G-L, M-R, S-Z). Fifth Saturday of the month is scheduled for all members. [Go to Schedule Tab](/schedule)

4. **Send Messages**: Click on each contact to open your SMS messaging app with a pre-filled message, including the recipient's phone number and personalized message. [Go to Messenger Tab](/messenger)

5. **Data Privacy**: All contact information remains local to your device and is never shared externally. This ensures the safety and privacy of your data.

6. **Open Source**: This application is free and open-source, allowing anyone to use and contribute to its development. [Go to GitHub Repository](https://github.com/dulbrich/ward-cleaning-2025)

## Detailed Usage Instructions

### CSV File Format

- The CSV file must have columns labeled "First Name," "Last Name," and "Phone Number."
- Import the contact list through the "Contacts" page in the app. [Go to Contacts Contacts](/contacts)
- You can download a [CSV template here](template.csv).

### Managing Contacts

- All contact information is stored locally on your device and is never shared.
- The "Do Not Contact" list allows you to exclude certain members from receiving reminders. This list persists across contact list uploads.

### Scheduler Details

- The scheduler divides the ward into four groups (A-F, G-L, M-R, S-Z) and assigns them to clean on Saturdays.
- In months with a fifth Saturday, all members are scheduled to clean.

### Campaign Tab

- Craft messages using placeholders like `{FirstName}`, `{LastName}`, and `{Group}`.
- Example message: "Hi {FirstName}! It's group {Group}'s turn to clean the church this Saturday at 9am. See you there {LastName}s."
- Save multiple campaigns for future use and select which one to send.

### Messenger Functionality

- Select different groups to view the list of contacts scheduled for cleaning.
- The app automatically displays the list of people to be contacted for scheduled weeks.
- Clicking on a contact opens the messaging app with a personalized message ready to send.
- Once a message is sent, a green checkmark appears next to the contact, indicating they have been contacted.

### Reminders and Legal Considerations

- Messages are not sent automatically. Set reminders on your phone to send messages on cleaning weeks.
- Due to 10DLC rules, and church policy, sending automated messages via applications can be challenging. This app simplifies the process for church representatives to remind members about cleaning duties.

By using this app, ward organizers can efficiently manage cleaning schedules and reminders, ensuring a smooth and organized process for maintaining church buildings.

## Adding the App to Your Home Screen

### iOS

1. Open Safari and navigate to the app's website.
2. Tap the "Share" icon at the bottom of the screen (a square with an arrow pointing upward).
3. Scroll down and select "Add to Home Screen."
4. Enter a name for the app shortcut if desired, then tap "Add."
5. The app icon will now appear on your home screen for easy access.

### Android

1. Open Chrome and navigate to the app's website.
2. Tap the menu icon (three vertical dots) in the top-right corner.
3. Select "Add to Home screen."
4. Enter a name for the app shortcut if desired, then tap "Add."
5. The app icon will now appear on your home screen for easy access.

By following these steps, you can quickly access the LDS Church Cleaning Reminder App directly from your device's home screen.
