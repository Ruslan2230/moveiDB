import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";
import FilterGenres from "./FilterGenres";

export default class FilterGenresFromApi extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      genres: [],
      with_genres: []
    };
  }
  static propTypes = {
    with_genres: PropTypes.array.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  onChangeGenres = event => {
    const { with_genres } = this.props;
    const { checked, value } = event.target;
    
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: checked
          ? [...with_genres, value]
          : with_genres.filter(item => Number(item) !== Number(value))
      }
    });
    
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
    return (
      <FilterGenres
        genres={genres}
        with_genres={with_genres}
        onChangeGenres={this.onChangeGenres}
      />
    );
  }
}
