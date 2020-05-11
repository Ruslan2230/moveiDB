import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.PureComponent {
    static propTypes = {
      page: PropTypes.number.isRequired,
      total_pages: PropTypes.number.isRequired,
      onChangePagination: PropTypes.func.isRequired
    };
  
    render() {
      const { onChangePagination, page, total_pages } = this.props;
      return (
        <div>
          <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePagination({page: page - 1})}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePagination({page: page + 1})}
          >
            Вперед
          </button>
        </div>
        <div className="page"> 
          {page} из {total_pages}
        </div>
        </div>
      );
    }
  }
  