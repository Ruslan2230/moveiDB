import React from "react";
import PropTypes from "prop-types";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";

class Favorite extends React.PureComponent {
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

  onClickFavorite = () => {
    const {
      user,
      session_id,
      movieId,
      getFavoriteList,
      toggleLoginModal
    } = this.props;

    if (!session_id) {
      toggleLoginModal();
    }
    this.updateLoading(true);

        CallApi.post(`/account/${user.id}/favorite`, {
          params: {
            session_id
          },
          body: {
            media_type: "movie",
            media_id: movieId,
            favorite: !this.isFavorite()
          }
        })
        .then(getFavoriteList)
        .then(() => {
          this.updateLoading(false);
        });
  };

  isFavorite = () =>
    this.props.favoriteMovies.some(item => item.id === this.props.movieId);

  render() {
    const { loading } = this.state;
    return (
      <div
        className="d-inline-flex mark-favorite"
        onClick={this.onClickFavorite}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        {this.isFavorite() ? <Star /> : <StarBorder />}
      </div>
    );
  }
}

export default AppContextHOC(Favorite);


