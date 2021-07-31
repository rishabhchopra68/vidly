import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Pagination from "./common/pagination";

import { paginate } from "../utils/paginate";
// import "react-table/dist/react-table.css";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data: movies } = await getMovies();

    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All genres" }, ...data];
    this.setState({ genres, movies });
  }
  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleLike = (movie) => {
    // const curr = movie.liked ? false : true;
    const movies = [...this.state.movies];

    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies: movies });
  };
  handleDelete = async (movie) => {
    // return <h1>hello</h1>;
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((mov) => mov._id !== movie._id);

    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalMovies });
    }
    // console.log(movie);
  };
  handleGenreSelect = (genre) => {
    // const movies = this.state.movies;

    this.setState({ selectedGenre: genre, searchQuery: "", currPage: 1 });
    // console.log(genre);
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
    const movies = paginate(sorted, currPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const {
      pageSize,
      currPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    if (allMovies.length === 0)
      return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={this.state.genres}
              onGenreSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}

            <p>Showing {totalCount} movies in the database.</p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <div>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currPage={currPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
