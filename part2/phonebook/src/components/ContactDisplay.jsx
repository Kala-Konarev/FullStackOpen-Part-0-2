/* eslint-disable react/prop-types */
const Contact = ({ name, number }) => (
    <p>
        {name} {number}
    </p>
);

const ContactDisplay = ({ peopleToShow }) => {
    return (
        <div>
            {peopleToShow.map((p) => (
                <Contact name={p.name} number={p.number} key={p.name} />
            ))}
        </div>
    );
};

export default ContactDisplay;
