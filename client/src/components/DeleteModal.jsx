import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/DeleteModal.scss";

const DeleteModal = ({
  title,
  message,
  visible,
  setVisible,
  customFunction,
}) => {
  return (
    <Rodal visible={visible} onClose={() => setVisible(false)}>
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="delete-control-bar">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={customFunction}>
            Delete
          </button>
        </div>
      </div>
    </Rodal>
  );
};

export default DeleteModal;
