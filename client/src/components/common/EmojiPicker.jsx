import { Box, Typography } from '@mui/material';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useEffect } from 'react';

function EmojiPicker(props) {
  const [selectedEmoji, setSelectedEmoji] = React.useState();
  const [isShowPicker, setIsShowPicker] = React.useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e) => {
    const symbol = e.unified.split('-');
    let codesArray = [];
    symbol.forEach((ele) => codesArray.push('0x' + ele));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'max-content',
      }}
    >
      <Typography variant="h5" fontWeight="600" sx={{ cursor: 'pointer' }} onClick={showPicker}>
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          zIndex: 9999,
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
}

export default EmojiPicker;
