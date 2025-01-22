/* eslint-disable react/prop-types */
const FilterBar = ({ handleChange, filter }) => {
    return (
        <p>
            filter shown by <input onChange={handleChange} value={filter} />
        </p>
    );
};
export default FilterBar;
