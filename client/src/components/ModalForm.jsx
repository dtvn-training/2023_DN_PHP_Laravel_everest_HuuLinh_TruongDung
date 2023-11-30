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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFunction(formData);
      handleCloseForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCloseForm = () => {
    setVisible(false);
    formRef.current.reset();
    setFormData(defaultFormValue || {});
  };
  
  return (
    <div className="form-model">
      <Rodal visible={visible} onClose={handleCloseForm}>
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
                        <label className="form-label">
                          {content.label + ":"}
                        </label>
                        {content.type === "select" ? (
                          <select
                            onChange={handleFieldChange}
                            name={content.name}
                            required
                            value={
                              formData && formData[content.name] !== undefined
                                ? formData[content.name]
                                : content.default
                            }
                          >
                            {content.options.map((option, i) => (
                              <option key={i} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : content.type === "image" ? (
                          <div className="img-container">
                            <input
                              type="file"
                              id={content.name}
                              name={content.name}
                              required
                              accept=".jpg,.png"
                              onChange={handleFileChange}
                            />
                            <img
                              src={
                                formData && formData[content.name] !== undefined
                                  ? URL.createObjectURL(formData[content.name])
                                  : content.default
                              }
                            />
                            <label htmlFor={content.name}>Upload image</label>
                          </div>
                        ) : content.type === "datetime-local" ? (
                          <div className="datetime-field">
                            <label htmlFor="">Start time:</label>
                            <input
                              type={content.type}
                              name="start_date"
                              onChange={handleFieldChange}
                            />
                            <label htmlFor="">End time:</label>
                            <input
                              type={content.type}
                              name="end_date"
                              onChange={handleFieldChange}
                            />
                          </div>
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
              <button type="button" onClick={handleCloseForm}>
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
