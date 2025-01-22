/* eslint-disable react/prop-types */
import Details from "./Details";
const PersonList = ({ persons, handleDelete }) => {
    return (
        <ul>
            {persons.map((p) => (
                <Details
                    key={p.id}
                    person={p}
                    handleDelete={handleDelete(p.id)}
                />
            ))}
        </ul>
    );
};

export default PersonList;
