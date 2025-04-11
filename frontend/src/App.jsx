import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <Route
            path="/"
            element={
              <TaskProvider>
                <Index />
              </TaskProvider>
            }
          />
        )}
        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
