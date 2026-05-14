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
import AboutPage from "./pages/about/AboutPage";
import PrabhupadaBooksPage from "./pages/books/prabhupada-books/PrabhupadaBooksPage";
import PrabhupadaBookDetailPage from "./pages/books/prabhupada-books/PrabhupadaBookDetailPage";
import PrabhupadaBookSectionPage from "./pages/books/prabhupada-books/PrabhupadaBookSectionPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTopButton from "./components/common/BackToTopButton";
import PlaylistDetailPage from "./pages/playlists/PlaylistDetailPage";
import PlaylistOwnersPage from "./pages/playlists/PlaylistOwnersPage";
import OwnerPlaylistsPage from "./pages/playlists/OwnerPlaylistsPage";
import PlaylistVideoDetailPage from "./pages/playlists/PlaylistVideoDetailPage";
import RegisterDevoteePage from "./pages/register/RegisterDevoteePage";
import CentresPage from "./pages/centres/CentresPage";
import AskGuidancePage from "./pages/chat/AskGuidancePage";
import ChatRoomPage from "./pages/chat/ChatRoomPage";
import DevoteeRoute from "./components/protected/DevoteeRoute";
import DevoteeChatsPage from "./pages/chat/DevoteeChatsPage";
import UserChatHistoryPage from "./pages/chat/UserChatHistoryPage";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
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

            <Route path="/books/prabhupada" element={<PrabhupadaBooksPage />} />
            <Route
              path="/books/prabhupada/:bookKey"
              element={<PrabhupadaBookDetailPage />}
            />
            <Route
              path="/books/prabhupada/:bookKey/section/:sectionKey"
              element={<PrabhupadaBookSectionPage />}
            />

            <Route path="/playlists" element={<PlaylistOwnersPage />} />
            <Route
              path="/playlists/owners/:channelId"
              element={<OwnerPlaylistsPage />}
            />

            <Route
              path="/playlists/:playlistId"
              element={<PlaylistDetailPage />}
            />

            <Route
              path="/playlists/:playlistId/videos/:videoId"
              element={<PlaylistVideoDetailPage />}
            />

            <Route path="/ask-guidance" element={<AskGuidancePage />} />
            <Route path="/chat/:conversationId" element={<ChatRoomPage />} />
            <Route path="/user/my-chats" element={<UserChatHistoryPage />} />
          </Route>

          <Route element={<DevoteeRoute />}>
            <Route path="/devotee/chats" element={<DevoteeChatsPage />} />
          </Route>

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/devotee/register" element={<RegisterDevoteePage />} />
          <Route path="/centres" element={<CentresPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;