import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <Header />
            {/* outlet ki help se layout same rhega bs outlet ke component change honge so idhar header and footer change nahi honge*/}

            <Outlet />


            <Footer />
        </>
    )
}

export default Layout