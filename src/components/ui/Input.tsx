export function Input({ ref, placeholder }: { placeholder:string,ref:any}) {
    return (
      <div>
        <input ref={ref} placeholder={placeholder} type={"text"} className="px-4 py-2 my-1 rounded-md border-gray-300 border"/>
      </div>
    );
  }
  