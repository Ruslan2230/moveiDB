import React from "react";

import PropTypes from "prop-types";

export default class SortBy extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные пощ убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          id="sort_by"
          className="form-control"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {/*
          <option value="popularity.desc">Популярные по убыванию</option>
          <option value="popularity.asc">Популярные по возростанию</option>
          <option value="vote_average.desc">Рейтинг по убыванию</option>
          <option value="vote_average.asc">Рейтинг по возростанию</option>
          */}
        </select>
      </div>
    );
  }
}