import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_REAL_TMDB_TOKEN'
    }
  };

  useEffect(() => {

    setLoading(true);

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {

        const allVideos = data.results || [];

        console.log("TMDB VIDEOS:", allVideos);

        // ✅ Get all YouTube videos
        let youtubeVideos = allVideos.filter(
          (vid) => vid.site?.toLowerCase() === "youtube"
        );

        // 🔥 fallback if empty (IMPORTANT FIX)
        if (youtubeVideos.length === 0) {
          youtubeVideos = allVideos;
        }

        setVideos(youtubeVideos);
        setLoading(false);

      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [id]);

  return (
    <div className='player'>

      {/* BACK BUTTON */}
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />

      {/* LOADING STATE */}
      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : videos.length > 0 ? (
        <div className="video-list">

          {videos.map((video) => (
            <iframe
              key={video.id}
              width="90%"
              height="400px"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name || "video"}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ))}

        </div>
      ) : (
        <p style={{ color: "white" }}>No videos available 😢</p>
      )}

    </div>
  )
}

export default Player