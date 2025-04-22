import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { LoginForm } from './components/authentication/LoginForm';
import { RegisterForm } from './components/authentication/RegisterForm';
import { Home } from './components/content/Home';

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
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;