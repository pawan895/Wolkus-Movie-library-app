# Movie Library App 📽️

[Image of your movie library app] 

Discover, organize, and share your favorite films with this user-friendly web application.

## Features

- **User Authentication:** Securely sign in or sign up to access your personal movie lists.
- **Powerful Movie Search:** Effortlessly find movies using the OMDb API (Open Movie Database).
- **Personalized Lists:** Create public or private lists to categorize and share your movie recommendations.
- **Intuitive Interface:** Enjoy a sleek design inspired by popular movie platforms.
- **Secure and Scalable:** Built with React for the frontend and Firebase for robust backend services.

## Tech Stack

- **Frontend:** React, React Router, Axios (for API calls)
- **Backend:** Firebase (Authentication, Firestore database, Cloud Functions - optional)
- **API:** OMDb API (Open Movie Database)

## Architecture Diagram
```
+--------------------+      +------------------+       +--------------+
| React Frontend    |       | Firebase Backend |       | OMDb API     |
+--------------------+      +------------------+       +--------------+
|                    |      |                  |       |              |
| - Auth components  |<---->| - Auth Service   |       |              |
| - MovieSearch      |      | - Firestore DB   |       |              |
| - MovieList        |<---->| - Cloud Functions|       |              |
| - MyLists          |      |                  |       |              |
| - ...              |      |                  |       |              |
|                    |      |                  |       |              |
| - omdbService.js   |<---->|                  |<----->| - Movie data |
| - firebase.js      |      |                  |       |              |
|                    |      |                  |       |              |
+--------------------+      +------------------+       +--------------+

```

## Folder Structure
```
movie-library-app/
├── public/
│   └── index.html
├── src/
│   ├── components/ 
│   │   ├── Auth/                   # Authentication components (SignIn, SignUp)
│   │   ├── MovieCard/             # Displays details of a movie
│   │   ├── MovieList/             # Displays a list of movies
│   │   ├── MovieSearch/           # Search bar component
│   │   ├── MyLists/               # Displays user's created movie lists
│   │   └── shared/                # Reusable components (Header, Footer, etc.)
│   ├── context/                   # Global state management (AuthContext)
│   ├── firebase/                 # Firebase configuration and initialization
│   ├── pages/                    # Main app pages
│   │   ├── Home/                 # Home screen with search and lists
│   │   ├── ListDetail/           # Details of a specific movie list
│   │   ├── SignIn/               # Sign in page
│   │   └── SignUp/               # Sign up page
│   ├── services/                 # API requests (OMDB API, Firebase)
│   │   ├── omdbService.js        # OMDB API service
│   │   └── firebaseService.js    # Firebase service (CRUD operations on lists)
│   ├── App.js
│   └── index.js
├── .env.local                   # Environment variables
├── firebase.json                # Firebase configuration
├── package.json
└── README.md
```
