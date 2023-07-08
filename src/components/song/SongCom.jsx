import React, { useState } from "react";
import Music from "../../asset/Playlist_IMG.jpg";
import Play from "../../asset/Play.png";
import Line from "../../asset/Line.png";
import Love from "../../asset/Love_Icon_Inactive.png";
import "../../style/PlaylistDetail.css";
import { Button, Input, Modal, Select, Upload } from "antd";
import axios from "axios";
import swal from "sweetalert";

function SongCom(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange2 = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
  };

  const handlePlaylist = () => {
    axios
      .post(
        `https://localhost:44377/api/playlists/${localStorage.getItem('username')}`,
        {
          name: name,
          image: image
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      )
      .then((res) => {
        res.status === 201
          ? swal("Successfully!", res.data.message, "success")
          : swal("Fail!", "Try again", "error");
          setModalOpen(false)
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  return (
    <div>
      <div style={{width: props.widthCon}} className="playlistDetail-song-list-container">
        <div style={{ display: props.display }}>
          <h1 className="songCom-number">{props.id}</h1>
          <img src={Line} alt="" srcset="" />
        </div>
        <img
          className="playlistDetail-song-list-ava"
          src={props.image}
          alt=""
          srcset=""
        />
        <div className="playlistDetail-song-name-container">
          <h3 className="playlistDetail-song-name">{props.name}</h3>
          <p className="playlistDetail-song-artist-name">{props.artist}</p>
        </div>
        <p className="playlistDetail-song-list-duration">{props.duration}</p>
        <p className="playlistDetail-song-list-album">Single</p>
        <img
          className="playlistDetail-song-list-play"
          src={Play}
          onClick={props.handlePlay}
          style={{right: props.right}}
          alt=""
          srcset=""
        />
        <img
          className="playlistDetail-song-list-line"
          src={Line}
          alt=""
          srcset=""
          style={{display: props.lineDisable}}
        />
        <img
          className="playlistDetail-song-list-favor"
          src={Love}
          onClick={() => setModalOpen(true)}
          alt=""
          srcset=""
          style={{display: props.loveDisable}}
        />
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
            <div>
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
                onClick={handlePlaylist}
              >
                Save
              </Button>
            </div>
          </div>,
        ]}
      >
        <div className="songCom-modal-addTrack">
          <p className="songCom-modal-addTrack-header">ADD TRACK TO YOUR PLAYLIST</p>
          <div className="songCom-modal-content-container">
            <div className="songCom-modal-content">
              <p className="songCom-modal-title">Name</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="songCom-modal-input" placeholder="" />
            </div>
            <div className="songCom-modal-content">
              <p className="songCom-modal-title">Image</p>
              <div>
              <Input
                    className="songCom-modal-input"
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Link here"
                    value={image}
                  />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SongCom;
