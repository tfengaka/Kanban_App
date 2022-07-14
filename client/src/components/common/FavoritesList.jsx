import { Box, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import boardApi from '../../api/boardApi';
import { setFavorites } from '../../redux/features/favoriteSlice';

function FavoritesList() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorites = useSelector((state) => state.favorites.data);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    (async function getFavoriteBoards() {
      try {
        const res = await boardApi.getFavoriteBoards();
        dispatch(setFavorites(res));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const index = favorites.findIndex((e) => e.id === id);
    setActiveIndex(index);
  }, [favorites, id]);

  const onDragEnd = async ({ source, destination }) => {
    const cloneFavorites = [...favorites];
    const [removed] = cloneFavorites.splice(source.index, 1);
    cloneFavorites.splice(destination.index, 0, removed);
    const activeIndex = cloneFavorites.findIndex((e) => e.id === id);
    setActiveIndex(activeIndex);
    dispatch(setFavorites(cloneFavorites));
    try {
      await boardApi.updateFavoritePosition({ boards: cloneFavorites });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'list-board-drop'} droppableId={'list-board-drop'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {favorites.length > 0 &&
                favorites.map((board, index) => (
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
    </>
  );
}

export default FavoritesList;
