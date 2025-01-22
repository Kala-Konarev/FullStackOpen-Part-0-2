/* eslint-disable react/prop-types */
const Details = ({ person, handleDelete }) => {
    return (
        <li key={person.name}>
            {person.name} {person.number}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default Details;
