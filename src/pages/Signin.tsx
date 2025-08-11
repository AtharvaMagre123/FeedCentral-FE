import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import  {useNavigate}  from "react-router-dom";

export function Signin() {
    const usernameref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
  
   async function signin() {
      const username = usernameref.current?.value;
      const password = passwordref.current?.value;
  
     const response= await axios.post(`${BACKEND_URL}/api/v1/signin`, {
          username,
          password,
      });
      const jwt=response.data.token;
      localStorage.setItem("token",jwt);
      localStorage.setItem("username", username || "");
      navigate("/")
    }
  


  return (
    <div className="h-screen w-screen flex bg-[#303030] justify-center items-center">
      <div className="flex flex-col items-center gap-4 bg-[#DADADA] p-5 rounded-md">
        <Input ref={usernameref} placeholder="Username"  />
        <Input ref={passwordref} placeholder="Password" />
        <div className="pt-2 w-full flex justify-center items-center">
          <Button
            size="sm"
            variant="primary"
            text="Signin"
            fullwidth={true}
            loading={false}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
}
