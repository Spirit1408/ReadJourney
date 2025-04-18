# ReadJourney

ReadJourney is a modern web application for tracking your reading progress, analyzing statistics, and boosting your reading motivation.

## Key Features

- **Book Recommendations**: Adaptive feed, number of books depends on screen size (8 for desktop, 2 for mobile)
- **Personal Library**: Add, view, and delete books
- **Reading Tracking**: Start and finish reading sessions, track progress by pages
- **Statistics**: Circular progress indicator, reading speed graph
- **Authentication**: Registration, login, private routes
- **Responsive Design**: Optimized for mobile and desktop
- **Dark Theme**

## Technologies

- React 19, React Router 7
- Redux Toolkit, Redux Persist
- Vite
- Axios
- React Hook Form + Yup
- SVG for charts
- CSS Modules

## Project Structure

- `src/components` — UI components (MainLayout, App, RecommendedBooks, MyBook, AddReading, SpeedGraph, etc.)
- `src/pages` — application pages (RecommendedPage, MyLibraryPage, ReadingPage, NotFoundPage, LoginPage, RegisterPage)
- `src/redux` — Redux store, slices, and operations
- `src/images`, `src/fonts` — assets

## Quick Start

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd 3_ReadJourney
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the app:
   ```sh
   npm run dev
   ```
4. The app will be available at http://localhost:5173

## Scripts

- `npm run dev` — start in development mode
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — lint the code

## Authentication

Registration and login are required to access the main features. Tokens are stored and session is automatically refreshed.

## 404 and Routing

- Private routes for protected pages
- Custom 404 page with redirect depending on authentication status

## License

MIT
