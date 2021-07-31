import React, { Component } from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search ..."
      onChange={(e) => onChange(e.currentTarget.value)}
      name="query"
      className="form-control my-3"
    ></input>
  );
};

export default SearchBox;
