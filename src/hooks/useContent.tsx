import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface ContentItem {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  userId: string;
  tags: string[];
}

export function useContent(){
    const [content,setContent]=useState<ContentItem[]>([]);


    function fetchContent(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response)=>{
            setContent(response.data.content);
        })
    }
    useEffect(()=>{
        fetchContent();
        let interval=setInterval(()=>{fetchContent()},10 * 1000);
        return ()=>clearInterval(interval);
    },[])

    return {content,fetchContent};
}