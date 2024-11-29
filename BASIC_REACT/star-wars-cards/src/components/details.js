import React, { useState } from "react";

const DetailSection = ({ movie }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = () => {
    if (newComment.name && newComment.comment) {
      setComments([...comments, newComment]);
      setNewComment({ name: "", comment: "" });
    }
  };

  return (
    <div className="mt-4">
      <h3>{movie.title}</h3>
      <img src={`/images/${movie.best_character.image}`} alt={movie.best_character.name} />
      <p>{movie.best_character.bio}</p>
      <h4>Comments</h4>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.name}:</strong> {c.comment}
          </li>
        ))}
      </ul>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Your name"
          value={newComment.name}
          onChange={handleInputChange}
        />
        <textarea
          name="comment"
          className="form-control mb-2"
          placeholder="Your comment"
          value={newComment.comment}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default DetailSection;
