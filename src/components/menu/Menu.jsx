import React from "react";
import MenuChart from "../../asset/Menu_Chart.png";
import MenuHome from "../../asset/Menu_Home.png";
import MenuPlaylist from "../../asset/Menu_Playlist.png";
import MenuLogout from "../../asset/Menu_Logout.png";
import MenuUser from "../../asset/Menu_User.png";
import "../../style/Menu.css";
import { HomeOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Menu(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('tokenLogin');
    localStorage.removeItem('role');
    navigate('/');
  }

  return (
    <div>
      <div className="menu-container">
        <HomeOutlined onClick={() => navigate('/home')} className={props.active1} />
        <Icon onClick={() => navigate('/playlist')} className={props.active2} icon="majesticons:playlist" />
        <Icon onClick={() => navigate('/chart')} className={props.active3} icon="material-symbols:bar-chart-rounded" />
      </div>
      <div className="menu-user-container">
        <Icon onClick={() => navigate('/infor')} className={props.active4} icon="mdi:user-circle" />
        <img onClick={handleLogout} src={MenuLogout} alt="" />
      </div>
    </div>
  );
}

export default Menu;
