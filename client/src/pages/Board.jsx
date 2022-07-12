import { DeleteOutlineOutlined, StarBorderOutlined, StarOutlineOutlined } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import boardApi from '../api/boardApi';
import EmojiPicker from '../components/common/EmojiPicker';
import { setBoards } from '../redux/features/boardSlice';
import { setFavorites } from '../redux/features/favoriteSlice';

let timer;
const timeOut = 500;

function Board() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state) => state.board.data);
  const favorites = useSelector((state) => state.favorites.data);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    (async function getBoardDetail() {
      try {
        const res = await boardApi.getBoardDetail(id);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavorite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        console.error(err);
        alert('Have some error!');
      }
    })();
  }, [id]);

  const onIconChange = async (emoji) => {
    const cloneBoard = [...boards];
    const index = cloneBoard.findIndex((e) => e.id === id);
    cloneBoard[index] = { ...cloneBoard[index], icon: emoji };
    setIcon(emoji);
    dispatch(setBoards(cloneBoard));

    if (isFavorite) {
      const cloneFavorites = [...favorites];
      const favoriteIndex = cloneFavorites.findIndex((e) => e.id === id);
      cloneFavorites[favoriteIndex] = { ...cloneFavorites[favoriteIndex], icon: emoji };
      dispatch(setFavorites(cloneFavorites));
    }

    try {
      await boardApi.updateBoardData(id, { icon: emoji });
    } catch (err) {
      console.log(err);
      alert('Have some error!');
    }
  };

  const onUpdateTitle = (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    const cloneBoard = [...boards];
    const index = cloneBoard.findIndex((e) => e.id === id);
    cloneBoard[index] = { ...cloneBoard[index], title: newTitle };
    dispatch(setBoards(cloneBoard));

    if (isFavorite) {
      const cloneFavorites = [...favorites];
      const favoriteIndex = cloneFavorites.findIndex((e) => e.id === id);
      cloneFavorites[favoriteIndex] = { ...cloneFavorites[favoriteIndex], title: newTitle };
      dispatch(setFavorites(cloneFavorites));
    }

    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoardData(id, { title: newTitle });
      } catch (err) {
        console.error(err);
        alert('Have some error!');
      }
    }, timeOut);
  };

  const onUpdateDescription = (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoardData(id, { description: newDescription });
      } catch (err) {
        console.error(err);
        alert('Have some error!');
      }
    }, timeOut);
  };

  const addFavorite = async () => {
    try {
      const board = await boardApi.updateBoardData(id, { favourite: !isFavorite });
      let cloneFavorites = [...favorites];
      if (isFavorite) {
        cloneFavorites = cloneFavorites.filter((e) => e.id !== id);
      } else {
        cloneFavorites.unshift(board);
      }
      dispatch(setFavorites(cloneFavorites));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
      alert('Have some error!');
    }
  };

  const onDeletedBoard = async () => {
    try {
      await boardApi.deleteBoard(id);
      if (isFavorite) {
        const newFavorites = favorites.filter((e) => e.id !== id);
        dispatch(setFavorites(newFavorites));
      }
      const newBoards = boards.filter((e) => e.id !== id);
      if (newBoards.length === 0) {
        navigate('/boards');
      } else {
        navigate(`/boards/${newBoards[0].id}`);
      }
      dispatch(setBoards(newBoards));
    } catch (err) {
      console.error(err);
      alert('Have some error!');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <IconButton variant="outlined" onClick={addFavorite}>
          {isFavorite ? <StarOutlineOutlined color="warning" /> : <StarBorderOutlined />}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={onDeletedBoard}>
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: '10px 50px',
        }}
      >
        <Box>
          {/* Emoji Picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={onUpdateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: '0 8px' },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
            }}
          />
          <TextField
            value={description}
            onChange={onUpdateDescription}
            placeholder="Add a description"
            variant="outlined"
            fullWidth
            multiline
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '14px', fontWeight: '500' },
            }}
          />
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button>Add Section</Button>
            <Typography variant="body2" fontWeight="700">
              {sections.length} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin: '10px 0' }} />
        </Box>
      </Box>
    </>
  );
}

export default Board;
