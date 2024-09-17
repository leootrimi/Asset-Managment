import { useState } from 'react';
import { BiHome, BiBookAlt, BiMessage,BiHeadphone, BiMouse, BiGroup, BiLaptop, BiChevronDown } from 'react-icons/bi';
import './SideBar.css';

const ProfileSideBar = () => {
    const [isAssetsOpen, setIsAssetsOpen] = useState(false);

    const toggleAssetsDropdown = () => {
        setIsAssetsOpen(!isAssetsOpen);
    };

    return (
        <div className="menu">
            <div className="logo">
                <BiBookAlt className='logo-icon' />
                <h2>91Life</h2>
            </div>
            <div className="menu--list">
                <a href="#" className='item'>
                    <BiHome className='icon' />
                    Dashboard
                </a>

                <a href="#" className='item'>
                    <BiGroup className='icon' />
                    Employers
                </a>

                <div className='item' onClick={toggleAssetsDropdown}>
                    <BiLaptop className='icon' />
                    Assets
                    <BiChevronDown className={`chevron ${isAssetsOpen ? 'open' : ''}`} />
                </div>

                {isAssetsOpen && (
                    <div className="dropdown">
                        <a href="#" className='itemd'>
                            <BiLaptop className='icon' />
                            Laptops
                        </a>
                        <a href="#" className='itemd'>
                        <BiHeadphone className='icon' />
                            Headphones
                        </a>
                        <a href="#" className='itemd'>
                        <BiMouse className='icon' />
                            Mice
                        </a>
                    </div>
                )}

                <a href="#" className='item'>
                    <BiMessage className='icon' />
                    Requests
                </a>

                <a href="#" className='item'>
                    <BiHome className='icon' />
                    Stats
                </a>
            </div>
        </div>
    );
};

export default ProfileSideBar;