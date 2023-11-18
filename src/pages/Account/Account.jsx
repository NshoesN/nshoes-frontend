import React, { useEffect, useState } from 'react';
import axios from 'axios';
//style
import '../../assets/styles/Account.scss'
import { useNavigate } from 'react-router-dom';

export const backend = 'https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/'

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [updatedInfo, setUpdatedInfo] = useState({name: '', email: '', password: ''});
    const token = window.sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            axios.get(`${backend}userinfo`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUserInfo(response.data); 
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [token]);

    const handleChange = (e) => {
        setUpdatedInfo({...updatedInfo, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${backend}users/` + userInfo.id, updatedInfo, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUserInfo(response.data);
            window.alert('정보가 업데이트되었습니다')
            navigate('/')
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const isFormEmpty = !updatedInfo.name || !updatedInfo.email || !updatedInfo.password;

    return (
        <div>
            {token ? (
                userInfo && (
                    <div>
                        <h2>User Information</h2>
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={updatedInfo.name} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="text" name="email" value={updatedInfo.email} onChange={handleChange} />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="password" value={updatedInfo.password} onChange={handleChange} />
                            </label>
                            <button type="submit" disabled={isFormEmpty}>Update</button>
                        </form>
                    </div>
                )
            ) : (
                <div>환영합니다!</div>
            )}
        </div>
    );
}

export default Account;
