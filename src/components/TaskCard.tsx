import { Card, CardContent, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ item, index }) => {
    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.title}
                            </Typography>

                            <Typography variant="body2" className="truncate-text">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
