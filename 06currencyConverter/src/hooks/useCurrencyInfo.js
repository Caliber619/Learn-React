import { useEffect, useState } from "react";


//api url structure (api calls se data string format me aata hai)
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
function useCurrencyInfo(currency){
    const [data, setData] = useState({});//api-json ke object ko hold krne ke liye
    // useEffect needs a callback function and a dependency array
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res)=> res.json())
        // .then lagaya h kyuki fetch(api) se jo response aaega vo string me aaega to we have to convert it into a json
        .then((res) => setData(res[currency]))
        console.log(data);
    },[currency])

    console.log(data);
    return data;
} 

export default useCurrencyInfo;