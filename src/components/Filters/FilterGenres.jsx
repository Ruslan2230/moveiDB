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
      <div className="form-group">
          {genres.map(genre => (
             <div className="form-check" key={genre.id}>
            <input 
            className="checkbox"
            type="checkbox"
            id={genre.id}
            name="with_genres"
            value={genre.id}
            onChange={onChangeGenres}
            checked={with_genres.includes(String(genre.id))}
            />
            <label className="form-check-label" htmlFor={genre.id}>
                  {genre.name}
            </label>
            </div>
          ))}
      </div>
    );
  }
}