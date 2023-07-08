import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import Menu from "../menu/Menu";
import "../../style/SearchResult.css";
import Next from "../../asset/Next_Song.png";
import Previous from "../../asset/Previous_Song.png";
import Volumn from "../../asset/Volumn.png";
import Audio from "../audio/Audio";
import TimeSlider from "react-input-slider";
import Pause from "../../asset/Pause.png";
import PlayYel from "../../asset/Playlist_Play_YeIcon.png";
import Music from "../../asset/Playlist_IMG.jpg";
import { ArrowRightOutlined } from "@ant-design/icons";
import HNSinger from "../../asset/Home_Singer_HN.jpg";
import ScrollContainer from "react-indiana-drag-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SearchResult() {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [volume, setVolume] = useState(60);

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

  const { state } = useLocation();

  const navigate = useNavigate();

  console.log(state.trackList);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
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

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);
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
            active4="menu-icon"
          />
        </Col>
        <Col span={22}>
          {tracksSearch.length !== 0 ? (
            <div className="searchResult-container">
              <div className="searchResult-top-result-container">
                <h1>TOP RESULT</h1>
                <div className="searchResult-top-result">
                  <div className="searchResult-song-result-container">
                    <img
                      className="searchResult-song-bottom-ava"
                      src={tracksSearch[audioIndex].image}
                      alt=""
                      srcset=""
                    />
                    <div className="searchResult-song-bottom-container">
                      <h3 className="searchResult-song-bottom-name">
                        {tracksSearch[audioIndex].title}
                      </h3>
                      <p className="searchResult-song-bottom-artist-name">
                        {tracksSearch[audioIndex].artists.map((item) => {
                          return item;
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="searchResult-song-bottom-control-container-full">
                    <div className="searchResult-song-bottom-control-container">
                      <div
                        className="searchResult-song-bottom-control-prev-button"
                        // onClick={() => setAudioIndex((audioIndex - 1) % Audio.length)}
                      >
                        <img src={Previous} alt="" srcset="" />
                      </div>
                      <div
                        className="searchResult-song-bottom-control-pause-play-button"
                        onClick={handlePausePlayClick}
                      >
                        {isPlay ? (
                          <img
                            className="searchResult-song-bottom-control-pause-button"
                            src={Pause}
                            alt=""
                            srcset=""
                          />
                        ) : (
                          <img
                            className="searchResult-song-bottom-control-play-button"
                            src={PlayYel}
                            alt=""
                            srcset=""
                          />
                        )}
                      </div>
                      <div
                        className="searchResult-song-bottom-control-next-Button"
                        onClick={() =>
                          setAudioIndex((audioIndex + 1) % Audio.length)
                        }
                      >
                        <img src={Next} alt="" srcset="" />
                      </div>
                    </div>
                    <div className="searchResult-song-bottom-control-play-duration">
                      <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                          track: {
                            backgroundColor: "rgba(255, 255, 255, 0.04);",
                            height: "5px",
                            width: "630px",
                          },
                          active: {
                            backgroundColor: "#FACD66",
                            height: "5px",
                          },
                          thumb: {
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#FACD66",
                            borderRadius: 50,
                          },
                        }}
                      />
                      <p className="searchResult-song-bottom-control-duration">
                        {formatTime(currentTime)}
                      </p>
                    </div>
                    <audio
                      ref={audioRef}
                      src={tracksSearch[audioIndex].source}
                      onLoadedData={handleLoadedData}
                      onTimeUpdate={() =>
                        setCurrentTime(audioRef.current.currentTime)
                      }
                      onEnded={() =>
                        setAudioIndex((audioIndex + 1) % Audio.length)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="searchResult-songs-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1>SONGS</h1>
                  <ArrowRightOutlined
                    onClick={() => navigate("/song")}
                    className="searchResult-songs-btn"
                  />
                </div>
                {tracksSearch.map((item, index) => {
                  return (
                    <div className="searchResult-songs">
                      <div className="searchResult-songs-content">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                          onClick={() => setAudioIndex(index)}
                          src={item.image}
                          alt=""
                          srcset=""
                        />
                        <div className="searchResult-songs-text-container">
                          <h3 className="searchResult-songs-text-title">
                            {item.title}
                          </h3>
                          <p className="searchResult-songs-text-artist">
                            {item.artists.map((item) => {
                              return item;
                            })}
                          </p>
                        </div>
                      </div>
                      <p>02 : 20</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="searchResult-container">
              <div className="searchResult-top-result-container">
                <h1>TOP RESULT</h1>
                <div className="searchResult-top-result">
                  <div className="searchResult-song-result-container">
                    <img
                      className="searchResult-song-bottom-ava"
                      src={state.trackList[audioIndex].image}
                      alt=""
                      srcset=""
                    />
                    <div className="searchResult-song-bottom-container">
                      <h3 className="searchResult-song-bottom-name">
                        {state.trackList[audioIndex].title}
                      </h3>
                      <p className="searchResult-song-bottom-artist-name">
                        {state.trackList[audioIndex].artists.map((item) => {
                          return item;
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="searchResult-song-bottom-control-container-full">
                    <div className="searchResult-song-bottom-control-container">
                      <div
                        className="searchResult-song-bottom-control-prev-button"
                        // onClick={() => setAudioIndex((audioIndex - 1) % Audio.length)}
                      >
                        <img src={Previous} alt="" srcset="" />
                      </div>
                      <div
                        className="searchResult-song-bottom-control-pause-play-button"
                        onClick={handlePausePlayClick}
                      >
                        {isPlay ? (
                          <img
                            className="searchResult-song-bottom-control-pause-button"
                            src={Pause}
                            alt=""
                            srcset=""
                          />
                        ) : (
                          <img
                            className="searchResult-song-bottom-control-play-button"
                            src={PlayYel}
                            alt=""
                            srcset=""
                          />
                        )}
                      </div>
                      <div
                        className="searchResult-song-bottom-control-next-Button"
                        onClick={() =>
                          setAudioIndex((audioIndex + 1) % Audio.length)
                        }
                      >
                        <img src={Next} alt="" srcset="" />
                      </div>
                    </div>
                    <div className="searchResult-song-bottom-control-play-duration">
                      <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                          track: {
                            backgroundColor: "rgba(255, 255, 255, 0.04);",
                            height: "5px",
                            width: "630px",
                          },
                          active: {
                            backgroundColor: "#FACD66",
                            height: "5px",
                          },
                          thumb: {
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#FACD66",
                            borderRadius: 50,
                          },
                        }}
                      />
                      <p className="searchResult-song-bottom-control-duration">
                        {formatTime(currentTime)}
                      </p>
                    </div>
                    <audio
                      ref={audioRef}
                      src={state.trackList[audioIndex].source}
                      onLoadedData={handleLoadedData}
                      onTimeUpdate={() =>
                        setCurrentTime(audioRef.current.currentTime)
                      }
                      onEnded={() =>
                        setAudioIndex((audioIndex + 1) % Audio.length)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="searchResult-songs-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1>SONGS</h1>
                  <ArrowRightOutlined
                    onClick={() => navigate("/song")}
                    className="searchResult-songs-btn"
                  />
                </div>
                {state.trackList.map((item, index) => {
                  return (
                    <div className="searchResult-songs">
                      <div className="searchResult-songs-content">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                          onClick={() => setAudioIndex(index)}
                          src={item.image}
                          alt=""
                          srcset=""
                        />
                        <div className="searchResult-songs-text-container">
                          <h3 className="searchResult-songs-text-title">
                            {item.title}
                          </h3>
                          <p className="searchResult-songs-text-artist">
                            {item.artists.map((item) => {
                              return item;
                            })}
                          </p>
                        </div>
                      </div>
                      <p>02 : 20</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SearchResult;
