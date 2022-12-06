import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import SocialsPage from './pages/SocialsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserDashboardAppPage from './pages/UserDashboardAppPage';
import SingleAnalysis from './pages/SingleAnalysis';
import SocialProductsPage from './pages/SocialProductsPage';
import SettingUser from './pages/SettingUser';
import StripeSuccess from './components/Stripe/success';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'socials', element: <SocialsPage /> },
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
      path: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      element: <StripeSuccess />,
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
