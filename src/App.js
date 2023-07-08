import logo from "./logo.svg";
import Login from "./components/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/home/Home";
import "./App.css";
import Playlist from "./components/playlist/Playlist";
import PlaylistDetail from "./components/playlist/PlaylistDetail";
import Song from "./components/song/Song";
import TagList from "./components/tag/TagList";
import Artist from "./components/artist/Artist";
import Chart from "./components/chart/Chart";
import Infor from "./components/infor/Infor";
import AdminHome from "./components/admin/AdminHome";
import AdminEdit from "./components/admin/AdminEdit";
import SearchResult from "./components/search/SearchResult";
import jwt_decode from "jwt-decode";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedUserRoute from "./ProtectedUserRoute";
import ArtistAdmin from "./components/artist/ArtistAdmin";

function App() {
  return (
    <div className="app-background" style={{ height: "100%" }}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/" element={<ProtectedAdminRoute />}>
          <Route exact path="/adminEdit" element={<AdminEdit />} />
          <Route exact path="/adminHome" element={<AdminHome />} />
          <Route exact path="/artistAdmin" element={<ArtistAdmin />} />
        </Route>
        <Route exact path="/" element={<ProtectedUserRoute />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/playlistDetail" element={<PlaylistDetail />} />
          <Route exact path="/artist" element={<Artist />} />
          <Route exact path="/chart" element={<Chart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/playlist" element={<Playlist />} />
          <Route exact path="/searchResult" element={<SearchResult />} />
          <Route exact path="/song" element={<Song />} />
          <Route exact path="/tagList" element={<TagList />} />
          <Route exact path="/infor" element={<Infor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
