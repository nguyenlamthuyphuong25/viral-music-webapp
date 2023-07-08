import { Button, Col, DatePicker, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Menu from "../menu/Menu";
import SongCom from "../song/SongCom";
import Music from "../../asset/Home_Singer_HN.jpg";
import Edit from "../../asset/Edit.png";
import PlayYel from "../../asset/Playlist_Play_YeIcon.png";
import PlayBottomSong from "../play_song/PlayBottomSong";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import Play from "../../asset/Play_Music.png";
import swal from "sweetalert";

function Infor() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);
  const [tracksSearch, setTracksSearch] = useState([]);

  const onSearch = (value) =>
    axios
      .get(`https://localhost:44377/api/tracks/name/${value}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then(function (response) {
        setTracksSearch(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const loginToken = localStorage.getItem("tokenLogin");
  var decoded = jwt_decode(loginToken);
  console.log(decoded.username);
  var uname = decoded.username;

  useEffect(() => {
    axios
      .get(`https://localhost:44377/api/users/${uname}`, {
        headers: {
          Authorization: `bearer ${loginToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        setUsername(response.data.data.username);
        setFullname(response.data.data.fullname);
        setAvatar(response.data.data.avatar);
        setPassword(response.data.data.password);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://localhost:44377/api/playlists/list/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      )
      .then(function (response) {
        setPlaylist(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleFullname = () =>
    axios
      .put(
        `https://localhost:44377/api/users/${uname}`,
        {
          fullname: fullname,
          password: password,
        },
        {
          headers: {
            Authorization: `bearer ${loginToken}`,
          },
        }
      )
      .then(function (response) {
        response.status === 200
          ? swal("Successfully!", response.data.message, "success")
          : swal("Fail!", "Try again", "error");
        setFullname(response.data.data.fullname);
      })
      .catch(function (error) {
        console.log(error);
        swal("Fail!", "Try again", "error");
      });

  return (
    <div className="playlist-container">
      <Row>
        <Col span={24}>
          <Header onSearch={onSearch} />
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <Menu
            active1="menu-icon"
            active2="menu-icon"
            active3="menu-icon"
            active4="active"
          />
        </Col>
        <Col span={22}>
          {tracksSearch.length !== 0
            ? navigate("/SearchResult", { state: { trackList: tracksSearch } })
            : ""}
          <div className="playlistDetail-content-container">
            <img className="artist-img" src={avatar} alt="" />
            <div className="playlistDetail-text-content">
              <h1 className="playlistDetail-text-content-listened">
                {fullname}
              </h1>
              <p
                style={{ color: "rgba(255, 255, 255, 0.4)" }}
                className="playlistDetail-text-content-include"
              >
                {username}
              </p>
            </div>
            <img
              style={{ marginTop: "-2%" }}
              src={Edit}
              alt=""
              srcset=""
              onClick={() => setModalOpen(true)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ color: "#FFF" }}>FAVORITE LIST</h1>
            <img
              style={{ width: "56px", height: "56px", marginLeft: "24px" }}
              src={PlayYel}
              alt=""
              srcset=""
            />
          </div>
          {/* add playlist */}
          <Modal
            centered
            wrapClassName="songCom-modal-addTrack-container"
            open={modalOpen}
            width={480}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            footer={[
              <div className="modal-footer-container-2">
                <Button
                  key="back"
                  type="link"
                  onClick={() => setModalOpen(false)}
                  style={{ color: "#FFF" }}
                >
                  Cancel
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  className="modal-footer-btn"
                  onClick={() => [handleFullname(), setModalOpen(false)]}
                >
                  Update
                </Button>
              </div>,
            ]}
          >
            <div className="songCom-modal-addTrack">
              <p className="songCom-modal-addTrack-header">EDIT INFOR</p>
              <div className="songCom-modal-content-container">
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Full name</p>
                  <Input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="songCom-modal-input-modal-2"
                    placeholder=""
                  />
                </div>
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Password</p>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="songCom-modal-input-modal-2"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </Modal>
          <ScrollContainer className="scroll-container">
            <div className="playlist-pic-container">
              {playlist.length !== 0
                ? playlist.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="playlist-pic-relative"
                        onClick={() =>
                          navigate("/playlistDetail", {
                            state: {
                              id: item.id,
                              name: item.name,
                              image: item.image,
                            },
                          })
                        }
                      >
                        <img
                          className="playlist-pic"
                          src={item.image}
                          alt="Music pic"
                        />
                        <div className="playlist-pic-container-hover">
                          <img
                            className="playlist-pic-hover"
                            src={Play}
                            alt="play"
                          />
                          <div className="playlist-text-hover">
                            <p className="playlist-text-hover-most-listen">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "No data"}
            </div>
          </ScrollContainer>
        </Col>
      </Row>
    </div>
  );
}

export default Infor;
