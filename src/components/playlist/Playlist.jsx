import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../style/Playlist.css";
import Header from "../Header";
import Menu from "../menu/Menu";
import Music from "../../asset/Playlist_IMG.jpg";
import Singer from "../../asset/Home_Singer_HN.jpg";
import Play from "../../asset/Play_Music.png";
import PlayYel from "../../asset/Playlist_Play_YeIcon.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Playlist() {
  const [show, setShow] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [next, setNext] = useState(false);
  const [previous, setPrevious] = useState(true);
  const navigate = useNavigate();
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

  const handlePlaylist = (index) => {
    setShow(!show);
  };

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

  const handleNext = () => {
    setNext(true);
    setPrevious(false);
  };
  const handlePrevious = () => {
    setNext(false);
    setPrevious(true);
  };

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
            active2="active"
            active3="menu-icon"
            active4="menu-icon"
          />
        </Col>
        <Col span={22}>
          {tracksSearch.length !== 0
            ? navigate("/SearchResult", { state: { trackList: tracksSearch } })
            : ""}
          <div className="playlist-header-text-container">
            <h1 className="playlist-header-text-top">TOP</h1>
            <div className="playlist-header-text">
              <p className="playlist-header-text-playlist">PLAYLIST</p>
              <p className="playlist-header-text-collection">COLLECTION</p>
            </div>
          </div>
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
                          onMouseEnter={() => handlePlaylist(index)}
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
                : <p style={{color: '#FFF'}}>No data</p>}
            </div>
          </ScrollContainer>
        </Col>
      </Row>
    </div>
  );
}

export default Playlist;
