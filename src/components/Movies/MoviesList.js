import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";
import queryString from "query-string";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by , release_years, with_genres } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page,
      primary_release_year: release_years
    };

    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join(",");
    }
    
   const link = `${API_URL}/discover/movie?${queryString.stringify(
    queryStringParams
  )}`;
    fetch(link)
      .then(response => response.json())
      .then(data => {
          this.setState({
            movies: data.results
          });
          this.props.onChangePagination ({ total_pages: data.total_pages });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.pagination.page);
  }

  componentDidUpdate(prevProps) {
    
    if (!_.isEqual(this.props.filters, prevProps.filters)) {
      this.getMovies(this.props.filters, 1);
    }
   
    if (this.props.pagination.page !== prevProps.pagination.page) {
      this.getMovies(this.props.filters, this.props.pagination.page);
    }
  }

  render() {
    const { movies } = this.state;
    // console.log("filters", this.props.filters);
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}