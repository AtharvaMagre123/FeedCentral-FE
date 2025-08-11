import { AllIcon } from "../../icons/AllIcon";
import { Logo } from "../../icons/Logo";
import { X } from "../../icons/X";
import { YoutubeIcon } from "../../icons/YouttubeIcon";
import { SidebarComponent } from "./SidebarComponent";



export function Sidebar({setContentType,contentType}:{setContentType:any,contentType:any}) {
  return (
    <div className="h-screen w-60 bg-[#DADADA] fixed top-0 left-0 pt-7 ">
      <div className="flex text-2xl pl-6 items-center">
        <div className="mr-2 text-purple-600">
          <Logo /> 
        </div>
        <h1 className="text-2xl font-bold font-sans">FeedCentral</h1>
      </div>
      <div className="pt-4">
        <button className="w-full" onClick={()=>setContentType("twitter")}>
        <SidebarComponent text="Twitter" selected={contentType==="twitter"} icon={<X />} />
        </button>
        
        <button className="w-full" onClick={()=>setContentType("youtube")}>
        <SidebarComponent text="Youtube" selected={contentType==="youtube"} icon={<YoutubeIcon />} />
        </button>

        <button className="w-full" onClick={()=>setContentType("all")}>
        <SidebarComponent text="All" selected={contentType==="all"} icon={<AllIcon />} />
        </button>
        
      </div>
    </div>
  );
}
