import React from "react";
import {Container, Logo, LogoutBtn} from '../index';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logu from "../uiComponents/Logu";

function Header(){
    const authStatus = useSelector((state) => state.auth.status)  //doubt !! - ye kyu hua
    const navigate = useNavigate()

    //conditional rendering ke liye
    const navItems = [    //array banake loop lagate h uspe
        {
          name: 'Home',
          slug: "/",      // !! doubt- what is a slug
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },

    ]



    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">


                    <div className="mr-4">
                        <Link to="/">
                            <Logu />
                            {/* <Logo/> */}
                        </Link>
                    </div>


                    <ul className="flex ml-auto">

                        {navItems.map((item)=>
                            item.active ? (
                                // jo html element repeat hota h uspe key lagani padti hai
                                <li key={item.name}>
                                    <button 
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" 
                                    onClick={()=> navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}

                    </ul>


                </nav>
            </Container>
        </header>
    )
}

export default Header