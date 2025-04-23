import React, { useState } from 'react';
import { NavBarContainer } from '../common/NavBarContainer';

export const VisitorDashboard = () => {
    const [activeItem, setActiveItem] = useState('Manage Tasks');

    const menuItems = [
        { label: 'Manage Tasks', icon: 'fas fa-tasks', badge: '3' },
        { label: 'Set My Gate', icon: 'fas fa-calendar-alt' },
        { label: 'Manage Visitor Options', icon: 'fas fa-sliders-h' },
        { label: 'Go To Visitor Options', icon: 'fas fa-external-link-alt' },
        { label: 'Scan Visitor', icon: 'fas fa-qrcode' },
        { label: 'All visitors', icon: 'fas fa-users' },
    ];

    return (
        <NavBarContainer>
            <div className='h-100 flex check'>
                <div className="sideBar">
                    <ul className="sidebar-menu">
                        {menuItems.map((item) => (
                            <li
                                key={item.label}
                                className={`sidebar-item ${activeItem === item.label ? 'active' : ''}`}
                                onClick={() => setActiveItem(item.label)}
                            >
                                <i className={item.icon}></i>
                                <span>{item.label}</span>
                                {item.badge && <span className="badge">{item.badge}</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="contentHolder">
                    {/* Dynamically render based on activeItem if needed */}
                </div>
            </div>
        </NavBarContainer>
    );
};
