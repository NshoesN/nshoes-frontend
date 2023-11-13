import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../assets/styles/Market.module.scss";
import axios from "axios";
import Loading from '../components/Loading';

function Market() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    axios
      .get("http://localhost:3001/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // 이미지 프리로딩 시작
        const images = response.data.map((item) => {
          const img = new Image();
          img.src = item.MainImgURL;
          return new Promise((resolve) => {
            img.onload = resolve;
          });
        });

        // 모든 이미지가 로딩되면 상품 목록 설정 및 로딩 상태 업데이트
        Promise.all(images).then(() => {
          setProductsList(response.data);
          setLoading(false);
        });
      });
  }, []);
  if (loading) {
    return(
      <Loading></Loading>
    )
  }
  return (
    <div className={style.main_container}>
      <div className={style.content_container}>
      <p>Nike Air Force 1</p>
        <div className={style.content_item}>
          {productsList
            .filter((item) => item.Name.includes("Nike"))
            .map((item, i) => {
              return (
                <div key={i}>
                  <Link to={`/Detail/${item.Id}`} key={item.productId}>
                    <img src={item.MainImgURL} alt="img" />
                  </Link>
                </div>
              );
            })}
        </div>
        <p>Jordan 1</p>
        <div className={style.content_item}>
          {productsList
            .filter((item) => item.Name.includes("Jordan"))
            .map((item, i) => {
              return (
                <div key={i}>
                  <Link to={`/Detail/${item.Id}`} key={item.productId}>
                    <img src={item.MainImgURL} alt="img" />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Market;
