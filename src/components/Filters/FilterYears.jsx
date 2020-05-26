import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";

const getYears = () => 
    Array.from(new Array(50),(_,index) => new Date().getFullYear() - index);


export default class FilterYears extends React.PureComponent {
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
        <UISelect
                    id="release_years"
                    labelText="Год релиза:"
                    name="release_years"
                    value={release_years}
                    onChange={onChangeFilters}
                >
                    <option key={0} value="">Выберети год</option>
                    {years.map(year => (
                    <option key={year} value={year}>
                         {year}
                    </option>))}
               </UISelect>
    );
}
}

