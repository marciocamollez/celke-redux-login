import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ active, handleLogout }) => (
    <nav className={active ? "sidebar" : "sidebar toggled"}   >
        <ul className="list-unstyled">
            <li><Link to="/dashboard"> Dashboard</Link></li>
            <li><Link to="/user"> Usuário</Link></li>
            <li><Link to="#" onClick={() => handleLogout()}> Sair</Link></li>
        </ul>
    </nav>
);

export default Sidebar;