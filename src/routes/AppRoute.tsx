import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CircularDotLoader from '../components/ui/DotLoader';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Home from '../pages/Home';
import IncidentReportPage from '../pages/IncidentReportPage';

// Lazy-loaded pages
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../components/layout/Layout'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><CircularDotLoader /></div>}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path='' element={<Home/>}/>
            <Route path='/incident/:assembly' element={<IncidentReportPage/>}/>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}
