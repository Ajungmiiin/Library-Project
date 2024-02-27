import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

// Pages
import Auth, { action as authAction } from './pages/Auth';
import Home from './pages/Home';
import RootLayout from './pages/Root';
import SearchPage from './pages/Search';
import BookDetailPage from './pages/BookDetail';
import MyBook, { loader as myBookLoader } from './pages/MyBook';
import AddBook, {
  action as addBookAction,
  loader as addBookLoader,
} from './components/Book/AddBook';
import EditBook, { action as editBookAction } from './components/Book/EditBook';
import { action as logoutAction } from './pages/Logout';

import AddRecord, {
  action as addRecordAction,
} from './components/Record/AddRecord';
import EditRecord, {
  action as editRecordAction,
} from './components/Record/EditRecord';
import RemoveRecordData from './components/Record/RemoveRecordData';

// utils
import { queryClient } from './utils//http';
import { authLoader } from './utils/auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: authLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/auth',
        element: <Auth />,
        action: authAction,
      },
      {
        path: '/my/:myBookId',
        element: <MyBook />,
        id: 'myBook',
        loader: myBookLoader,
        children: [
          {
            path: '/my/:myBookId/edit',
            element: <EditBook />,
            action: editBookAction,
          },
          {
            path: '/my/:myBookId/addrecord',
            element: <AddRecord />,
            action: addRecordAction,
          },
          {
            path: '/my/:myBookId/:recordId/edit',
            element: <EditRecord />,
            action: editRecordAction,
          },
          {
            path: '/my/:myBookId/:recordId/remove',
            element: <RemoveRecordData />,
          },
        ],
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/book/:bookId',
        element: <BookDetailPage />,
        children: [
          {
            path: '/book/:bookId/add',
            element: <AddBook />,
            loader: addBookLoader,
            action: addBookAction,
          },
        ],
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
