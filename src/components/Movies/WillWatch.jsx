import React from "react";
import PropTypes from "prop-types";
import CallApi from "../../api/api";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";

class WillWatch extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loading: false
    };
  }

  updateLoading = (state) => {
    this.setState({
      loading: state,
    });
  }

  static propType = {
    movieId: PropTypes.number.isRequired
  }

  addTowatchMovies = () => {
    const {
      user,
      session_id,
      movieId,
      watchMovies,
      getwatchMovies,
      showLoginModal
    } = this.props;

    if (!session_id) {
      showLoginModal();
      }
    this.updateLoading(true);  

      CallApi.post(`/account/${user.id}/watchMovies`, {
            params: {
              session_id
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              watchMovies: !this.getCurrentwatchMovies(watchMovies, movieId)
            }
          }).then(() => {
            getwatchMovies().then(() => {
              this.updateLoading(false);
            });
          });
  };

  getCurrentwatchMovies = (watchMovies, movieId) =>
    watchMovies.some(item => item.id === movieId);

  render() {
    const { loading } = this.state;
    const { watchMovies, movieId } = this.props;
    const isWillWatch = this.getCurrentwatchMovies(watchMovies, movieId);
    //console.log(isWillWatch);
    return (
      <div
        className="d-inline-flex mark-watch"
        onClick={this.addTowatchMovies}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        {isWillWatch ? <Bookmark /> : <BookmarkBorder />}
      </div>
    );
  }
}
export default AppContextHOC(WillWatch);

