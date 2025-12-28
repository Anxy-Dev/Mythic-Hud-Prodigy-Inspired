import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const DragOverlay = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 9998,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(2px)',
}));

const DragContainer = styled(Box)(() => ({
  backgroundColor: 'rgba(20, 20, 20, 0.95)',
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #92db24',
  boxShadow: '0 0 20px rgba(146, 219, 36, 0.5)',
  textAlign: 'center',
  zIndex: 9999,
  maxWidth: '400px',
}));

const InstructionText = styled(Typography)(() => ({
  color: '#92db24',
  marginBottom: '20px',
  fontSize: '14px',
  fontWeight: 500,
}));

const ButtonGroup = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  marginTop: '20px',
}));

const DragButton = styled(Button)(() => ({
  backgroundColor: '#92db24',
  color: '#000',
  fontWeight: 700,
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: '#7ac20a',
  },
}));

const CancelButton = styled(Button)(() => ({
  backgroundColor: 'rgba(255, 50, 50, 0.8)',
  color: '#fff',
  fontWeight: 700,
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: 'rgba(255, 30, 30, 0.9)',
  },
}));

const DragMenu = ({ isDragMode, setIsDragMode }) => {
  const dispatch = useDispatch();
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleStartDrag = () => {
    setIsDragging(true);
    window.postMessage({ type: 'START_DRAG_SPEEDOMETER' }, '*');
  };

  const handleSave = () => {
    window.postMessage({ type: 'SAVE_SPEEDOMETER_POSITION' }, '*');
    setIsDragMode(false);
  };

  const handleCancel = () => {
    window.postMessage({ type: 'CANCEL_DRAG_SPEEDOMETER' }, '*');
    setIsDragMode(false);
  };

  if (!isDragMode) return null;

  return (
    <DragOverlay>
      <DragContainer>
        <Typography
          sx={{
            color: '#92db24',
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          HUD Customization
        </Typography>
        <InstructionText>
          Click "Start Drag" to move the speedometer. Use mouse to drag. Press ENTER to save or ESC to cancel.
        </InstructionText>
        <ButtonGroup>
          <DragButton onClick={handleStartDrag}>Start Drag</DragButton>
          <DragButton onClick={handleSave}>Save (Enter)</DragButton>
          <CancelButton onClick={handleCancel}>Cancel (ESC)</CancelButton>
        </ButtonGroup>
      </DragContainer>
    </DragOverlay>
  );
};

export default DragMenu;
