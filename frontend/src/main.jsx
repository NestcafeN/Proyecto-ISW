import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import FondosPage from './routes/FondosPage.jsx';
import FondosCreatePage from './routes/FondosCreatePage.jsx'
import ConcursosCreatePage from './routes/ConcursosCreatePage.jsx'
import { ChakraProvider } from '@chakra-ui/react'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <FondosPage />,
      },
      {
        path: '/fondos/create',
        element: <FondosCreatePage />,
      },
      {
        path: '/concursos/create',
        element: <ConcursosCreatePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <RouterProvider router={router} />
  </ChakraProvider>
);
