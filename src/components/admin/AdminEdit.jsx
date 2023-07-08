import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Select, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Edit from "../../asset/Edit.png";
import Header from "../Header";
import MenuAdmin from "../menu/MenuAdmin";
import "../../style/PlaylistDetail.css";
import PlayYel from "../../asset/Playlist_Play_YeIcon.png";
import Music from "../../asset/Playlist_IMG.jpg";
import New from "../../asset/NewSong.png";
import video from "../../asset/video.mp4";
import PlayBottomSong from "../play_song/PlayBottomSong";
import SongCom from "../song/SongCom";
import SongAdmin from "../song/SongAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AdminEdit() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const { state } = useLocation();
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [length, setLength] = useState("");

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes} ` : ` ${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? ` 0${seconds}` : ` ${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const handleGetAllTrack = () => {
    axios
      .get(`https://localhost:44377/genres/${state.id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.length);
        setLength(res.data.data.length);
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  useEffect(() => {
    handleGetAllTrack();
  }, [length]);

  useEffect(() => {
    if (state !== null) {
      const fetchData = () => {
        axios
          .get(`https://localhost:44377/api/genres/${state.id}`, {
            headers: {
              Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
            },
          })
          .then(function (response) {
            setGenre(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchData();
    }
  });

  useEffect(() => {
    if (state !== null) {
      const fetchData = () => {
        axios
          .get(`https://localhost:44377/genres/${state.id}`, {
            headers: {
              Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
            },
          })
          .then(function (response) {
            setTracks(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchData();
    }
  });

  const handleUpdateGenre = () => {
    axios
      .put(
        `https://localhost:44377/api/genres/${state.id}`,
        {
          name: newGenre,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        console.log(res);
        res.status === 200
          ? swal("Successfully!", res.data.message, "success")
          : swal("Fail!", "Try again", "error");
        setModalOpen2(false);
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  return (
    <div className="playlistDetail-home">
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <MenuAdmin active1="menu-icon" active2="menu-icon" />
        </Col>
        <Col span={22}>
          {/* Modal */}
          {/* update genre */}
          <Modal
            centered
            wrapClassName="songCom-modal-addTrack-container"
            open={modalOpen2}
            width={700}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            onCancel={() => setModalOpen2(false)}
            footer={[
              <div className="modal-footer-container-2">
                <Button
                  key="back"
                  type="link"
                  onClick={() => setModalOpen2(false)}
                  style={{ color: "#FFF" }}
                >
                  Cancel
                </Button>
                <Button
                  key="submit"
                  type="submit"
                  className="modal-footer-btn"
                  onClick={handleUpdateGenre}
                >
                  Update
                </Button>
              </div>,
            ]}
          >
            <div className="songCom-modal-addTrack">
              <p className="songCom-modal-addTrack-header">UPDATE GENRE</p>
              <div className="songCom-modal-content-container">
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Old genre</p>
                  <Input
                    className="songCom-modal-input"
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Name of artist"
                    value={genre.name}
                    disabled
                  />
                </div>
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">New genre</p>
                  <Input
                    className="songCom-modal-input"
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="New genre"
                    value={newGenre}
                  />
                </div>
              </div>
            </div>
          </Modal>
          <div className="playlistDetail-container">
            <ArrowLeftOutlined
              onClick={() => navigate(-1)}
              className="playlistDetail-arrow-left"
            />
            <div className="playlistDetail-text-container">
              <p className="playlistDetail-text-playlist">{genre.name}</p>
              <RightOutlined className="playlistDetail-arrow-right" />
              <p>Track list</p>
            </div>
          </div>
          <div className="playlistDetail-content-container">
            <video className="playlistDetail-img" src={video} width="750" height="500" autoPlay muted></video>
            <div className="playlistDetail-text-content">
              <div className="playlistDetail-content-container">
                <h1 className="playlistDetail-text-content-listened">
                  {genre.name}
                </h1>
                <img
                  style={{ marginLeft: "4%", marginTop: "2%" }}
                  src={Edit}
                  alt=""
                  srcset=""
                  onClick={() => setModalOpen2(true)}
                />
              </div>
              <p className="playlistDetail-text-content-include">
                {length} songs
              </p>
            </div>
          </div>
          {/* add track */}
          <Modal
            centered
            wrapClassName="songCom-modal-addTrack-container"
            open={modalOpen}
            width={700}
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
                  onClick={() => setModalOpen(false)}
                >
                  Save
                </Button>
              </div>,
            ]}
          >
            <div className="songCom-modal-addTrack">
              <p className="songCom-modal-addTrack-header">
                ADD TRACK TO GENRE
              </p>
              <div className="songCom-modal-content-container">
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Title</p>
                  <Input className="songCom-modal-input" placeholder="" />
                </div>
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Tag (*)</p>
                  <Select
                    className="songCom-modal-input"
                    placeholder="Choose tag"
                  />
                </div>
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Image</p>
                  <div>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
                  </div>
                </div>
                <div className="songCom-modal-content">
                  <p className="songCom-modal-title">Title</p>
                  <Input
                    type="file"
                    className="songCom-modal-input-file"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </Modal>
          <div
            className="playlistDetail-list-container"
            style={{ marginBottom: "64px" }}
          >
            {tracks.length !== 0 ? (
              tracks.map((item) => {
                return (
                  <div>
                    <SongAdmin
                      id={item.trackId}
                      imageURL={item.track.image}
                      duration={formatTime(duration)}
                      name={item.track.title}
                      display="none"
                    />
                    <audio
                      ref={audioRef}
                      src={item.track.source}
                      onLoadedData={handleLoadedData}
                    />
                  </div>
                );
              })
            ) : (
              <p style={{ color: "#fff" }}>No have song</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminEdit;
