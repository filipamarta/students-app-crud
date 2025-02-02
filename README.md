# Students App

I'm Filipa Marta, and I developed a responsive web application for an interview challenge, enabling the management of students and classes with features to add, delete, and edit entries. The app is built with React, TypeScript, and Vite, styled using Material UI, and CSS Modules for scoped styling. I utilized Formik for form handling and Yup for validation, and configured ESLint to ensure code quality and consistency. Data is stored locally using localStorage, ensuring persistence across sessions.

I organized the code into 4 folders:

- assets (intended for images, but this app doesn't use any images)
- components (contains the app's UI components)
- contexts (handles the students and classes contexts)
- lib (to have types definitions, utility functions and constants)

I used the "theme" given by Material UI but it's not totally optimized (due to time constraints in learning more about it).
I use CssBaseline from Material UI in main.tsx to reset browser styles and created modals using createPortal.

![App Image](https://github.com/filipamarta/students-app-crud/blob/main/src/assets/edit-student.png)

the app is deployed in Netlify: [students-classes-app.netlify.app/](https://students-classes-app.netlify.app/)

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

### `npm run lint`

To uses eslint to lint the project.

### `npm run build`

To build the application. A "dist" folder is created.
