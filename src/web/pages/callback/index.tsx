import { useDiscordAuth, usePreloader } from "../../providers";
import fetchAccessToken from "./fetchAccessToken";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";


const Callback: React.FC = () => {
    const { setUser, setUserRoles, setIsAuthed, setVerifiedUser } = useDiscordAuth();
    const { setPreloader } = usePreloader();
    const navigate = useNavigate();

    const goHome = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        setPreloader(true);
        const fetchData = async () => {
            const data = await fetchAccessToken(window.location.search);
            if (!data) return console.error('An error occurred');
            setUser(data.user);
            setUserRoles(data.roles);
            setIsAuthed(true);
            setVerifiedUser(data.user?.verified);
            navigate('/');
        };
        fetchData();
    }, []);

    return (
        <section className='bg-primary_bg h-screen flex items-center justify-center'>
            <button onClick={goHome} className="text-white">Go Gome</button>
            <h1 className='text-white'>Loading...</h1>
        </section>
    )
}

export default Callback;