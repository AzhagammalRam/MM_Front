import React from 'react';

interface ModalProps {
  show: boolean;
  title: string;
  body: string;
  onClose: () => void;
  onSave: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ show, title, body, onClose, onSave }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1} role="dialog" style={{ backgroundColor: show ? 'rgba(0, 0, 0, 0.5)' : '' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
