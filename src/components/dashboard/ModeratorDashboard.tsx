
import { useState, useEffect } from 'react';
import { NavBarContainer } from '../common/NavBarContainer'
import { Outlet, useNavigate, useLocation, Route } from 'react-router-dom';
import { LinkService } from '../../frontServices/LinkService';

export const ModeratorDashboard = () => {
    const [activeItem, setActiveItem] = useState('Manage Tasks');
    const navigate = useNavigate();
    const location = useLocation();
    const links = LinkService.getInstance();

    useEffect(() => {
        let currentSubRoute = location.pathname.split('/moderatorDashboard/')[1] || '';

        // You may want only the first segment after /moderatorDashboard/
        currentSubRoute = currentSubRoute.split('/')[0];

        const matchedItem = menuItems.find(item => item.route === currentSubRoute);
        if (matchedItem) {
            setActiveItem(matchedItem.label);
        } else {
            setActiveItem('Manage Tasks');
        }
    }, [location.pathname]);


    const menuItems = [
        { label: 'Manage Tasks', icon: 'fas fa-tasks', badge: '3' },
        { label: 'Set My Gate', icon: 'fas fa-calendar-alt' },
        { label: 'Manage visit Options', icon: 'fas fa-sliders-h', route: "visitOptions" }, // should go to the moderatorDashboard/visitOption
        { label: 'Go To visit Options', icon: 'fas fa-external-link-alt', route: "goToOptions" },
        { label: 'Scan visit', icon: 'fas fa-qrcode', route: links.servicePoint.scan }, // should go to the servicePoint/scan
        { label: 'All visits', icon: 'fas fa-users', route: "allvisitors" },  // should go to the moderatorDashboard/allvisits
    ];
    const handleMenuClick = (item: any) => {
        setActiveItem(item.label);
        if (item.route) {
            navigate(item.route); // Navigate to subroute like /moderatorDashboard/visitOption
        }
    };

    return (
        <div>
            <NavBarContainer>
                <div className='h-100 flex'>
                    <div className="sideBar">
                        <ul className="sidebar-menu">
                            {menuItems.map((item) => (
                                <li
                                    key={item.label}
                                    className={`sidebar-item ${activeItem === item.label ? 'active' : ''}`}
                                    onClick={() => handleMenuClick(item)}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.label}</span>
                                    {item.badge && <span className="badge">{item.badge}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="contentHolder p-4 w-100">
                        <Outlet />
                    </div>
                </div>
            </NavBarContainer>
        </div>
    )
}
