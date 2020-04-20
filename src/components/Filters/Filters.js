import React from "react";
import SortBy from "./SortBy";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      onChangeFilters,
      pagination: { page, total_pages },
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

          <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            // onClick={ () => {
            //   onChangePage(page - 1);
            // }}
            onClick={onChangePagination.bind(null, page - 1, total_pages)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePagination.bind(null, page + 1, total_pages)}
          >
            Вперед
          </button>
        </div>
        <div className="page">
          {page} из {total_pages}
        </div>
       
      </form>
    );
  }
}