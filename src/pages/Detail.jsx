import { useParams } from "react-router-dom";
import data from "../Test/Data";
import { useState } from "react";
//style
import "../assets/styles/Detail.scss";

const Detail = () => {
  const params = useParams();
  const [products] = useState(data);
  const path =
    products[Math.floor(params.productId / 10 - 1)].content[
      params.productId % 10
    ];
  const sizeOptions = Object.keys(path.size).map((size, index) => (
    <div key={index}>{size}</div>
  ));
  const imgSelect = Object.values(path.imgSecter).map((img, i) => {
    return (
      <div key={i}>
        <img src={img} alt="img" />
      </div>
    );
  });

  return (
    <div className="detail_bg">
      <div className="detail_bg_container">
        <div className="center_row_flex">
          <div className="detail_top_img">
            <img src={path.MainimageURL} alt="" />
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
              <button id="buy">Buy</button>
              <button id="cart">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
