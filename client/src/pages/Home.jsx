import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
function Home() {
  const createBoard = () => {
    console.log('create board');
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
      <LoadingButton variant="outlined" color="success" onClick={createBoard}>
        Click To Create First Task
      </LoadingButton>
    </Box>
  );
}

export default Home;
