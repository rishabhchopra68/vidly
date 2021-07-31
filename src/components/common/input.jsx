import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // rest is used so that we dont have to type in new para everytime
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
