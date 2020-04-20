import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import FilterYears from "./Filters/FilterYears";
import FilterGenre from "./Filters/FilterGenre";

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

  onChangePagination = (
    page,
    total_pages = this.state.pagination.total_pages
  ) => {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        page,
        total_pages
      }
    }));
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
                <div className="App">
                <FilterYears
                realise_years={filters.release_years}
                onChangeFilters={this.onChangeFilters}
                />
                <p>Год выхода: {filters.release_years}</p>

                <FilterGenre
                with_genres={filters.with_genres}
                onChangeFilters={this.onChangeFilters}
                />
        </div>
              </div>
            </div>
          </div>
          <div className="col-8">
          <MoviesList 
          onChangePage={this.onChangePage}
          filters={filters}
          pagination={pagination}
           />
          </div>
        </div>
      </div>
    );
  }
}