import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import Payment from './pages/Payment';
import { useAuth } from '../src/context/AuthProvider';

function App() {
  const { authUser, loading } = useAuth(); // ✅ Destructure correctly

  if (loading) {
    return <div>Loading...</div>; // Or use a spinner/loader component
  }

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<Login />} />

        {/* 🔐 Protect payment route */}
        <Route
          path='/payment'
          element={authUser ? <Payment /> : <Navigate to="/login" />}
        />
        
        {/* Optional: Add fallback for unknown routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
