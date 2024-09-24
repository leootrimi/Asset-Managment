import { useState } from 'react';
import { BiHome, BiBookAlt, BiMessage, BiStats, BiPlus, BiGroup, BiLaptop, BiChevronDown, BiBuilding } from 'react-icons/bi';
import './SideBar.css';

const SideBar = ({ selectedLogo, setSelectedLogo }) => {
    const [isAssetsOpen, setIsAssetsOpen] = useState(false);

    const toggleAssetsDropdown = () => {
        setIsAssetsOpen(!isAssetsOpen);
    };

    const handleLogoChange = (e) => {
        setSelectedLogo(e.target.value);
    };

    return (
        <div className="menu">
            <div className="logo">
            <BiBuilding className='logo-icon w-25 h-50' />
                <select 
                    value={selectedLogo} 
                    onChange={handleLogoChange} 
                    className="form-control "
                >
                    <option value="91Life">91Life</option>
                    <option value="Matrics">Matrics</option>
                </select>

            </div>
            <hr />
            <div className="menu--list">
                <a href="/admin/dashboard" className='item'>
                    <BiHome className='icon' />
                    Dashboard
                </a>

                <a href="/admin/show/user" className='item'>
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
                        <a href="/admin/show/equipment" className='itemd'>
                            <BiLaptop className='icon' />
                            Show all
                        </a>
                        <a href="/admin/add/equipment" className='itemd'>
                            <BiPlus className='icon' />
                            Add new
                        </a>
                    </div>
                )}

                <a href="/admin/request" className='item'>
                    <BiMessage className='icon' />
                    Requests
                </a>

                <a href="/admin/deprecation" className='item'>
                    <BiStats className='icon' />
                    Deprecation
                </a>
            </div>
        </div>
    );
};

export default SideBar;
