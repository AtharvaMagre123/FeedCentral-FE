import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Plusicon } from "../icons/Plusicon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";

interface ContentItem {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "all";
  userId: string;
  tags: string[];
}

export function Dashboard() {


const [modalOpen,setModalOpen] = useState(false)
const {content,fetchContent}=useContent();
const [ContentType,setContentType]=useState<"youtube" | "twitter" | "all">("all");

useEffect(()=>{
  fetchContent();
},[modalOpen])


  return (
    <div>
      <Sidebar setContentType={setContentType} contentType={ContentType}/>
      <div className="p-4 ml-60 min-h-screen">
      <CreateContentModal open={modalOpen} OnClose={() => {setModalOpen(false)}} />
      <div className="flex justify-end gap-4 ">
        <Button
          startIcon={<Plusicon size="md" />}
          size="sm"
          variant="secondary"
          text="Add Content" 
          loading={false}
          onClick={() => {setModalOpen(true)}}
        />
        <Button
          startIcon={<ShareIcon size="md" />}
          size="sm"
          variant="primary"
          text="Share"
          loading={false}
          onClick={() => {}}
        />
      </div>

      <div className="flex mt-9 gap-3 flex-wrap">

      {/* <div className="w-full mb-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={ContentType === "youtube" ? "primary" : "secondary"}
            text="YouTube"
            loading={false}
            onClick={() => setContentType("youtube")}
          />
          <Button
            size="sm"
            variant={ContentType === "twitter" ? "primary" : "secondary"}
            text="Twitter"
            loading={false}
            onClick={() => setContentType("twitter")}
          />
        </div>
      </div> */}

    {content
      .filter((item: ContentItem) => item.type === ContentType)
      .map(({title, link, type}) =>
        <Card
          key={title}
          type={type}
          title={title}
          link={link}
          fetchContent={fetchContent}
        />
      )}

      {ContentType==="all" && content.map(({title, link, type}) =>
        <Card
          key={title}
          type={type}
          title={title}
          link={link}
          fetchContent={fetchContent}
        />
      )}
       
      </div>
      </div>
     
    </div>
  );
}


