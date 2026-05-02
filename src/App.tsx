import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import BooksPage from "./pages/books/BooksPage";
import BhagavadGitaPage from "./pages/books/bhagvad-gita/BhagvadGitaPage";
import GitaChapterPage from "./pages/books/bhagvad-gita/GitaChapterPage";
import GitaSlokDetailPage from "./pages/books/bhagvad-gita/GitaSlokDetailPage";
import SrimadBhagavatamPage from "./pages/books/shrimad-bhagvatam/SrimadBhagvatam";
import SBCantoPage from "./pages/books/shrimad-bhagvatam/SBCantoPage";
import SBChapterPage from "./pages/books/shrimad-bhagvatam/SBChapterPage";
import SBSlokDetailPage from "./pages/books/shrimad-bhagvatam/SBSlokDetailPage";
import ChaitanyaCharitamritaPage from "./pages/books/chaitanya-charitamrita/ChaitanyaCharitamritaPage";
import CCLilaPage from "./pages/books/chaitanya-charitamrita/CCLilaPage";
import CCChapterPage from "./pages/books/chaitanya-charitamrita/CCChapterPage";
import CCSlokDetailPage from "./pages/books/chaitanya-charitamrita/CCSlokDetailPage";
import GalleryPage from "./pages/gallery/GalleryPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProtectedRoute from "./components/protected/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/bhagavad-gita" element={<BhagavadGitaPage />} />
          <Route
            path="/books/bhagavad-gita/chapter/:chapterNumber"
            element={<GitaChapterPage />}
          />
          <Route
            path="/books/bhagavad-gita/chapter/:chapterNumber/verse/:verseNumber"
            element={<GitaSlokDetailPage />}
          />

          <Route
            path="/books/srimad-bhagavatam"
            element={<SrimadBhagavatamPage />}
          />

          <Route
            path="/books/srimad-bhagavatam/canto/:cantoNumber"
            element={<SBCantoPage />}
          />

          <Route
            path="/books/srimad-bhagavatam/canto/:cantoNumber/chapter/:chapterNumber"
            element={<SBChapterPage />}
          />

          <Route
            path="/books/srimad-bhagavatam/canto/:cantoNumber/chapter/:chapterNumber/verse/:verseKey"
            element={<SBSlokDetailPage />}
          />

          <Route
            path="/books/chaitanya-charitamrita"
            element={<ChaitanyaCharitamritaPage />}
          />

          <Route
            path="/books/chaitanya-charitamrita/:lilaKey"
            element={<CCLilaPage />}
          />

          <Route
            path="/books/chaitanya-charitamrita/:lilaKey/chapter/:chapterNumber"
            element={<CCChapterPage />}
          />

          <Route
            path="/books/chaitanya-charitamrita/:lilaKey/chapter/:chapterNumber/verse/:verseKey"
            element={<CCSlokDetailPage />}
          />
        </Route>

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
