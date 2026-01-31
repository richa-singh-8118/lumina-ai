import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CourseView } from './pages/CourseView';
import { LessonView } from './pages/LessonView';
import { Onboarding } from './pages/Onboarding';
import { GuardianDashboard } from './pages/GuardianDashboard';
import { MyCourses } from './pages/MyCourses';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { useUser } from './contexts/UserContext';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="guardian" element={<GuardianDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="course/:id" element={<CourseView />} />
          <Route path="course/:courseId/lesson/:lessonId" element={<LessonView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
