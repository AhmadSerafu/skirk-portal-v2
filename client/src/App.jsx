import { Navigate, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import CharactersPage from "./views/CharactersPage";
import CharacterDetailPage from "./views/CharacterDetailPage";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/characters" replace />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/builds"
            element={<h1>Ini halaman build setelah login</h1>}
          />
          <Route path="/ai" element={<h1>Ini halaman ai setelah login</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
