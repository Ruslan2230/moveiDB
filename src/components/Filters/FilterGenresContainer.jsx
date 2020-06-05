import React from "react";
import PropTypes from "prop-types";

export default class FilterGenres extends React.PureComponent {
  static propTypes = {
    genres: PropTypes.array.isRequired,
    with_genres: PropTypes.array.isRequired,
    onChangeGenres: PropTypes.func.isRequired
  };

  static defaultProps = {
    genres: [],
    with_genres: []
  };

  render() {
    const { genres, with_genres, onChangeGenres } = this.props;
    return (
        <FilterGenres
        genres={genres}
        with_genres={with_genres}
        onChangeGenres={this.onChangeGenres}
      />
    );
  }
}