import React from "react";
import CallApi from "../../api/api";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";

class WillWatch extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isOn: false
    };
  }

  addToWatchList = () => {
    const {
      user,
      session_id,
      movieId,
      watchlist,
      getWatchList,
      showModal
    } = this.props;
    if (session_id) {
      this.setState(
        {
          isOn: true
        },
        () => {
          CallApi.post(`/account/${user.id}/watchlist`, {
            params: {
              session_id
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              watchlist: !this.getCurrentWatchList(watchlist, movieId)
            }
          }).then(() => {
            getWatchList().then(() => {
              this.setState({
                isOn: false
              });
            });
          });
        }
      );
    } else {
      showModal();
    }
  };

  getCurrentWatchList = (watchlist, movieId) =>
    watchlist.some(item => item.id === movieId);

  render() {
    const { isOn } = this.state;
    const { watchlist, movieId } = this.props;
    const isWillWatch = this.getCurrentWatchList(watchlist, movieId);
    //console.log(isWillWatch);
    return (
      <div
        className="d-inline-flex mark-watch"
        onClick={this.addToWatchList}
        style={{ pointerEvents: isOn ? "none" : "auto" }}
      >
        {isWillWatch ? <Bookmark /> : <BookmarkBorder />}
      </div>
    );
  }
}
export default AppContextHOC(WillWatch);

