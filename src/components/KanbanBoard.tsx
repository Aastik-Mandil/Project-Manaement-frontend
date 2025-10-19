import { Typography, Divider } from "@mui/material";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard.tsx";

const KanbanBoard = ({ tasks, setTasks, fetchTasks }) => {
  const onDragEnd = (result, tasks, setTasks) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = tasks[source.droppableId];
      const destColumn = tasks[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      updateTask(removed,destColumn)
      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = tasks[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const updateTask = (task, destColumn) => {
    fetch(`http://localhost:5000/tasks/${task?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...task, status: destColumn?.title}),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchTasks();
      })
      .catch((err) => {});
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, tasks, setTasks);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            padding: 8,
            display: "flex",
            width: "100%",
            gap: 8,
          }}
        >
          {Object?.entries(tasks)?.map(([columnId, column], index) => {
            return (
              <Droppable key={index} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "#d7dce8",
                      width: "calc(100vw/3)",
                      borderRadius: "5px",
                      padding: "15px 15px",
                      height: "calc(100vh - 66px)",
                      overflow: "overlay",
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Typography variant="h5" component="div">
                      {column.title}
                    </Typography>

                    <Divider style={{ marginBottom: 8 }} />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <TaskCard key={index} item={item} index={index} />
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
