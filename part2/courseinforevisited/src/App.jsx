/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Course from "./components/Course";

const App = () => {
    const courses = [
        {
            id: 1,
            name: "Half Stack application development",
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "New one",
                    exercises: 3,
                    id: 4,
                },
            ],
        },
        {
            id: 2,
            name: "New course",
            parts: [
                {
                    name: "Fundamentals",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Data",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <>
            {courses.map((c) => (
                <Course course={c} key={c.id} />
            ))}
        </>
    );
};

export default App;
