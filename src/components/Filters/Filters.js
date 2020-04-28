import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import FilterYears from "./FilterYears";
import FilterGenresFromApi from "./FilterGenresFromApi";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, release_years, with_genres },
      pagination: { page, total_pages },
      onChangeFilters,
      onChangePagination,
      onReset
    } = this.props;
    return (
      <form className="mb-3">
        <div>
          <button type="button" className="btn clear-btn" onClick={onReset}>
            Сбросить фильтры
          </button>
        </div>
        
         <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

         <FilterYears
                release_years={release_years}
                onChangeFilters={onChangeFilters}
                />
                <p>Год выхода: {release_years}</p>
          <FilterGenresFromApi onChangeFilter={onChangeFilters} with_genres={with_genres} />
         <Pagination
          onChangePagination={onChangePagination}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}