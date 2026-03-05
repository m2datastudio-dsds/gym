import { jwtDecode } from 'jwt-decode';
import { notification } from 'antd';
const API_BASE_URL = process.env.REACT_APP_APIURL


const login = async (username, password) => {
    localStorage.clear();

    const response = await fetch(`${API_BASE_URL}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token stored in localStorage:", data.token);  // For debugging
        let decodedToken = jwtDecode(data.token);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        setLogoutTimer(decodedToken.exp); // Automatically set the timer to logout on expiry
    }

    return data;
};

const setLogoutTimer = (expiryTime) => {
    const currentTime = Date.now() / 1000;
    const remainingTime = (expiryTime - currentTime) * 1000;

    setTimeout(() => {
        logout();
        window.location.href = "/"; 
        notification.error({
            message: 'Session expired',
            description: 'Your session has expired. Please log in again.',
            placement: 'topRight',
            duration: 2.5,
        });
    }, remainingTime);
};

const logout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login page on logout
};

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
};

export default {
    login,
    logout,
    isAuthenticated,
    isTokenExpired,
    setLogoutTimer,
};
