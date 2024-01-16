import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SearchPage from '../pages/search-page/SearchPage';
import CompanyPage from '../pages/company-page/CompanyPage';
import HomePage from '../pages/home-page/HomePage';
import IncomeStatement from '../components/company/income-statement/IncomeStatement';
import CompanyProfile from '../components/company/company-profile/CompanyProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'company/:ticker',
        element: <CompanyPage />,
        children: [
          { path: 'company-profile', element: <CompanyProfile /> },
          { path: 'income-statement', element: <IncomeStatement /> },
        ],
      },
    ],
  },
]);
