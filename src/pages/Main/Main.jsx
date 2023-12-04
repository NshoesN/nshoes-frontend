import { useNavigate } from 'react-router-dom'
//style
import '../../assets/styles/Main.scss'
//images
import MainTop_1 from '../../assets/images/MainTop_1.png'
import MainTop_2 from '../../assets/images/MainTop_2.webp'

function Main(pre) {
    const navigate = useNavigate();
    const move = (target) => {
        navigate(`/Detail/${target}`)
    }
    return (
        <div className='MainContainer'>
            <div className="MainTop MainFrame">
                <img src={MainTop_1} alt="shoes" />
                <div className="MainTextContainer">
                    <h2>Nike Air Force 1 '07 Low White</h2>
                    <p>pure white beauty</p>
                    <div className="buttonbox">
                        <button onClick={() => move(1)}>Learn more</button>
                        <button onClick={() => move(1)}>Add Cart</button>
                    </div>
                </div>
            </div>
            <div className="MainBottom MainFrame">
            <img src={MainTop_2} alt="shoes" />
                <div className="MainTextContainer">
                    <h2>Nike Air Force 1 '07 Low Black</h2>
                    <p>pure black beauty</p>
                    <div className="buttonbox">
                        <button onClick={() => move(2)}>Learn more</button>
                        <button onClick={() => move(2)}>Add Cart</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Main