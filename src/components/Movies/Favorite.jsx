import React from "react";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import UserContextHOC from "../HOC/UserContextHOC";
import AppContextHOC from "../HOC/AppContextHOC";

class Favorite extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isOn: false
    };
  }

  markAsFavorite = () => {
    const {
      user,
      session_id,
      movieId,
      favorite_movies,
      getFavoriteList,
      toggleModal
    } = this.props;
    if (session_id) {
      this.setState(
        {
          isOn: true
        },
        () => {
          CallApi.post(`/account/${user.id}/favorite`, {
            params: {
              session_id
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              favorite: !this.getCurrentFavorite(favorite_movies, movieId)
            }
          }).then(() => {
            getFavoriteList().then(() => {
              this.setState({
                isOn: false
              });
            });
          });
        }
      );
    } else {
      toggleModal();
    }
  };

  getCurrentFavorite = (favorite_movies, movieId) =>
    favorite_movies.some(item => item.id === movieId);

  render() {
    const { isOn} = this.state;
    const { favorite_movies, movieId } = this.props;
    const isFavorite = this.getCurrentFavorite(favorite_movies, movieId);
    //console.log(isFavorite);
    return (
      <div
        className="d-inline-flex mark-favorite"
        onClick={this.markAsFavorite}
        style={{ pointerEvents: isOn ? "none" : "auto" }}
      >
        {isFavorite ? <Star /> : <StarBorder />}
      </div>
    );
  }
}

export default UserContextHOC(AppContextHOC(Favorite));


