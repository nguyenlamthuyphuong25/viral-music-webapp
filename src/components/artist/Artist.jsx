import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import Header from "../Header";
import Menu from "../menu/Menu";
import "../../style/Artist.css";
import PlayYel from "../../asset/Playlist_Play_YeIcon.png";
import Music from "../../asset/Home_Singer_HN.jpg";
import Play from "../../asset/Play.png";
import Pause from "../../asset/Pause.png";
import Line from "../../asset/Line.png";
import Love from "../../asset/Love_Icon_Inactive.png";
import Next from "../../asset/Next_Song.png";
import Previous from "../../asset/Previous_Song.png";
import Volumn from "../../asset/Volumn.png";
import Audio from "../audio/Audio";
import PlayBottomSong from "../play_song/PlayBottomSong";
import SongCom from "../song/SongCom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Artist() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [artist, setArtist] = useState();
  const [tracks, setTracks] = useState([]);

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
    if (audioRef && tracks.length !== 0) {
      audioRef.current.volume = volume / 100;
    }
  }, [tracks, volume, audioRef]);

  const handlePrevios = () => {
    if (audioIndex === 0) {
      setAudioIndex(audioIndex % tracks.length);
    } else {
      setAudioIndex((audioIndex - 1) % tracks.length);
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44377/api/artists/id/${state.id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then(function (response) {
        setArtist(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(`https://localhost:44377/artists/${state.id}`, {
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
  });

  console.log(tracks);

  return (
    <div className="playlistDetail-home">
      <Row>
        <Col span={24}>
          <Header onSearch={onSearch} />
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <Menu
            active1="active"
            active2="menu-icon"
            active3="menu-icon"
            active4="menu-icon"
          />
        </Col>
        <Col span={22}>
          {tracksSearch.length !== 0
            ? navigate("/SearchResult", { state: { trackList: tracksSearch } })
            : ""}
          {artist !== undefined ? (
            <div>
              <div className="playlistDetail-container">
                <ArrowLeftOutlined
                  onClick={() => navigate(-1)}
                  className="playlistDetail-arrow-left"
                />
                <div className="playlistDetail-text-container">
                  <p className="playlistDetail-text-playlist">Artist</p>
                  <RightOutlined className="playlistDetail-arrow-right" />
                  <p>{artist.name}</p>
                </div>
              </div>
              <div className="playlistDetail-content-container">
                <img className="artist-img" src={artist.avatar} alt="" />
                <div className="playlistDetail-text-content">
                  <h1 className="playlistDetail-text-content-listened">
                    {artist.name}
                  </h1>
                  <p className="playlistDetail-text-content-include">
                    {artist.profile}
                  </p>
                  <div
                    onClick={() => setAudioIndex(0)}
                    className="playlistDetail-text-button-play-all"
                  >
                    <img
                      className="playlistDetail-button-play-all"
                      src={PlayYel}
                      alt=""
                    />
                    <p onClick={() => setPlay(true)} className="playlistDetail-text-play-all">Play all</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "-"
          )}

          <h1 style={{ color: "#FFF" }}>PLAYLIST</h1>
          <div className="playlistDetail-list-container">
            {tracks.length !== 0
              ? tracks.map((item, index) => {
                  return (
                    <div>
                      <SongCom
                        duration={formatTime(duration)}
                        image={item.track.image}
                        handlePlay={() => setAudioIndex(index)}
                        name={item.track.title}
                        display="none"
                      />
                    </div>
                  );
                })
              : "No songs"}
          </div>
        </Col>
      </Row>
      {tracks.length !== 0
        ? tracks.map((item, index) => {
            return (
              <div>
                <div key={index} className="playlistDetail-bottom-container">
                  <img
                    className="playlistDetail-song-bottom-ava"
                    src={tracks[audioIndex].track.image}
                    alt=""
                    srcset=""
                  />
                  <div className="playlistDetail-song-bottom-container">
                    <h3 className="playlistDetail-song-bottom-name">
                      {tracks[audioIndex].track.title}
                    </h3>
                  </div>
                  <div className="playlistDetail-song-bottom-control-container-full">
                    <div className="playlistDetail-song-bottom-control-container">
                      <div
                        className="playlistDetail-song-bottom-control-prev-button"
                        onClick={handlePrevios}
                      >
                        <img src={Previous} alt="" srcset="" />
                      </div>
                      <div
                        className="playlistDetail-song-bottom-control-pause-play-button"
                        onClick={handlePausePlayClick}
                      >
                        {isPlay ? (
                          <img
                            className="playlistDetail-song-bottom-control-pause-button"
                            src={Pause}
                            alt=""
                            srcset=""
                          />
                        ) : (
                          <img
                            className="playlistDetail-song-bottom-control-play-button"
                            src={PlayYel}
                            alt=""
                            srcset=""
                          />
                        )}
                      </div>
                      <div
                        className="playlistDetail-song-bottom-control-next-Button"
                        onClick={() =>
                          setAudioIndex((audioIndex + 1) % tracks.length)
                        }
                      >
                        <img src={Next} alt="" srcset="" />
                      </div>
                    </div>
                    <div className="playlistDetail-song-bottom-control-play-duration">
                      <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                          track: {
                            backgroundColor: "rgba(255, 255, 255, 0.04);",
                            height: "5px",
                            width: "1112px",
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
                      <p className="playlistDetail-song-bottom-control-duration">
                        {formatTime(currentTime)}
                      </p>
                    </div>
                    <audio
                      ref={audioRef}
                      src={tracks[audioIndex].track.source}
                      onLoadedData={handleLoadedData}
                      onTimeUpdate={() =>
                        setCurrentTime(audioRef.current.currentTime)
                      }
                      onEnded={() =>
                        setAudioIndex((audioIndex + 1) % tracks.length)
                      }
                    />
                  </div>
                  <div className="playlistDetail-song-bottom-control-volumn-container">
                    <img src={Volumn} alt="" srcset="" />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      className="playlistDetail-song-bottom-control-volumn"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                    />
                  </div>
                </div>
                ) : ( "loading" )
              </div>
            );
          })
        : "loading"}
    </div>
  );
}

export default Artist;
