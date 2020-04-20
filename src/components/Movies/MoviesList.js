import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, pagination) => {
    const { sort_by , release_years, with_genres } = filters;
    const { page } = pagination;
   
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&primary_release_year=${release_years}&with_genres=${with_genres}&page=${page}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        
      });
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.pagination.page);
  }

  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate", prevProps.page, this.props.page);
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.getMovies(this.props.filters, 1);
    }
    if (this.props.filters.release_years !== prevProps.filters.release_years) {
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.pagination.page !== prevProps.pagination.page) {
      this.getMovies(this.props.filters, this.props.pagination.page);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //     console.log("props", this.props, "nextProps", nextProps);
  //     if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //       this.getMovies(nextProps.filters);
  //     }
  //   }

  
  render() {
    const { movies } = this.state;
    console.log("filters", this.props.filters);
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