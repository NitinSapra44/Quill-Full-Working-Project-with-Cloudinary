import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";

function InfoPage(){
    const [info,setInfo] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/info").then((res)=>{
            setInfo(res.data.content)
            console.log(res.data.content)
        })
    },[])

    return (
  <div className="my-20 mx-auto px-4">
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: info }}
    />
  </div>
);


}

export default InfoPage