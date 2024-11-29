import React, { useState } from "react";
import Card from "./components/card.js";
import DetailSection from "./components/details.js";
import sw from "./data.js";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container">
      <div className="row">
        {sw.map((movie) => (
          <div className="col-6 col-md-4" key={movie.episode}>
            <Card movie={movie} onCardClick={handleCardClick} />
          </div>
        ))}
      </div>
      {selectedMovie && <DetailSection movie={selectedMovie} />}
    </div>
  );
};

export default App;

