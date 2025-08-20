import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    // Function to logout the user and clear state
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        axios.defaults.headers.common['Authorization'] = '';
        navigate('/');
        toast.success('Logged out successfully');
    };

    // Function to check if the user is logged in and fetch user data
    const fetchUser = async () => {
        try {
            // Note: Changed from /api/auth/user to /api/user/data based on previous discussion
            const { data } = await axios.get('/api/user/data'); 
            if (data && data.user) {
                setUser(data.user);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            // Check for unauthorized status to automatically log out
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                toast.error("Session expired. Please log in again.");
                logout();
            } else {
                toast.error("Failed to fetch user data.");
            }
        }
    };

    // Function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message || 'Failed to fetch cars.');
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
            toast.error("Failed to fetch cars from the server.");
        }
    };

    // useEffect to retrieve the token from localStorage on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        fetchCars();
    }, []);

    // useEffect to fetch user data if a token exists
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Added Bearer prefix
            fetchUser();
        } else {
            // Clear auth header if no token is present
            axios.defaults.headers.common['Authorization'] = '';
        }
    }, [token]);

    const isOwner = !!user && user.role === 'owner'; // Derived state

    const value = {
        navigate,
        currency,
        axios,
        token,
        setToken,
        user,
        setUser,
        isOwner,
        showLogin,
        setShowLogin,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        cars,
        setCars,
        fetchUser,
        fetchCars,
        logout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
