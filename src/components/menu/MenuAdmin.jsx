import React from 'react'
import { useNavigate } from 'react-router-dom';
import MenuLogout from '../../asset/Menu_Logout.png';
import MenuUser from '../../asset/Menu_User.png';
import '../../style/Menu.css'

function MenuAdmin(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('tokenLogin');
    localStorage.removeItem('role');
    navigate('/');
  }

  return (
    <div>
        <div className='menu-admin-container'>
            <img onClick={handleLogout} className={props.active2} src={MenuLogout} alt=""/>
        </div>
    </div>
  )
}

export default MenuAdmin