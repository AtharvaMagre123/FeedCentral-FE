import type { ReactElement } from "react";
import { LoadingIcon } from "../../icons/LoadingIcon";

interface ButtonProps {
    variant: "primary" | "secondary" ;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?:()=>void;
    fullwidth?:boolean;
    loading?:boolean;
}



const sizeStyles={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-5"
}

const defaultStyles="px-4 py-2 rounded-md flex items-center font-light"

const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}

export const Button = ({variant,size,text,startIcon,endIcon,onClick,fullwidth,loading}:ButtonProps) => {
    return (
    <button className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]} ${fullwidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-50" : ""}`} onClick={onClick} disabled={loading}>
        {loading && <LoadingIcon/>}

       
      {loading===false && startIcon? <div className="pr-2">{startIcon}</div> : null}{loading===false && text} {loading===false && endIcon? <div className="pl-2">{endIcon}</div> : null}
    </button>
    )
}