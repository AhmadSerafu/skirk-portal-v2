import { Navigate, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import CharactersPage from "./views/CharactersPage";
import CharacterDetailPage from "./views/CharacterDetailPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import MyBuildsPage from "./views/MyBuildsPage";
import BuildFormPage from "./components/BuildFormPage";
import AddBuildPage from "./views/AddBuildPage";
import EditBuildPage from "./views/EditBuildPage";
import AIAnalyzerPage from "./views/AIAnalyzerPage";
import GuestRoute from "./layouts/GuestRoute";
import HomePage from "./views/HomePage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" position="top-right" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/builds" element={<MyBuildsPage />} />
          <Route path="/builds/create" element={<AddBuildPage />} />
          <Route path="/builds/:id/edit" element={<EditBuildPage />} />
          <Route path="/ai" element={<AIAnalyzerPage />} />
        </Route>
      </Routes>
      <footer className="py-6 text-center border-t border-gold/20">
        <p className="font-nunito text-parchment-dim text-sm">
          Skirk Portal © 2026
        </p>
      </footer>
    </>
  );
}

export default App;
