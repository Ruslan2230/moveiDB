import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";
import FilterGenres from "./FilterGenres";

export default class FilterGenresContainer extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }

  static propTypes = {
    genres: PropTypes.array.isRequired,
    with_genres: PropTypes.array.isRequired,
    onChangeGenres: PropTypes.func.isRequired
  };

  // static defaultProps = {
  //   genres: [],
  //   with_genres: []
  // };

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
    const check = event.target.checked;
    const value = event.target.value;
    this.props.onChangeFilter({
      target: {
        name: "with_genres",
        value: check
          ? [...with_genres, value]
          : with_genres.filter(genre => Number(genre) !== Number(value))
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