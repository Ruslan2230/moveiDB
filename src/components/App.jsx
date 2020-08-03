import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import CallApi from "../api/api";

const cookies = new Cookies();

export const AppContext = React.createContext();
export const UserContext = React.createContext();
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
      },
        
    };
    this.state = { ...this.initialState };
  }

  handleLogOut = () => {
    const { session_id } = this.props;
    CallApi.delete("/authentication/session", {
      body: {
        session_id
      }
    }).then(() => {
      this.props.onLogOut();
    });
  };

  getFavoriteList = (user) => {
    const { session_id} = this.state;
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let favorite_movies = data.results;
      this.updateFavoriteList(favorite_movies);
    });
  };

  updateFavoriteList = () => {

  }

  updateWatchList = () => {
    
  }

  updateAuth = (user,session_id) => {
    this.setState({
      user,
      session_id
    })
  }

  getWatchList = () => {
    const { session_id, user } = this.props;
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let watchlist = data.results;
      this.updateWatchList(watchlist);
    });
  };

  getUser = session_id => {
    return CallApi.get("/account", {
      params: {
        session_id
      }
    });
  };

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

  onLogOut = () => {
    cookies.remove("session_id")
    this.setState({
      session_id: null,
      user: null
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

  // componentDidMount() {
  //   const session_id = cookies.get("session_id");
  //   if (session_id) {
  //     fetchApi(
  //       `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
  //     ).then(user => {
  //       this.updateUser(user);
  //       this.updateSessionId(session_id);
  //     });
  //   }
  // }
  componentDidMount() {
    const { session_id } = this.state;
    if (session_id) {
      this.getUser(session_id).then(user => {
        this.updateUser(user)
        this.getFavoriteList(user);
        this.getWatchList();
      });
    }
  }

  onReset = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { filters, pagination, total_pages, user, session_id, watchlist, updateAuth, favorite_movies,showModal, toggleModal} = this.state;
    return (
      
      <AppContext.Provider
            value={{
              user,
              updateAuth,
              session_id,
              updateUser: this.updateUser,
              updateSessionId: this.updateSessionId,
              onLogOut: this.onLogOut,
              getUser: this.getUser,
              favorite_movies,
              getFavoriteList: this.getFavoriteList,
              watchlist,
              getWatchList: this.getWatchList,
              toggleModal,
              showModal
            }}
          >
      <div>
         <Header 
         user={user} 
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
       </AppContext.Provider>
       
    );
  }
}