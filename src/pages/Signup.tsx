import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
const navigate=useNavigate();
  function signup() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
    });
    alert("Signup successful");
    navigate("/signin");
  }

  return (
    <div className="h-screen w-screen flex bg-[#303030] justify-center items-center">
      <div className="flex flex-col items-center gap-4 bg-[#DADADA] p-5 rounded-md">
        <Input ref={usernameref} placeholder="Username" />
        <Input ref={passwordref} placeholder="Password" />
        <div className="pt-2 w-full flex justify-center items-center">
          <Button
            size="sm"
            variant="primary"
            text="Signup"
            fullwidth={true}
            loading={false}
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
}
