import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import boardApi from '../api/boardApi';
import { setBoards } from '../redux/features/boardSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board.data);
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    setLoading(true);
    try {
      const res = await boardApi.createBoard();
      const newBoards = [res, ...boards];
      dispatch(setBoards(newBoards));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      console.error(err);
      alert('Have some error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant="outlined" color="success" onClick={createBoard} loading={loading}>
        Click To Create First Task
      </LoadingButton>
    </Box>
  );
}

export default Home;
