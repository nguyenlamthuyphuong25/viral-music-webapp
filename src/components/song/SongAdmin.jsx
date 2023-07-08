import React, { useEffect, useState } from "react";
import Music from "../../asset/Playlist_IMG.jpg";
import Edit from "../../asset/EditYel.png";
import Line from "../../asset/Line.png";
import Del from "../../asset/Delete.png";
import "../../style/PlaylistDetail.css";
import { Button, Input, Modal, Select, Upload } from "antd";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Icon } from "@iconify/react";
import axios from "axios";
import swal from "sweetalert";

function SongAdmin(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [track, setTrack] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [mp3, setMp3] = useState(null);
  const [title, setTitle] = useState("");

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleTrack = () => {
    axios
      .put(
        `https://localhost:44377/api/tracks/${props.id}`,
        {
          title: title,
          image: imgUrl,
          source: mp3,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      )
      .then((res) => {
        setModalOpen(false);
        res.status === 200
          ? swal("Successfully!", res.data.message, "success")
          : swal("Fail!", "Try again", "error");
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  const handleGetTrack = () => {
    axios
      .get(`https://localhost:44377/api/tracks/${props.id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((res) => {
        setTrack(res.data.data);
        setTitle(res.data.data.title);
        console.log(res);
        console.log(track);
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  const handleDelTrack = () => {
    axios
      .delete(`https://localhost:44377/api/tracks/${props.id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        swal("Fail!", "Try again", "error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    const file2 = e.target[1]?.files[0];
    if (!file) return;
    if (!file2) return;
    const storageRef = ref(storage, `img/${file.name}`);
    const storageRef2 = ref(storage, `src/${file2.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const uploadTask2 = uploadBytesResumable(storageRef2, file2);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
    uploadTask2.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
          setMp3(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      {/* edit track */}
      <Modal
        centered
        wrapClassName="songCom-modal-addTrack-container"
        open={modalOpen}
        width={700}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
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
            {imgUrl !== null && mp3 !== null ? (
              <Button
                key="submit"
                type="submit"
                className="modal-footer-btn"
                onClick={() => [handleTrack()]}
              >
                Save
              </Button>
            ) : (
              <Button
                key="submit"
                type="submit"
                disabled
                className="modal-footer-btn-inactive"
              >
                Save
              </Button>
            )}
          </div>,
        ]}
      >
        <div className="songCom-modal-addTrack">
          <p className="songCom-modal-addTrack-header">UPDATE TRACK</p>
          <div className="songCom-modal-content-container">
            <div className="songCom-modal-content">
              <p className="songCom-modal-title">Title</p>
              <Input
                className="songCom-modal-input"
                onChange={(e) => setTitle(e.target.value)}
                placeholder=""
                value={title}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="songCom-modal-content">
                <p className="songCom-modal-title">Image</p>
                <div>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="songCom-modal-input-file"
                  />
                </div>
              </div>
              <div className="songCom-modal-content">
                <p className="songCom-modal-title">Source</p>
                <Input
                  type="file"
                  accept=".mp3"
                  className="songCom-modal-input-file"
                />
              </div>
              <button className="songCom-modal-btn" type="submit">
                <Icon icon="material-symbols:arrow-circle-up-rounded" />
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="playlistDetail-song-list-container">
        <div style={{ display: props.display }}>
          <h1 style={{ marginLeft: "32px", marginRight: "32px" }}>1</h1>
          <img src={Line} alt="" srcset="" />
        </div>
        <img
          className="playlistDetail-song-list-ava"
          src={props.imageURL}
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
          src={Edit}
          onClick={() => [setModalOpen(true), handleGetTrack()]}
          alt=""
          srcset=""
          style={{ cursor: "pointer" }}
        />
        <img
          className="playlistDetail-song-list-line"
          src={Line}
          alt=""
          srcset=""
        />
        <img
          className="playlistDetail-song-list-del"
          src={Del}
          alt=""
          srcset=""
          onClick={() => swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this song!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              handleDelTrack();
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your song is safe!");
            }
          })}
        />
      </div>
    </div>
  );
}

export default SongAdmin;
