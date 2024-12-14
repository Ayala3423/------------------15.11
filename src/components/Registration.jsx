import { useState } from 'react'
import PropTypes from 'prop-types';

function Registration({ setIsRegistrationVisible, setCurrentPlayers, index }) {
    const [registrationStatus, setRegistrationStatus] = useState('login');
    const [userData, setUserData] = useState({ name: '', password: '' });

    const toggleForm = () => {
        setRegistrationStatus(prev => (prev === 'login' ? 'signUp' : 'login'));
    };

    const dataCheck = () => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[userData.name]) {
            if (users[userData.name].password === userData.password) {
                registrationStatus === 'login' ? completeRegistration(users) : alert("You already have an account");
            } else {
                registrationStatus === 'login' ? alert("Incorrect username or password") : register(users);
            }
        } else {
            registrationStatus === 'login' ? alert("Incorrect username or password") : register(users);
        }
    };

    const handleName = (event) => {
        setUserData(prev => ({ ...prev, name: event.target.value }));
    };

    const handlePassword = (event) => {
        setUserData(prev => ({ ...prev, password: event.target.value }));
    };

    const register = (users) => {
        users[userData.name] = { password: userData.password, scores: [], isRegistrationVisible: false };
        localStorage.setItem("users", JSON.stringify(users));
        setCurrentPlayers(prev => [
            ...(prev || []),
            { name: userData.name, password: userData.password, scores: [] }
        ]);
        setIsRegistrationVisible(prevVisible => {
            const newVisible = [...prevVisible];
            newVisible[index] = false;
            return newVisible;
        });
    };

    return (
        <>
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="username" onChange={handleName} required />
                        <input type="password" placeholder="password" onChange={handlePassword} required />
                        <button className='registrationButton' onClick={() => dataCheck()}>{registrationStatus === 'login' ? "Login" : "Create"}</button>
                        <p className="message" onClick={toggleForm}>{registrationStatus === 'login' ? "Not registered?" : "Already registered?"} <a href="#">{registrationStatus === 'login' ? "Create an account" : "Sign In"}</a></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Registration;

Registration.propTypes = {
    setIsRegistrationVisible: PropTypes.func.isRequired,
    setCurrentPlayers: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};