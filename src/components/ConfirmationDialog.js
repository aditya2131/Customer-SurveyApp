// src/components/ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({ onSubmit }) => {
  return (
    <div className="confirmation-dialog">
      <h3>Are you sure you want to submit your answers?</h3>
      <button onClick={onSubmit}>Yes, Submit</button>
    </div>
  );
};

export default ConfirmationDialog;
