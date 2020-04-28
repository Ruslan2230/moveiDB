import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";
import FilterGenres from "./FilterGenres";

export default class FilterGenresFromApi extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      with_genres: []
    };
  }
  static propTypes = {
    with_genres: PropTypes.array.isRequired,
    onChangeFilter: PropTypes.func.isRequired
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
    // const checked = event.target.checked;
    // const value = event.target.value;
    
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