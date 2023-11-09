import { Link } from 'react-router-dom'
//style
import '../../assets/styles/Header.scss'
//assets
import Logo from '../../assets/images/NshesLogo.png'
import Search from '../../assets/icons/search_FILL0_wght400_GRAD0_opsz24.png'
import Arrow from '../../assets/icons/iconoir_arrow-tr.png'

function SearchDropdown(props) {
    return(
        <div className='SearchDropdown_Container'>
            <div className="SearchTitle">
                <p>Search To</p>
                <img src={Logo} alt="logo" />
            </div>
            <div className="SearchBox">
                <input type="text" id='SearchBox'/>
                <img src={Search} alt="Search" />
            </div>
            <ul onClick={() => props.toggle()}>
                <li><Link><img src={Arrow} alt="arrow" /><p>Air Force 1 '07 Low White</p></Link></li>
                <li><Link><img src={Arrow} alt="arrow" /><p>Air Force 1 '07 Low White</p></Link></li>
                <li><Link><img src={Arrow} alt="arrow" /><p>Air Force 1 '07 Low White</p></Link></li>
                <li><Link><img src={Arrow} alt="arrow" /><p>Air Force 1 '07 Low White</p></Link></li>
            </ul>
        </div>
    )
}
export default SearchDropdown