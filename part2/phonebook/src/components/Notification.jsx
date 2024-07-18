const Notification = ({ message, hasError }) => {
    if (message === null) {
        return null;
    }
    const className = hasError ? "error" : "success";
    console.log("Notification.jsx:", message, hasError);
    return <div className={className}>{message}</div>;
};

export default Notification;
