/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
    const sum = parts.reduce((s, p) => s + p.exercises, 0);
    return <p>total of {sum} exercises</p>;
};
const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part key={part.id} part={part} />
        ))}
    </>
);

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

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
