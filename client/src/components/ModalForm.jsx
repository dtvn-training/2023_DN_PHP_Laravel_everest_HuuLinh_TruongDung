import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/ModalForm.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ModalForm = ({
  title,
  visible,
  setVisible,
  customFunction,
  formField,
  defaultFormValue,
}) => {
  const [formData, setFormData] = useState(defaultFormValue || {});
  const formRef = useRef();

  useEffect(() => {
    setFormData(defaultFormValue);
  }, [defaultFormValue]);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFunction(formData);
      setFormData(defaultFormValue || {});
      formRef.current.reset();
      setVisible(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <div className="form-model">
      <Rodal visible={visible} onClose={() => setVisible(false)}>
        <div className="modal-container">
          <h2>{title}</h2>
          <form onSubmit={handleFormSubmit} ref={formRef}>
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
                            defaultValue={
                              content.default ? content.default : ""
                            }
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
                            defaultValue={
                              content.default ? content.default : ""
                            }
                            autoComplete="on"
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
    </div>
  );
};

export default ModalForm;
