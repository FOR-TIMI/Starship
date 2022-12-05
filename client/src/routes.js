import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserDashboardAppPage from './pages/UserDashboardAppPage';
import SingleAnalysis from './pages/SingleAnalysis';
import SocialProductsPage from './pages/SocialProductsPage';
import SettingUser from './pages/SettingUser';


// ----------------------------------------------------------------------

export default function Router() {

  

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'following', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'user/:basketId', element: <UserDashboardAppPage /> },
        { path: 'tavern', element: <BlogPage /> },
        { path: 'analysis/:symbol', element: <SingleAnalysis /> },
        { path: 'baskets/:username', element: <SocialProductsPage /> },
        { path: 'user', element: <SettingUser /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
