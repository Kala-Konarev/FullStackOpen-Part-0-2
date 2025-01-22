/* eslint-disable react/prop-types */
const Notification = ({ message, isError }) => {
    if (message === null) {
        return null;
    }

    const errorStyle = { color: "red", borderColor: "red" };
    return (
        <div className="notif" style={isError ? errorStyle : null}>
            {message}
        </div>
    );
};
export default Notification;
