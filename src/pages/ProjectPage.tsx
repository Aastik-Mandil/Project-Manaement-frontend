import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import {
  Button,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Heading from "../components/Heading.tsx";

const ProjectPage = () => {
  const initialProject = {
    name: "",
    description: "",
    status: "To-Do",
  };
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(initialProject);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`http://localhost:5000/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data?.data || []);
        setProject(initialProject);
      })
      .catch((err) => {
        setProject(initialProject);
      });
  };

  const createProject = () => {
    fetch(`http://localhost:5000/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(prev => [...prev, data.data])
        setOpen(false)
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Heading
        title={`Projects (${projects?.length || 0})`}
        onCreate={() => setOpen(true)}
      />

      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => {}}>
        <DialogTitle
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>New Project</Typography>

          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          style={{
            paddingTop: 6,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <TextField
            fullWidth
            required
            label="Name"
            value={project.name}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <TextField
            fullWidth
            required
            label="Description"
            value={project.description}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={createProject} variant="contained" disabled={project?.name?.length === 0 || project?.description?.length === 0}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{ flexGrow: 1 }}
        style={{
          padding: 10,
          background: "#d7dce8",
          height: "calc(100vh - 50px)",
          overflow: "overlay",
        }}
      >
        <Grid container spacing={2}>
          {projects?.map((project, index) => (
            <Grid key={index} size={{ xs: 6, md: 4, lg: 3, xl: 2 }}>
              <ProjectCard
                id={project?._id}
                name={project?.name}
                description={project?.description}
                createdAt={project?.createdAt}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ProjectPage;
