import { Delete } from '@mui/icons-material';
import { Backdrop, Box, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '80%',
};

let timer;
const timeout = 500;
let isModalClosed = false;

function TaskModal(props) {
  const { boardID, taskData } = props;
  const [task, setTask] = useState(taskData);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTask(taskData);
    setTitle(taskData !== undefined ? taskData.title : '');
    setContent(taskData !== undefined ? taskData.content : '');
  }, [taskData]);

  const onClose = () => {
    props.onUpdate();
    props.onClose();
  };

  return (
    <Modal
      open={task !== undefined}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      onClose={onClose}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <IconButton
              variant="contained"
              color="error"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Delete />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '0 0 16px',
            }}
          >
            <TextField
              value={title}
              // onChange={}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              multiline
              sx={{
                width: '100%',
                marginBottom: '8px',
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                '& .MuiOutlinedInput-root': { fontSize: '25px', fontWeight: '700' },
              }}
            />
            <Box
              sx={{
                padding: '0 16px',
              }}
            >
              <Typography variant="body2" fontWeight="600" color="gray">
                Date: {task !== undefined ? moment(task.createAt).format('DD/MM/YYYY') : ''}
              </Typography>
            </Box>
            <Divider sx={{ margin: '10px 12px' }} />
            <Box
              sx={{
                padding: '8px 16px',
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              <CKEditor editor={ClassicEditor} data={content} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default TaskModal;
