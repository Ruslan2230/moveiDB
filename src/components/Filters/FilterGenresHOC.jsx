import React from "react";
import CallApi from "../../api/api";
import PropTypes from "prop-types";


export default Component =>
class FilterGenresHOC extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }
  static propTypes = {
    with_genres: PropTypes.array.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  componentDidMount() {
    CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        genres: data.genres
      });
    });
  }


  onChangeGenres = event => {
    const { with_genres } = this.props;
    const { checked, value } = event.target;
    
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: checked
          ? [...with_genres, value]
          : with_genres.filter(item => Number(item) !== Number(value))
      }
    });
    
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
    return (
      <Component
        genres={genres}
        with_genres={with_genres}
        onChangeGenres={this.onChangeGenres}
      />
    );
  }
};
