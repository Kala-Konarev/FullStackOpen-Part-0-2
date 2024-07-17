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

export default Course;
