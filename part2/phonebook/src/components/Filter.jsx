/* eslint-disable react/prop-types */
const Filter = ({ handleFilterChange, newFilter }) => {
    return (
        <div>
            filter shown with{" "}
            <input onChange={handleFilterChange} value={newFilter} />
        </div>
    );
};

export default Filter;
