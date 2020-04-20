import React from "react";
import PropTypes from "prop-types";

export default class SortBy extends React.Component {
  static propTypes = {
    with_genres: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    checkboxes: [
      {
        label: "Популярные по убыванию",
        value: "with_genres"
      },
      {
        label: "Популярные по возростанию",
        value: "with_genres"
      },
      {
        label: "Рейтинг по убыванию",
        value: "with_genres"
      },
      {
        label: "Рейтинг по возростанию",
        value: "with_genres"
      }
    ]
  };

  render() {
    const { with_genres, onChangeFilters, checkboxes } = this.props;
    return (
      <div className="form-group">
          {checkboxes.map(checkbox => (
              <>
            <input 
            className="checkbox"
            key={checkbox.value} 
            type="checkbox"
            id="checkbox"
            name="with_genres"
            value={with_genres}
            onChange={onChangeFilters}
            />
            <label htmlFor="checkbox">{checkbox.label}</label>
            </>
          ))}
      </div>
    );
  }
}