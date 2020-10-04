import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import CallApi from "../api/api";
import LoginModal from "./Header/Login/LoginModal";

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      showLoginModal: false,
      watchMovies: [],
      favoriteMovies: [],
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

  getFavoriteList = ({user,session_id}) => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      this.setState({
        favoriteMovies: data.results,
      });
    });
  };


  updateAuth = (user,session_id) => {
    this.setState({
      user,
      session_id
    })
  }

  updatewatchMovies = (watchMovies) => {
    this.setState({
      watchMovies
    })
  }

  getwatchMovies = ({ user, session_id }) => {
    return CallApi.get(`/account/${user.id}/watchMovies/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let watchMovies = data.results;
      this.updatewatchMovies(watchMovies);
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

  componentDidMount() {
    const { session_id } = this.state;
    if (session_id) {
      this.getUser(session_id).then(user => {
        this.updateUser(user)
      });
    }
  }

componentDidUpdate(prevProps, prevState) {
  if(prevState.user === null && this.state.user !== null) {
    this.getFavoriteList({user: this.props.user, session_id: this.props.session_id});
    this.getwatchMovies({user: this.props.user, session_id: this.props.session_id});
  }
}

  onReset = () => {
    this.setState({ ...this.initialState });
  };

  toggleLoginModal = () => {
    this.setState(prevState => ({
   showLoginModal: !prevState.showLoginModal
  }));
}

  render() {
    const { filters, pagination, total_pages, user, session_id, watchMovies, updateAuth, favoriteMovies,showLoginModal} = this.state;
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
              favoriteMovies,
              getFavoriteList: this.getFavoriteList,
              watchMovies,
              getwatchMovies: this.getwatchMovies,
              showLoginModal,
              toggleLoginModal: this.toggleLoginModal,
            }}
          >
      <div>
        {this.state.showLoginModal ? <LoginModal /> : null }
      <Header user={user} updateSessionId={this.updateSessionId} />
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