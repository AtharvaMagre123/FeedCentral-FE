export function SidebarComponent({text,icon,selected}:{text:string,icon:React.ReactNode,selected:boolean}){
    return <div className={`flex items-center w-full text-black py-2 cursor-pointer hover:bg-gray-100 rounded-md pl-6 transition-all duration-700 ${selected ? "bg-gray-100" : ""}`}>
       <div className="pr-2">
       {icon}
        </div>
        {text}
    </div>
}