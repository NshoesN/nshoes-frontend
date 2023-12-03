import React, { useEffect, useState } from "react";
import axios from "axios";
//style
import "../../assets/styles/Account.scss";
import "../../assets/styles/Flex.scss";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [token]);

  const handleChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}users/` + userInfo.id,
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUserInfo(response.data);
        window.alert("정보가 업데이트되었습니다");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const isFormEmpty =
    !updatedInfo.name || !updatedInfo.email || !updatedInfo.password;

  return (
    <div>
      {token ? (
        userInfo && (
          <div className="account_bg">
            <h2>User Information</h2>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <form onSubmit={handleSubmit} className="account_container">
              <div className="flex_row">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex_row">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={updatedInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex_row">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={updatedInfo.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" disabled={isFormEmpty}>
                Update
              </button>
            </form>
          </div>
        )
      ) : (
        <div>환영합니다!</div>
      )}
    </div>
  );
};

export default Account;
