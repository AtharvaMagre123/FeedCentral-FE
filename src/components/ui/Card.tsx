import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { LinkIcon } from "../../icons/LinkIcon";
import { YoutubeIcon } from "../../icons/YouttubeIcon";
import { X } from "../../icons/X";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  fetchContent: () => void;
}


function loadTwitterScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const w = window as any;
    if (w.twttr?.widgets) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      if (w.twttr?.widgets) resolve();
      return;
    }

    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

function TweetEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  const normalized = url.replace("x.com", "twitter.com");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setError(false);
      await loadTwitterScript();
      if (cancelled) return;
      const w = window as any;
      if (w?.twttr?.widgets) {
        await w.twttr.widgets.load(containerRef.current);
        setTimeout(() => {
          if (!containerRef.current?.querySelector("iframe")) {
            setError(true);
          }
        }, 1200);
      } else {
        setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [normalized]);

  const retry = async () => {
    setError(false);
    await loadTwitterScript();
    (window as any)?.twttr?.widgets?.load(containerRef.current);
  };

  return (
    <div ref={containerRef}>
      <blockquote className="twitter-tweet" data-dnt="true" data-width="100%">
        <a href={normalized} />
      </blockquote>

      {error && (
        <div className="mt-2 text-sm text-gray-500">
          Couldn’t load the tweet.{" "}
          <button onClick={retry} className="underline">
            Retry
          </button>{" "}
          or{" "}
          <a href={normalized} target="_blank" rel="noopener noreferrer" className="underline">
            open on Twitter
          </a>.
        </div>
      )}
    </div>
  );
}

export function Card({ title, link, type, fetchContent }: CardProps) {

  async function DeleteModal(){
    try {
      const done = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data:{
          title:title
        },
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      alert(done.data.message);
      // Reload content after successful deletion
      fetchContent();
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while deleting content. Please try again.");
      }
    }
  }
  


  return (
    <div>
      <div className="bg-white rounded-md shadow-md p-4 border border-gray-200 min-h-84 w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="pr-2 text-gray-400">
              {type === "youtube" && <YoutubeIcon />}
              {type === "twitter" && <X />}
            </div>
            {title}
          </div>
          <div className="flex items-center gap-3">
            <div className="pr-2 text-gray-400">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <LinkIcon />
              </a>
            </div>
           <button className="text-gray-400" onClick={DeleteModal}>
           <DeleteIcon />
           </button>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="rounded-md w-full"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {type === "twitter" && <TweetEmbed url={link} />}
        </div>
      </div>
    </div>
  );
}
