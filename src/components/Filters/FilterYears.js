import React from "react";
import PropTypes from "prop-types";

const getYears = () => 
    Array.from(new Array(50),(_,index) => new Date().getFullYear() - index);


export default class FilterYears extends React.Component {
    static propTypes = {
        release_years: PropTypes.string.isRequired,
        onChangeFilter: PropTypes.func.isRequired
      };
    static defaultProps = {
        years: getYears()
    };

    render() {
    const { onChangeFilters, release_years, years } = this.props;
    return (
        <div className="form-group">
                <select
                    id="release_years"
                    className="form-control"
                    name="release_years"
                    value={release_years}
                    onChange={onChangeFilters}
                >
                    <option key={0} value="">Выберети год</option>
                    {years.map((year,index) => 
                    <option key={index} value={year}>
                         {year}
                    </option>)}
                </select>
        </div>
    );
}
}

