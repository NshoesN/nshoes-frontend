import { useParams } from "react-router-dom";
import data from "../Test/Data";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';  // 추가
//style
import "../assets/styles/Detail.scss";
import axios from "axios";

const Detail = () => {
  const navigate = useNavigate();  // 추가
  const token = window.sessionStorage.getItem('token')
  const params = useParams();
  const [products] = useState(data);
  const [shoesSize, setShoesSize] = useState();
  const path =
    products[params.productId-1].content[
      params.productId-1
    ];
  const [mainImg, setMainImg] = useState(path.imgSector[1]);
  const sizeOptions = Object.keys(path.size).map((size, index) => {
    const isSelected = shoesSize === size;
    const style = isSelected ? { border: '1px solid #000000' } : {};
  
    return (
      <div key={index} onClick={() => setShoesSize(size.toString())} style={style}>{size}</div>
    );
  });
  
  const Topimg = (i) => {
    setMainImg(path.imgSector[i + 1]);
  };
  const imgSelect = Object.values(path.imgSector).map((img, i) => {
    const imgStyle = {
      border: mainImg === img ? "1px solid #000000" : "none",
    };
    return (
      <div key={i} onMouseOver={() => Topimg(i)}>
        <img src={img} alt="img" style={imgStyle} />
      </div>
    );
  });
  const addCart = () => {
    const product = {
      "productId": params.productId,
      "productName": path.title,
      "price":path.price,
      "quantity": 1,
      "size": shoesSize
    };
  
    if(token) {
      axios.post(
        'http://localhost:3001/cart',
        product,
        {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        }
      ).then(() => {
        navigate('/cart');  // 요청 성공 후 /cart로 이동
      })
    } else {
      localStorage.setItem('cartItem', JSON.stringify(product));
      navigate('/cart');
    }
  }
  
  return (
    <div className="detail_bg">
      <div className="detail_bg_container">
        <div className="center_row_flex">
          <div className="detail_top_img">
            <img src={mainImg} alt="" />
          </div>
          <div className="detail_top_info">
            <p className="detail_title">{path.title}</p>
            <div className="shoes_imgs">{imgSelect}</div>
            <div className="content_flex">
              <p className="font">사이즈 선택</p>
              <div className="size_options row_flex">{sizeOptions}</div>
              <p className="font" id="price">
                {path.price} KRW
              </p>
              <button id="buy" disabled={!shoesSize}>Buy</button>
              <button id="cart" onClick={addCart} disabled={!shoesSize}>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="comment">
          <p>{path.comment}</p>
        </div>
        <>
          <img src={path.contentImg} alt="img" />
        </>
      </div>
    </div>
  );
  
};
export default Detail;
