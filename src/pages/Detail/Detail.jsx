import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//style
import "../../assets/styles/Detail.scss";
import axios from "axios";
import CartContext from "../../context/CartContext";

const Detail = () => {
  const { updateCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("token");
  const params = useParams();
  const [shoesSize, setShoesSize] = useState();
  const [product, setProduct] = useState({ images: [] }); // 이름 변경과 초기값 설정
  const productId = params.productId;
  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}products/${productId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProduct(response.data);
        setMainImg(response.data.images[0]); // 메인 이미지 설정
      });
  }, [productId]);
  const Topimg = (i) => {
    setMainImg(product.images[i]);
  };
  const sizeOptions = Array.from({ length: 15 }, (_, i) => 240 + i * 5).map(
    (size, index) => {
      const isSelected = shoesSize === size;
      const style = isSelected ? { border: "1px solid #000000" } : {};

      return (
        <div key={index} onClick={() => setShoesSize(size)} style={style}>
          {size}
        </div>
      );
    }
  );
  const productInfo = {
    productId: product.Id,
    productName: product.Name,
    price: product.Price,
    quantity: 1,
    size: shoesSize,
  };
  const addCart = () => {
    if (token) {
      axios
        .post(`${process.env.REACT_APP_BACKEND}cart`, productInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          navigate("/cart");
          updateCartCount();
        });
    } else {
      let locallist = {
        product_id: product.Id,
        product_name: product.Name,
        price: product.Price,
        quantity: 1,
        size: shoesSize,
      };
      let cartItems =
        JSON.parse(window.localStorage.getItem("cartItems")) || [];
      cartItems.push(locallist);
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      navigate("/cart");
    }
  };

  return (
    <div className="detail_bg">
      <div className="detail_bg_container">
        <div className="center_row_flex">
          <div className="detail_top_img">
            <img src={mainImg} alt="" />
          </div>
          <div className="detail_top_info">
            <p className="detail_title">{product.Name}</p>
            <div className="shoes_imgs">
              {product.images.map((img, i) => (
                <div key={i} onMouseOver={() => Topimg(i)}>
                  <img
                    src={img}
                    alt="img"
                    style={{
                      border: mainImg === img ? "1px solid #000000" : "none",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="content_flex">
              <div className="font">사이즈 선택</div>
              <div className="size_options row_flex">{sizeOptions}</div>
              <p className="font" id="price">
                {product.Price} KRW
              </p>
              <button id="buy" disabled={!shoesSize}>
                Buy
              </button>
              <button id="cart" onClick={addCart} disabled={!shoesSize}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="comment">
          <p>{product.comment}</p>
        </div>
        <>
          <img src={product.ContentImgURL} alt="img" />
        </>
      </div>
    </div>
  );
};
export default Detail;
