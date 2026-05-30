import { useEffect, useState } from "react";
interface AppHighlight {
  title: string;
  thumbnail: string;
  description: string;
  rating: number;
  reviews: number;
  downloads: string;
  video: string;
  link: string;
  images: string[];
  author: string;

  content_rating?: {
      text: string;
  };
}

interface SerpApiResponse {
  app_highlight: AppHighlight;
}

import "../App.css";

function Preview() {
    // const [data, setData] = useState<any>(null);
    const[data, setData] = useState<SerpApiResponse | null>(null);
    // const API_KEY = "9e4073012418234104c8f4f93800513776ad6dcf42555c86734a515381086007";
    // const ENDPOINT = "https://serpapi.com/search";

    const params = {
        engine: "google_play_games",
        q: "clash of clans",
        hl: "en",
        gl: "us",
    };

    useEffect(() => {
        // const queryString = new URLSearchParams({
        //     ...params,
        //     api_key: API_KEY,
        // }).toString();

        // const url = `${ENDPOINT}?${queryString}`;

        // fetch("https://corsproxy.io/?" + encodeURIComponent(url))
        //     .then((res) => res.json())
        //     .then((result) => setData(result))
        //     .catch(() => setData("error"));
        const queryString = new URLSearchParams(params).toString();
        fetch(`/api/preview?${queryString}`)
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) return <div className="loading">Loading...</div>;
    // if (data === "error") return <div className="error">Failed to load</div>;

    const app = data?.app_highlight;

     if (!app) {
            return <div>No app found</div>;
        }


    return (
        <div className="container">
            <div className="card">

                <div className="header">
                    <h1 className="title">{app.title}</h1>
                    <p className=  "author">by {app.author}</p>
                    <p className="description">{app.description}</p>
                </div>

                <img src={app.thumbnail} className="thumbnail" />

                <iframe
                    className="video"
                    src={app.video}
                    allowFullScreen
                />

                <div className="stats">
                    <div>
                        ⭐ <b>{app.rating}</b>
                    </div>
                    <div>
                        💬 <b>{app.reviews}</b>
                    </div>
                    <div>
                        📥 <b>{app.downloads}</b>
                    </div>
                    <div>
                        🧒 <b>{app.content_rating?.text}</b>
                    </div>
                </div>

                <h2 className="section-title">Preview</h2>

                <div className="image-row">
                    {app.images?.slice(0, 6).map((img: string, i: number) => (
                        <img key={i} src={img} className="preview-image" />
                    ))}
                </div>

                <a
                    href={app.link}
                    target="_blank"
                    className="install-button"
                >
                    Install
                </a>

            </div>
        </div>
    );
}

export default Preview;