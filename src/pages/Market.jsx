import { useState } from "react";
import { Link } from "react-router-dom";
//data
import data from '../Test/Data';
//style
import style from '../assets/styles/Market.module.scss'

function Market() {
    const [products] = useState(data);

    return(
        <div className={style.main_container}>
            {products.map((item, i) => {
                    return (
                        <div key={i} className={style.content_container}>
                            <p>{item.subject}</p>
                            <div className={style.content_item}>
                                {item.content.map((product) => (
                                    <Link to={`/Detail/${product.productId}`} key={product.productId}>
                                        <img src={product.MainimageURL} alt="img" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
            })}
        </div>
    )
}

export default Market;
