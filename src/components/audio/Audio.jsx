import CoDonTrenSofa from "../../audio/CoDonTrenSofa.mp3";
import RangKhon from "../../audio/RangKhon.mp3";
import CoHenVoiThanhXuan from "../../audio/CoHenVoiThanhXuan.mp3";
import { useEffect, useState } from "react";
import axios from "axios";

const Audios = () => {
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    axios
      .get(`https://localhost:44377/api/tracks`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data)
        setTracks(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

const Audio = [
  {
    src: CoHenVoiThanhXuan,
    title: 'Có hẹn với thanh xuân',
    artist: "Monstar",
  },
  {
    src: CoDonTrenSofa,
    title: "Cô đơn trên sofa",
    artist: "Trung Quân Idol",
  },

  {
    src: RangKhon,
    title: "Răng Khôn",
    artist: "Phí Phương Anh",
  },
];

export default Audio;
