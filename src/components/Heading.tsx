import { Button } from "@mui/material";

const Heading = ({ title, onCreate, Icon }) => {
    return (
        <div
            style={{
                width: "100%",
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderBottom: "1px solid",
                position: "sticky",
                top: 0,
                background: "white",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                {Icon && Icon}

                <h3>{title}</h3>
            </div>

            <Button
                variant="outlined"
                style={{ textTransform: "capitalize" }}
                onClick={onCreate}
            >
                Create
            </Button>
        </div>
    );
};

export default Heading;
