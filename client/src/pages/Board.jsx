import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { StarOutlineOutlined, StarBorderOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import boardApi from '../api/boardApi';
import EmojiPicker from '../components/common/EmojiPicker';
import { useSelector, useDispatch } from 'react-redux';
import { setBoards } from '../redux/features/boardSlice';

let timer;
const timeOut = 500;

function Board() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.board.data);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    (async function getBoardDetail() {
      try {
        const res = await boardApi.getBoardDetail(id);
        // console.log(res);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavorite(res.isFavorite);
        setIcon(res.icon);
      } catch (error) {
        alert(error);
      }
    })();
  }, [id]);

  const onIconChange = async (emoji) => {
    const cloneBoard = [...boards];
    const index = cloneBoard.findIndex((e) => e.id === id);
    cloneBoard[index] = { ...cloneBoard[index], icon: emoji };
    setIcon(emoji);
    dispatch(setBoards(cloneBoard));

    try {
      await boardApi.updateBoardData(id, { icon: emoji });
    } catch (err) {
      console.log(err);
      alert(err);
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

    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoardData(id, { title: newTitle });
      } catch (err) {
        console.log(err);
        alert(err);
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
        console.log(err);
        alert(err);
      }
    }, timeOut);
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
        <IconButton variant="outlined">
          {isFavorite ? <StarOutlineOutlined color="warning" /> : <StarBorderOutlined />}
        </IconButton>
        <IconButton variant="outlined" color="error">
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
