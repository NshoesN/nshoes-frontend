import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Header.scss";
import Logo from "../../assets/images/NshesLogo.png";
import Search from "../../assets/icons/search_FILL0_wght400_GRAD0_opsz24.png";
import axios from "axios";
import LoadingIndicator from "../Loading";

export const backend = 'https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/'

function SearchDropdown(props) {
  const [userInput, setUserInput] = useState("");
  const [dataList, setDataList] = useState([]);
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${backend}products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const dataWithLoadingState = response.data.map(item => ({ ...item, isLoading: true }));
        setDataList(dataWithLoadingState);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const results = !userInput
    ? [] // 검색어가 없을 때는 빈 배열을 반환
    : dataList.filter((data) => data.Name.toLowerCase().includes(userInput));

  const handleImageLoad = (id) => {
    setDataList(prevDataList => prevDataList.map(item => item.Id === id ? { ...item, isLoading: false } : item));
  }

  return (
    <div className="SearchDropdown_Container">
      <div className="SearchTitle">
        <p>Search To</p>
        <img src={Logo} alt="logo" />
      </div>
      <div className="SearchBox">
        <input type="text" id="SearchBox" onChange={getValue} />
        <img src={Search} alt="Search" />
      </div>
      <ul onClick={() => props.toggle()}>
        {results.map((item) => (
          <li key={item.Id}>
            <Link to={`/detail/${item.Id}`}>
              {item.isLoading && <LoadingIndicator />}
              <img
                src={item.MainImgURL}
                alt=""
                onLoad={() => handleImageLoad(item.Id)}
                style={{display: item.isLoading ? 'none' : 'block'}}
              />
              {!item.isLoading && (
                <>
                  <p>{item.Name}</p>
                  <p>{item.Price}</p>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SearchDropdown;
