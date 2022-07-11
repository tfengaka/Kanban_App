import { AddOutlined, LogoutOutlined } from '@mui/icons-material';
import { Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import boardApi from '../../api/boardApi';
import assets from '../../assets';
import { setBoards } from '../../redux/features/boardSlice';

function Sidebar() {
  const sidebarWidth = 300;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user.data);
  const boards = useSelector((state) => state.board.data);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async function getBoards() {
      try {
        const res = await boardApi.getAllBoards();
        dispatch(setBoards(res));
      } catch (error) {
        alert(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === id);
    setActiveIndex(activeItem);
    if (boards.length > 0 && id === undefined) {
      navigate(`/boards/${boards[0].id}`);
    }
  }, [boards, id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const onDragEnd = async ({ source, destination }) => {
    const cloneBoards = [...boards];
    const [removed] = cloneBoards.splice(source.index, 1);
    cloneBoards.splice(destination.index, 0, removed);
    const activeBoard = cloneBoards.findIndex((e) => e.id === id);
    setActiveIndex(activeBoard);
    dispatch(setBoards(cloneBoards));
    try {
      await boardApi.updatePosition({ boards: cloneBoards });
    } catch (error) {
      alert(error);
    }
  };

  const createNewBoard = async () => {
    try {
      const res = await boardApi.createBoard();
      const newListBoards = [res, ...boards];
      dispatch(setBoards(newListBoards));
      navigate(`/boards/${res.id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        boxShadow: 8,
        width: sidebarWidth,
        height: '100vh',
      }}
    >
      <List
        disablePadding
        sx={{
          boxShadow: 3,
          width: sidebarWidth,
          height: '100%',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? assets.colors.secondary : '#eee'),
        }}
      >
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={16}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img src={assets.images.defaultAvatar} style={{ width: '25px', borderRadius: '50%' }} alt="" />
              {user.username}
            </Typography>
            <IconButton onClick={handleLogout}>
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={14}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Favorites
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={14}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Privates
            </Typography>
            <IconButton onClick={createNewBoard}>
              <AddOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-drop'} droppableId={'list-board-drop'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((board, index) => (
                  <Draggable key={board.id} draggableId={board.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${board.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging ? 'grab' : 'pointer !important',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="500"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                          }}
                        >
                          {board.icon} {board.title}
                        </Typography>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
}

export default Sidebar;
