/* eslint-disable no-unused-vars */
const Course = ({ course }) => {
    const { id, name, parts } = course;
    return (
        <div>
            <h1>{name}</h1>
            <ul>
                {parts.map((part) => (
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                ))}
            </ul>
            <p>
                <strong>
                    total: {parts.reduce((a, b) => a + b.exercises, 0)}
                </strong>
            </p>
        </div>
    );
};

export default Course;
