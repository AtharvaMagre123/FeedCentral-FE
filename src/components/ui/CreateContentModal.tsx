import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
};

export function CreateContentModal({ open, OnClose }: { open: boolean, OnClose: () => void }) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    try {
      const done = await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title,
        link,
        type
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      alert(done.data.message);
      OnClose();
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while creating content. Please try again.");
      }
    }
  }

  return (
    <div>
      {open && <div>
        
        <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 opacity-70 flex justify-center">
          
        </div>


        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white rounded opacity-100 p-4">
              <div className="flex justify-end ">
                <div onClick={OnClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleref} placeholder="Title" />
                <Input ref={linkref} placeholder="Link" />
              </div>

              <div className="flex flex-col items-center py-3">
                <h1>Select Content Type</h1>
                <div className="flex gap-2 py-2">
                  <Button
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    size="sm"
                    loading={false}
                    text="Youtube"
                    onClick={() => setType(ContentType.Youtube)}
                  />
                  <Button
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    size="sm"
                    loading={false}
                    text="Twitter"
                    onClick={() => setType(ContentType.Twitter)}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-1">
                <Button
                  variant="primary"
                  size="sm"
                  loading={false}
                  text="Submit"
                  onClick={addContent}
                />
              </div>
            </span>
          </div>
        </div>
      
      </div>
      
      }
    </div>
  );
}
