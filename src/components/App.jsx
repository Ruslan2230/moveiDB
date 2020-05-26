import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import {API_URL, API_KEY_3, fetchApi} from "../api/api"

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
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

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  onChangeFilters = event => {
    const {value, name} = event.target;
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

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  onReset = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { filters, pagination, total_pages, user } = this.state;
    return (
      <div>
         <Header 
         user={user} 
         updateUser={this.updateUser}
         updateSessionId={this.updateSessionId}
          />
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  total_pages={total_pages}
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
      </div>
    );
  }
}