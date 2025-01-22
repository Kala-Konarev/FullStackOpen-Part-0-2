/* eslint-disable react/prop-types */
const PersonForm = ({
    handleSubmit,
    name,
    handleNameChange,
    num,
    handleNumChange,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={num} onChange={handleNumChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
export default PersonForm;
