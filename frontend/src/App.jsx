import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { Toaster } from "./components/ui/sonner";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskProvider>
                <Index />
              </TaskProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router />
    </AuthProvider>
  );
}
