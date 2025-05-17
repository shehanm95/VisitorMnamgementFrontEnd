import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { LoginForm } from './components/authentication/LoginForm';
import { RegisterForm } from './components/authentication/RegisterForm';
import ProtectedRoute from './context/ProtectedRoute';
import { UserProfile } from './components/profile/UserProfile';
import { Home } from './components/Home';
import { Unauthorized } from './components/common/Unauthorized';
import { VisitorDashboard } from './components/dashboard/VisitorDashboard';
import { ModeratorDashboard } from './components/dashboard/ModeratorDashboard';
import { OfficerDashboard } from './components/dashboard/OfficerDashboard';
import { TParent } from './components/test/TParent';
import { VisitOptions } from './components/dashboard/dashboardComponents/visitOptions/VisitorOptions';
import VisitorPage from './components/dashboard/dashboardComponents/VisitorPage';
import { CreateVisitOption } from './components/dashboard/dashboardComponents/visitOptions/CreateVisitOption';
import { VisitOption } from './types/visitOption';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return localStorage.getItem('accessToken') ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/unauthorized" element={<PrivateRoute element={<Unauthorized />} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/test" element={<TParent></TParent>} />

        <Route
          path="/user"
          element={
            <ProtectedRoute roles={['VISITOR', 'ADMIN', 'MODERATOR']}>
              <UserProfile></UserProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/visitorDashboard"
          element={
            <ProtectedRoute roles={['VISITOR']}>
              <VisitorDashboard></VisitorDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderatorDashboard"
          element={
            <ProtectedRoute roles={['MODERATOR']}>
              <ModeratorDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="visitOptions"
            element={
              <ProtectedRoute roles={['MODERATOR']}>
                <VisitOptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="visitOptions/create"
            element={
              <ProtectedRoute roles={['MODERATOR']}>
                <CreateVisitOption />
              </ProtectedRoute>
            }
          />

          <Route
            path="allvisitors"
            element={
              <ProtectedRoute roles={['MODERATOR']}>
                <VisitorPage />
              </ProtectedRoute>
            }
          />
        </Route>



        <Route
          path="/moderatorDashboard"
          element={
            <ProtectedRoute roles={['OFFICER']}>
              <OfficerDashboard></OfficerDashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;