import { Input } from "antd";
import React from "react";
import Logo from "../asset/Logo.png";
import "../style/Header.css";
import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";



function Header(props) {
  return (
    <div className="header-container">
      <img className="header-logo" src={Logo} alt="" />
      <Search
        onSearch={props.onSearch}
        className="header-search"
        placeholder="Search"
        style={{display: props.display}}
      />
    </div>
  );
}

export default Header;
