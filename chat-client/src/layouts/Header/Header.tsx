import React, { memo } from 'react';
import navigations from 'src/navigation';
import { NavLink } from 'react-router-dom';
import './HeaderStyles.scss';

function Header() {
    const currentPage = window.location.pathname;
    console.log(currentPage);
    
    return (
        <div className="flex-center justify-right w-100 header">
            {navigations.map(function (navigation, index) {
                return (
                    <NavLink key={index} to={navigation.path} className="p-0 px-4">
                        <p>{navigation.name}</p>
                    </NavLink>
                );
            })}
        </div>
    );
}

export default memo(Header);