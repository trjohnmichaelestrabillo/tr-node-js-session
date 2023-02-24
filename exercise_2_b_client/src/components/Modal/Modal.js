import './modal.css'
const Modal = ({ onClose, parentClass, childClass, modalBody }) => {
    return ( 
        <div className={`modal-bg ${parentClass}`}>
            <div className={`modal-container ${childClass}`}>
                <div className="modal-info">
                    { modalBody }
                </div>
                <hr />
                <div className="btn-container">
                    <button onClick={onClose} className="danger">Close Modal</button>
                    {/* <button>Edit</button> */}
                    {/* <button>Delete</button> */}
                </div>
            </div>
        </div>
     );
}
export default Modal;