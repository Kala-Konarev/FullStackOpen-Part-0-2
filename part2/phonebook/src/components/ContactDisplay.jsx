/* eslint-disable react/prop-types */
import Button from "./Button";
const Contact = ({ name, number, deleteFunc }) => (
    <p>
        {name} {number} <Button onClick={deleteFunc} text="delete" />
    </p>
);

const ContactDisplay = ({ peopleToShow, deleteFunc }) => {
    return (
        <div>
            {peopleToShow.map((p) => (
                <Contact
                    name={p.name}
                    number={p.number}
                    key={p.name}
                    deleteFunc={() => deleteFunc(p.id)}
                />
            ))}
        </div>
    );
};

export default ContactDisplay;
