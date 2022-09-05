import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import logo from '../img/fakebook_logo.png'
import img from '../img/profile_img.jpg'

import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar'


function Navbar () {

    return(
        <div className='navbar-container'>
            <div className='navbar'>
                <div>
                    <img alt="logo" src={logo} height="60" className="mr-2"></img>
                </div>
                <div className='navbar-search-container'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='navbar-search' placeholder="Search Fakebook" />
                    </span>
                </div>
                <div>
                    <Avatar image={img} shape='circle' size='xlarge' className='navbar-avatar'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar