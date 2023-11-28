import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/ModalForm.scss";
import { useEffect, useState } from "react";

const ModalForm = ({
  title,
  visible,
  setVisible,
  customFunction,
  formField,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = {};
    formField.forEach((section) => {
      section.contents.forEach((content) => {
        if (content.default) {
          initialData[content.name] = content.default;
        }
      });
    });
    setFormData(initialData);
  }, [formField]);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    customFunction(formData);
  };

  return (
    <Rodal visible={visible} onClose={() => setVisible(false)}>
      <div className="modal-container">
        <h2>{title}</h2>
        <form onSubmit={handleFormSubmit}>
          {formField.map((d, i) => {
            return (
              <div className="section-item" key={i}>
                <div className="section-header">{d.section_title}</div>
                {d.contents.map((content, index) => {
                  return (
                    <div className="input-field" key={index}>
                      <label>{content.label + ":"}</label>
                      {content.type === "select" ? (
                        <select
                          onChange={handleFieldChange}
                          name={content.name}
                          required
                          value={content.default ? content.default : ""}
                        >
                          {content.options.map((option, i) => (
                            <option key={i} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={content.type}
                          placeholder={content.placeholder}
                          onChange={handleFieldChange}
                          name={content.name}
                          required
                          value={content.default ? content.default : ""}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="modal-control-bar">
            <button type="button" onClick={() => setVisible(false)}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </Rodal>
  );
};

export default ModalForm;
