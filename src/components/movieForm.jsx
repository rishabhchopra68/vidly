import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form : {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")} // push is used so that the previous movie edited can be accessed using back navigation
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
