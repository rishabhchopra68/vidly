import React from "react";

const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  selectedItem,
  onGenreSelect,
}) => {
  //   const genres = props.genres;
  //   console.log(genres);

  //   console.log(textProperty, valueProperty);
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty] || genre.name} // check this line
          style={{ cursor: "pointer" }}
          className={
            genre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => {
            onGenreSelect(genre);
          }}
        >
          {genre[textProperty]}
        </li>
      ))}
      {/* <li className="list-group-item">Cras justo odio</li>
      <li className="list-group-item">Dapibus ac facilisis in</li>
      <li className="list-group-item">Morbi leo risus</li>
      <li className="list-group-item">Porta ac consectetur ac</li>
      <li className="list-group-item">Vestibulum at eros</li> */}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name", // to make our listGroup component more flexible
  valueProperty: "_id", // also , setting default props for this component so that we dont need to send too many props from parent
};
export default ListGroup;
