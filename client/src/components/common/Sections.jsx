import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, Card, Divider, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import sectionApi from '../../api/sectionApi';
import taskApi from '../../api/taskApi';
import TaskModal from './TaskModal';

let timer;
const timeOut = 500;

function Sections(props) {
  const { boardID, data } = props;
  const [sections, setSections] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    setSections(data);
  }, [data]);

  const createNewSection = async () => {
    try {
      const section = await sectionApi.createSection(boardID);
      setSections([...sections, section]);
    } catch (error) {
      alert('Have some error!');
      console.error(error);
    }
  };

  const deleteSection = async (sectionID) => {
    try {
      await sectionApi.deleteSection(boardID, sectionID);
      const filterSections = [...sections].filter((e) => e.id !== sectionID);
      setSections(filterSections);
    } catch (error) {
      alert('Have some error!');
      console.error(error);
    }
  };

  const updateSectionTitle = (e, sectionID) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const cloneSection = [...sections];
    const index = cloneSection.findIndex((e) => e.id === sectionID);
    cloneSection[index].title = newTitle;
    setSections(cloneSection);
    timer = setTimeout(async () => {
      try {
        await sectionApi.updateSelection(boardID, sectionID, { title: newTitle });
      } catch (err) {
        alert('Have some errorrs!');
        console.error(err);
      }
    }, timeOut);
  };

  const createTask = async (sectionID) => {
    try {
      const task = await taskApi.createTask(boardID, { sectionID });
      const newSections = [...sections];
      const index = newSections.findIndex((e) => e.id === sectionID);
      newSections[index].tasks.unshift(task);
      setSections(newSections);
    } catch (err) {
      alert('Have some errors!');
      console.error(err);
    }
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = sections.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = sections.findIndex((e) => e.id === destination.droppableId);
    const sourceCol = sections[sourceColIndex];
    const destinationCol = sections[destinationColIndex];

    const sourceSectionID = sourceCol.id;
    const destinationID = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      sections[sourceColIndex].tasks = sourceTasks;
      sections[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      sections[destinationColIndex].tasks = sourceTasks;
    }

    try {
      await taskApi.updatePosition(boardID, {
        sourceList: sourceTasks,
        destinationList: destinationTasks,
        sourceSectionID,
        destinationID,
      });
      setSections(sections);
    } catch (err) {
      alert('Have some errors!');
      console.error(err);
    }
  };

  const onDeleteTask = () => {};

  const onUpdateTask = () => {};

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          onClick={createNewSection}
        >
          <AddOutlined fontSize="small" />
          Add Section
        </Button>
        <Typography variant="body2" fontWeight="700">
          {sections.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '1500px',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {sections.map((section) => (
            <div key={section.id} style={{ width: '300px' }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: '300px',
                      padding: '8px',
                      marginRight: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <TextField
                        value={section.title}
                        onChange={(e) => updateSectionTitle(e, section.id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          '& .MuiOutlinedInput-input': { padding: '8px' },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                          '& .MuiOutlinedInput-root': { fontSize: '16px', fontWeight: '500' },
                        }}
                      />
                      <IconButton
                        variant="outlined"
                        sx={{
                          color: 'gray',
                          '&:hover': { color: '#11998e' },
                        }}
                        onClick={() => createTask(section.id)}
                      >
                        <AddOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        sx={{
                          color: 'gray',
                          '&:hover': { color: '#ED213A' },
                        }}
                        onClick={() => deleteSection(section.id)}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Box>
                    {/* Task */}
                    {section.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: '8px',
                              marginBottom: '8px',
                              cursor: snapshot.isDragging ? 'grab' : 'pointer!important',
                            }}
                            onClick={() => setSelectedTask(task)}
                          >
                            <Typography>{task.title === '' ? 'Untitled' : task.title}</Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <TaskModal
        taskData={selectedTask}
        boardID={boardID}
        onClose={() => setSelectedTask(undefined)}
        onDelete={onDeleteTask}
        onUpdate={onUpdateTask}
      />
    </>
  );
}

export default Sections;
