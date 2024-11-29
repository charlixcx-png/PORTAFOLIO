import React, { useState } from "react";
import "./style.css"; 

const Card = ({ movie, onCardClick }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hover, setHover] = useState(false);

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setDislikeCount(dislikeCount + 1);

  return (
    <div
      className="card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={hover ? `/images/${movie.best_character.image}` : `/images/${movie.poster}`}
        className="card-img-top"
        alt={movie.title}
        style={{
          borderColor: movie.best_character.affiliation === "Jedi" ? "blue" : "red",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{movie.year}</h6>
        <button className="btn btn-link" onClick={() => onCardClick(movie)}>
          More...
        </button>
        <div className="d-flex justify-content-between mt-2">
          <button className="btn btn-success" onClick={handleLike}>
            Like {likeCount}
          </button>
          <button className="btn btn-danger" onClick={handleDislike}>
            Dislike {dislikeCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
