import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/DeleteModal.scss";
import PropTypes from "prop-types";

const DeleteModal = ({
  title,
  message,
  visible,
  setVisible,
  customFunction,
}) => {
  return (
    <div className="delete-modal">
      <Rodal width={700} visible={visible} onClose={() => setVisible(false)}>
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
            <button
              type="button"
              className="delete-btn"
              onClick={customFunction}
            >
              Delete
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  customFunction: PropTypes.func.isRequired,
};

export default DeleteModal;
