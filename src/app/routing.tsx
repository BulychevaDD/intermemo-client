import { createBrowserRouter } from 'react-router-dom';
import { AuthenticationPage } from 'pages/AuthenticationPage';
import { DashboardPage } from 'pages/DashboardPage';
import { DeckPage } from 'pages/DeckPage';
import { StudyPage } from 'pages/StudyPage';
import { Layout } from './layout';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthenticationPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/decks/:deckId',
        element: <DeckPage />,
      },
      {
        path: '/decks/:deckId/study',
        element: <StudyPage />,
      },
    ],
  },
]);
