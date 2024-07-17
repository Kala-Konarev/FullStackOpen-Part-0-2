/* eslint-disable react/prop-types */
const Form = ({
    handleSubmit,
    handleNameChange,
    handleNumChange,
    newName,
    newNum,
}) => (
    <>
        <form onSubmit={handleSubmit}>
            <div>
                name:{" "}
                <input required onChange={handleNameChange} value={newName} />
            </div>
            <div>
                number:{" "}
                <input required onChange={handleNumChange} value={newNum} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>
);
export default Form;
