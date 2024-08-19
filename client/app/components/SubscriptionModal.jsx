import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SubscriptionModal = ({ open, handleClose, handleGoPro }) => {

  const handleCloseClick = () => {
    const freeUseTime = new Date();
    freeUseTime.setHours(freeUseTime.getHours() + 4); // Set free use time 4 hours ahead
    localStorage.setItem('freeUseUntil', freeUseTime.toISOString());
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Upgrade to Pro
        </Typography>
        <Typography sx={{ mt: 2 }}>
          To continue using Flashmaster, please upgrade to Pro.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoPro}
          sx={{ mt: 3 }}
        >
          Go Pro
        </Button>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;