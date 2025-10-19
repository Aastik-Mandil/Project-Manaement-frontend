import { useState, useEffect } from "react";
import {
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useParams, Link } from "react-router";
import { ArrowBack, Close } from "@mui/icons-material";
import KanbanBoard from "../components/KanbanBoard.tsx";
import Heading from "../components/Heading.tsx";

const TaskPage = () => {
  const { projectId } = useParams();
  const initialTask = {
    title: "",
    description: "",
    status: "To-Do",
    projectId: projectId,
  };
  const initialTasks = {
    1: {
      title: "To-Do",
      items: [],
    },
    2: {
      title: "In Progress",
      items: [],
    },
    3: {
      title: "Done",
      items: [],
    },
  }
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(initialTask);
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`http://localhost:5000/tasks/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let tasksData = Object?.keys(tasks)?.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: {
              ...acc?.[curr],
              title: acc?.[curr]?.title,
              items: data?.data?.filter((d) => d?.status === acc?.[curr]?.title) || [],
            },
          }),
          initialTasks
        );
        setTasks(tasksData);
        setTask(initialTask);
      })
      .catch((err) => {
        setTask(initialTask);
      });
  };

  const createTask = () => {
    fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchTasks();
        setOpen(false)
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Heading
        title={`Task`}
        onCreate={() => setOpen(true)}
        Icon={
          <Link to="/">
            <IconButton aria-label="back">
              <ArrowBack />
            </IconButton>
          </Link>
        }
      />

      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => {}}>
        <DialogTitle
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>New Task</Typography>

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
            label="Title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <TextField
            fullWidth
            required
            label="Description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
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
          <Button onClick={createTask} variant="contained" disabled={task?.title?.length === 0 || task?.description?.length === 0}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <KanbanBoard tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default TaskPage;
