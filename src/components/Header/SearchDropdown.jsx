import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/Header.scss'
import Logo from '../../assets/images/NshesLogo.png'
import Search from '../../assets/icons/search_FILL0_wght400_GRAD0_opsz24.png'

function SearchDropdown(props) {
    const [userInput, setUserInput] = useState('');

    const dataList = [
      { subject: "Nike Air Force 1", content: { title: "Nike Air Force 1 '07 Low White", productId: 10, MainimageURL:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3cc96f43-47b6-43cb-951d-d8f73bb2f912/%EC%97%90%EC%96%B4-%ED%8F%AC%EC%8A%A4-1-07-%EB%82%A8%EC%84%B1-%EC%8B%A0%EB%B0%9C-TttlGpDb.png", /*... other properties ...*/ } 
    },
    {
        subject: "Nike Air Force 1", content:{ title: "Nike Air Force 1 '07 Low Black", productId: 11, MainimageURL:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cd0845e-4eba-4ccf-8237-bc47f1e31f3e/%EC%97%90%EC%96%B4-%ED%8F%AC%EC%8A%A4-1-07-%EB%82%A8%EC%84%B1-%EC%8B%A0%EB%B0%9C-TttlGpDb.png", }
    }
      // ... other products ...
    ];

    const getValue = (e) => {
        setUserInput(e.target.value.toLowerCase())
    }

    const results = !userInput
      ? [] // 검색어가 없을 때는 빈 배열을 반환
      : dataList.filter(data =>
            data.content.title.toLowerCase().includes(userInput)
        );

    return(
        <div className='SearchDropdown_Container'>
            <div className="SearchTitle">
                <p>Search To</p>
                <img src={Logo} alt="logo" />
            </div>
            <div className="SearchBox">
                <input type="text" 
                id='SearchBox'
                onChange={getValue}
                />
                <img src={Search} alt="Search" />
            </div>
            <ul onClick={() => props.toggle()}>
                {results.map(item => (
                  <li key={item.content.productId}>
                    <Link to={`/detail/${item.content.productId}`}>
                      <img src={item.content.MainimageURL} alt="" />
                      <p>{item.content.title}</p>
                    </Link>
                  </li>
                ))}
            </ul>
        </div>
    )
}
export default SearchDropdown
