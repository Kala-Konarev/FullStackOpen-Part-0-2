const Footer = () => {
    const footerStyle = {
        color: "green",
        backgroundColor: "gray",
        fontStyle: "italic",
    };

    return (
        <div style={footerStyle}>
            <br />
            <em>
                Note app, Department of Computer Science, University of Helsinki
                2024
            </em>
        </div>
    );
};

export default Footer;
