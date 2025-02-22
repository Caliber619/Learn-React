import React, { useState } from "react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function Github(){
    const data = useLoaderData()

    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     fetch('https://api.github.com/users/Caliber619')
    //     .then(response => response.json())
    //     .then(data => {
    //             console.log(data);
    //             setData(data)
    //     })
    // }, [])

    return(
        <div className="text-center m-4 bg-gray-800 text-white p-4 text-3xl">
            GitHub Followers : {data.followers} 
            <img src={data.avatar_url} alt="Git pfp" width={300}/>
        </div>
    )

}

export default Github

// hover krne ke time pe hi loader data ko cache me rkh dega ki swiftly load hojae data
export const githubInfoLoader = async ()=> {
    const response = await fetch('https://api.github.com/users/Caliber619')
    return response.json()
}