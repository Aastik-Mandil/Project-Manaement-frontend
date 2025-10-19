import { Link } from "react-router";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

const ProjectCard = ({ id, name, description, createdAt }) => {
  return (
    <Card>
      <CardContent>
        <Link to={`/${id}`} style={{ textDecoration: "none", color: "black" }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </Link>

        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {createdAt}
        </Typography>

        <Typography variant="body2" className="truncate-text">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
