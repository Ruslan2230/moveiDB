import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";


export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        release_years: "",
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 1
      }
    };
    this.state = { ...this.initialState };
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    const newFilters = {
      ...this.state.filters,
      [name]: value
    }
    
    this.setState({
      filters: newFilters
    });
  };

  onChangePagination = ({ page, total_pages }) => {
    const { pagination: { page: initialPage, total_pages: initialTotalPages }} = this.state;
        this.setState({
      pagination: {
        page: page || initialPage,
        total_pages: total_pages || initialTotalPages,
      },
    });
  };

  onReset = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { filters, pagination } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  pagination={pagination}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                  onReset={this.onReset}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
          <MoviesList 
          onChangePagination={this.onChangePagination}
          filters={filters}
          pagination={pagination}
           />
          </div>
        </div>
      </div>
    );
  }
}