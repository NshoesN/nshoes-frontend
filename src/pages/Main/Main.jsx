import { Link } from 'react-router-dom'
//style
import '../../assets/styles/Main.scss'
//images
import MainTop_1 from '../../assets/images/MainTop_1.png'
import MainTop_2 from '../../assets/images/MainTop_2.webp'

function Main(pre) {
    return (
        <div className='MainContainer'>
            <div className="MainTop MainFrame">
                <img src={MainTop_1} alt="shoes" />
                <div className="MainTextContainer">
                    <h2>Nike Air Force 1 '07 Low White</h2>
                    <p>pure white beauty</p>
                    <div className="buttonbox">
                        <button><Link to='/Detail/1'>Learn more</Link></button>
                        <button><Link to='/Detail/1'>Add Cart</Link></button>
                    </div>
                </div>
            </div>
            <div className="MainBottom MainFrame">
            <img src={MainTop_2} alt="shoes" />
                <div className="MainTextContainer">
                    <h2>Nike Air Force 1 '07 Low Black</h2>
                    <p>pure black beauty</p>
                    <div className="buttonbox">
                        <button><Link to='/Detail/2'>Learn more</Link></button>
                        <button><Link to='/Detail/2'>Add Cart</Link>t</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Main