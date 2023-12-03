//styles
import style from "../../assets/styles/Footer.module.scss";
export default function Footer() {
  return (
    <div className={style.container}>
      <ul>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>판매 및 환불</li>
        <li>법적고지</li>
      </ul>
      <ul>
        <li>
          <p>chanyuPark</p>
        </li>
        <li>X</li>
        <li>
          <p>권성민</p>
        </li>
      </ul>
    </div>
  );
}
