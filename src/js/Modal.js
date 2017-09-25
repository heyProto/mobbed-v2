import React from 'react';

class Modal extends React.Component {
  render() {
    return(
      <div id="proto-modal" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content"> 
          <div className="modal-body">
            <div id="proto-embed-card"></div>
          </div>
        </div>
        <div className="modal-close" role="close">&times;</div>
      </div>
    </div>
    )
  }
}

export default Modal;