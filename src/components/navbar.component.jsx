import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import { ThemeContext, UserContext } from '../App';
import UserNavigationPanel from "./user-navigation.component";
import axios from "axios";
import { storeInSession } from "../common/session";

const Navbar = () => {

    const [ userNavPanel, setUserNavPanel ] = useState(false);

    let { theme, setTheme } = useContext(ThemeContext);

    let navigate = useNavigate();

    const { userAuth, userAuth: { access_token, profile_img, new_notification_available }, setUserAuth } = useContext(UserContext);

    useEffect(() => {

        if(access_token){
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                setUserAuth({ ...userAuth, ...data })
            })
            .catch(err => {
                console.log(err)
            })
        }

    }, [access_token]);

    const handleUserNavPanel = () => {
        setUserNavPanel(currentVal => !currentVal);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200);
    }

    const changeTheme = () => {
        let newTheme = theme == "light" ? "dark" : "light";

        setTheme(newTheme);

        document.body.setAttribute("data-theme", newTheme);

        storeInSession("theme", newTheme);
    }

    return (
        <>
            <nav className="navbar z-50">

                <Link to="/" className="flex-none w-10">
                    <img src={ theme == "light" ? darkLogo : lightLogo } className="w-full" />
                </Link>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <Link to="/editor" className="hidden md:flex gap-2 link">
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10" onClick={changeTheme}>
                        <i className={"fi fi-rr-" + ( theme == "light" ?  "moon-stars" : "sun" ) + " text-2xl block mt-1" }></i>
                    </button>

                    {
                        access_token ? 
                        <>
                            <Link to="/dashboard/notifications">
                                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                                    <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                                    {
                                        new_notification_available ? 
                                        <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span> : ""
                                    }
                                    
                                </button>
                            </Link>

                            <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                <button className="w-12 h-12 mt-1">
                                    <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                                </button>

                                {
                                    userNavPanel ? <UserNavigationPanel /> : ""
                                }

                            </div>
                        </>
                        :
                        <>
                            <Link className="btn-dark py-2" to="/signin">
                            Sign In
                            </Link>
                            <Link className="btn-light py-2 hidden md:block" to="/signup">
                                Sign Up
                            </Link>
                        </>
                    }

                </div>

            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;
