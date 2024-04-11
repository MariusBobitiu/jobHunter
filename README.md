<a name="readme-top"></a>

# ⚡ jobHunter - Your job tracking companion

<div align="center"> 

[![JobHunter][jobHunterApp-screenshot]](https://jobhunter.mariusbobitiu.dev)

## jobHunter

![Built with: React][react] ![Open Source][open-source] ![Version][version] ![Using npm][using-npm] ![Made with love][made-with-love] ![License: MIT][license-mit]

<h3 align="center">
    🐛
    <a href="https://github.com/MariusBobitiu/jobHunter/issues/new?labels=bug&template=feature-request---.md">Report Bug</a> &nbsp; &nbsp;
    ✨
    <a href="https://github.com/MariusBobitiu/jobHunter/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
</h3>

<h2 align="center"> <a href="https://jobhunter.mariusbobitiu.dev">See Live Demo ⇝</h1>

</div>


<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table Of Contents </summary>
  
- [About the Project](#about-the-project)
  - [Built with](#built-with)
- [Features](#features)
- [Getting Started](#local-setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage instructions](#usage-instructions)
- [Show your support](#show-your-support)

</details>

## About the project 

Welcome to the epicenter of your job search revolution – the jobHunter portal. Designed with meticulous attention to functionality and user experience, this platform is more than just a job tracking application; it's your personal career advancement assistant. Let's peel back the layers of this innovative platform:

Key Features:

Robust Authentication: Step into a secure zone with our intuitive Login/Register portal, featuring a password recovery system and cookie integration to maintain your session. Rest assured, your credentials are fortified with bcrypt encryption.
Personalized Dashboard: Your command center displays an array of analytical tools: a donut chart delineating job application statuses, a data graph tracking applications over time, and a customizable goal setter to pace your job hunt. A rotating selection of motivational quotes inspires continuous momentum.
Job Management Hub: Navigate a comprehensive table that organizes your job prospects by company, position, and application status. Interactive options let you delve deeper into each role, tweak details, or clear the slate. The 'Add New Job' feature seamlessly integrates your latest prospects into the flow.
In-Depth Job Search: Cast a net across Reed.co.uk (with more sources on the horizon), using refined filters to pinpoint opportunities that align with your career aspirations. Direct application links streamline the process, while a smart follow-up system records your progress upon return.
User-Centric Profile: Personalize your interface in the profile section by tweaking settings like username, password, and display preferences, including an optional dark mode. Plus, you have full control over your data with a comprehensive account deletion option.
The About Section: Discover the backstory of jobHunter, the guiding principles of its creation, and how to contribute feedback for a continually evolving user experience.

Each element of jobHunter is crafted with the vision of making your job search a journey of discovery and success. Join us in redefining the way you pursue your professional goals. Your next career milestone starts here!

### Built With 
<div align="center">
  
  ![React][react-badge] ![Redux][redux-badge] ![!PostgreSQL][postgresql-badge] ![!Express.js][expressjs-badge] ![!Vite][vite-badge]
  
</div>

-  `React: A JavaScript library for building user interfaces.`
-  `Redux: A predictable state container for JavaScript apps.`
-  `PostgreSQL: A robust relational database system.`
-  `Express.js: A minimalistic web framework for Node.js.`
-  `Vite: A modern front-end build tool.`d


**Thank you for visiting!**

<!-- ABOUT ME -->
## 👨‍💻 About the Developer

Hey, I'm **Marius**! A Full-stack Developer passionate about building seamless web experiences with React. I bring to the table a robust toolkit including React, Node.js, Express, and PostgreSQL, paired with a continuous zeal for learning—currently deep-diving into TypeScript and React best practices.

I'm all about innovation, clean code, and the magic of turning ideas into reality. Let's create something impactful together!

---

💼 **Tech Stack:** React, Node.js, Express, PostgreSQL, JavaScript, TypeScript  
🌟 **Interests:** Clean code, Learning new technologies, Collaboration  
🚀 **Current Focus:** TypeScript, React Best Practices  

<!-- FEATURES -->
## Features 

- 🔐 **Secure Authentication:** Login with encrypted password storage.

- 📊 **Interactive Dashboards:** Visualize job search progress with dynamic graphs.
- 📁 **Job Organizer:** Manage and track job applications in one place.
- 🔍 **Advanced Job Search:** Find and apply to jobs with integrated search features.
- 🎯 **Goal Setting:** Set and monitor job application goals.
- 📑 **Detailed Job Views:** Explore job details and edit records seamlessly.
- 🔄 **Synchronized Updates:** Real-time status updates across user dashboards.
- 🌐 **Full-Stack Integration:** Built with React, Redux, Express.js, and PostgreSQL.
- 📩 **Direct Application Links:** Apply to job postings directly from the platform.
- 🗃️ **Efficient Data Management:** Organized storage and retrieval with MongoDB.
- 🌙 **Dark Mode:** Customizable UI for day and night usage.
- 🤖 **API Integration:** Fetch job listings from external APIs.
- 📬 **Feedback Loop:** Report bugs and request features easily.
- 📱 **Responsive Layout:** Accessible across various devices and screen sizes.
- ⚙️ **Customizable Profile:** Personalize account settings and preferences.
- 🗑️ **Account Management:** Secure deletion of user data on request.


<!-- Local Setup -->
# Local Setup Instructions for Job Hunter Project

To run the Job Hunter application locally, please ensure you have the following prerequisites:

- Node.js and npm installed on your machine.
- A running PostgreSQL server on `localhost`.
- A Reed API key (obtainable for free from Reed).
- A SendGrid API key (also available for free).

## Fork and Setup the Backend

1. Fork the GitHub repository for the project.
2. Clone your forked repository locally using `git clone <repository-url>`.
3. Navigate into the backend directory: `cd backend`.
4. Install the necessary Node.js dependencies: `npm install`.
5. Create a `.env` file in the backend directory and set the following environment variables:

    ```
    PORT=8089 # Or any port you prefer
    COOKIE_EXPIRATION=2592000000 # 30 days, in milliseconds
    EMAIL=* # Email for sending password resets
    REED_API_BASE_URL=https://www.reed.co.uk/api/1.0
    REED_API_KEY=your_reed_api_key_here
    SALT_ROUNDS=10
    JWT_EXPIRATION=2592000000 # 30 days
    JWT_SECRET=your_jwt_secret_here
    PG_DATABASE=your_postgres_db_name
    PG_HOST=localhost # Default
    PG_PASSWORD=your_postgres_password
    PG_PORT=5432 # Default PostgreSQL port
    PG_USER=your_postgres_user
    SG_API_KEY=your_sendgrid_api_key_here
    ```
6. In `index.js`, uncomment the CORS-related lines as instructed in the file comments.
7. Start the backend server: `node index.js`.

## Set Up the Frontend

1. In a new terminal, navigate to the root directory of the cloned project.
2. Go into the frontend application directory: `cd jobhunter`.
3. Install the required npm packages: `npm install`.
4. Create a `.env` file in the frontend directory with the following content:

    ```
    VITE_API_BASE_URL=http://localhost:8089 # Use the backend PORT
    VITE_OPENCAGE_API_KEY=your_opencage_api_key_here # If geolocation feature is needed
    ```
5. Launch the frontend development server: `npm run dev`.
6. The application should now be running and accessible at `http://localhost:5173`.

Please ensure that the PostgreSQL server is running, and you have created the necessary database and tables as per the application requirements.

Enjoy managing your job applications with the Job Hunter application!


<!-- SHOW YOUR SUPPORT -->
## Show Your Support

If you found this project helpful or interesting, please consider giving it a ⭐️ on GitHub. It's a small gesture but means a lot to me!


<!-- 
*** MARKDOWN LINKS & IMAGES
https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[jobHunterApp-screenshot]: https://i.postimg.cc/kGPncSSg/job-Hunter.png

[react]: https://img.shields.io/badge/Built_with-React-%2321e6ed?style=for-the-badge
[open-source]: https://img.shields.io/badge/Open-Source-white?style=for-the-badge&labelColor=gray&color=blue&logoColor=red
[version]: https://img.shields.io/badge/Version-1.1.0-white?style=for-the-badge&labelColor=gray&color=green&logoColor=red
[using-npm]: https://img.shields.io/badge/Using-npm-white?style=for-the-badge&labelColor=gray&color=blue&logo=npm
[made-with-love]: https://img.shields.io/badge/Made_with-%F0%9F%92%99-black?style=for-the-badge
[license-mit]: https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge


[react-badge]: https://img.shields.io/badge/-React-blue?style=flat-square&logo=react&logoColor=white
[redux-badge]: https://img.shields.io/badge/-Redux-purple?style=flat-square&logo=redux&logoColor=white
[postgresql-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white
[expressjs-badge]: https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white
