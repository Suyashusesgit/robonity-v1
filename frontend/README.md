# Robonity

Welcome to Robonity, a modern, responsive community web app for robotics enthusiasts, built with React and Firebase. This platform serves as a central hub for robotics creators, engineers, and hobbyists to share projects, ask questions, and discover resources.

![Robonity Homepage Screenshot](link-to-your-screenshot.png)
*(Recommended: Add a screenshot of your homepage here. You can drag and drop an image into the GitHub editor to upload it.)*

---

## 🚀 About The Project

Robonity is a feature-rich community platform designed from the ground up. It features a clean, tech-inspired dark-mode UI and is built on a modern, scalable tech stack.

### Key Features:
* **Modern UI/UX:** A sleek, dark-mode design with an "electric blue" accent, using the `Roboto Mono` font for a tech-friendly feel.
* **Fully Responsive:** Features a "hamburger" menu and a fluid layout that works seamlessly on desktop, tablets, and mobile phones.
* **Dynamic Routing:** All pages are handled client-side using `react-router-dom` for a fast, single-page application (SPA) experience.
* **Active Page Highlighting:** The navigation bar clearly indicates which page you are currently on.
* **Firebase Backend:**
    * **Authentication:** Ready for a full user login and signup system using Firebase Authentication.
    * **Database:** Connected to Firestore for dynamic content, such as forum posts, user projects, and events.

### Pages Included:
* **Home:** A welcoming homepage with a custom logo and a "hero" section.
* **Projects:** A placeholder page to showcase community-built projects.
* **Gallery:** A responsive grid layout for project images.
* **Forum:** A functional forum page (in-progress) connected to Firestore.
* **Events:** A clean, list-style page for upcoming workshops and competitions.
* **RoboShare:** A page for sharing files, code, and 3D models.
* **Resources:** A curated list of helpful links and tutorials.
* **Newsletter:** A functional-style newsletter signup form.
* **About:** A page for the community's mission and story.

---

## 🛠️ Built With

* **Frontend:**
    * [React](https://reactjs.org/)
    * [Vite](https://vitejs.dev/)
    * [React Router](https://reactrouter.com/)
* **Backend:**
    * [Firebase](https://firebase.google.com/)
    * Firebase Authentication
    * Firestore Database
* **Styling:**
    * Plain CSS with CSS Variables
    * Google Fonts (Roboto Mono)

---

## 🔌 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) and `npm` installed on your machine.

### Installation

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Firebase Setup (Required)

This project requires a Firebase backend to run.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Add a Web App:** Click the `</>` icon to add a new web app to your project.
3.  **Register App:** Give it a nickname and click "Register app".
4.  **Copy Config:** Firebase will give you a `firebaseConfig` object. Copy this object.
5.  **Enable Services:**
    * In the Firebase console, go to **Authentication** -> **Sign-in method** -> and enable **Email/Password**.
    * Go to **Firestore Database** -> **Create database** -> and start in **Test Mode**.
6.  **Create Config File:** In your project's `src/` folder, create a new file named `firebase.js`.
7.  **Paste your config** into `src/firebase.js` using this template:

    ```javascript
    // src/firebase.js

    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize and export Firebase services
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export default app;
    ```

### Run the App

After installing dependencies and setting up Firebase, run the development server:

```sh
npm run dev
