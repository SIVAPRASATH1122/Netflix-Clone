import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_REAL_TMDB_TOKEN'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));

  }, [category]);

  const scrollLeft = () => {
    cardsRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };

  return (
    <div className='title-cards'>

      <h2>{title ? title : "Popular On Netflix"}</h2>

      <button className="arrow left" onClick={scrollLeft}>
        &#10094;
      </button>

      <div className="card-list" ref={cardsRef}>

        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className='card' key={card.id}>

            <img
              src={
                card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : "https://via.placeholder.com/300"
              }
              alt=""
            />

            <p>{card.original_title}</p>
          </Link>
        ))}

      </div>

      <button className="arrow right" onClick={scrollRight}>
        &#10095;
      </button>

    </div>
  )
}

export default TitleCards