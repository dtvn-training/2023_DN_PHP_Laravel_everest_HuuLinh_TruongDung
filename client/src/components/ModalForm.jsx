import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/ModalForm.scss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const initFormData = {
  start_date: new Date().toISOString().substring(0, 16),
  end_date: new Date().toISOString().substring(0, 16),
};

const ModalForm = ({
  title,
  visible,
  setVisible,
  customFunction,
  formField,
  defaultFormValue,
}) => {
  const [formData, setFormData] = useState(defaultFormValue || initFormData);
  const [error, setError] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (visible) {
      formRef.current.reset();
      setFormData(defaultFormValue || initFormData);
    }
  }, [defaultFormValue, visible]);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    try {
      await customFunction(formData);
      handleCloseForm();
    } catch (error) {
      if (error.response?.status) {
        let errors = error.response.data;
        let firstKey = Object.keys(errors)[0];
        let firstError = errors[firstKey][0];
        setError(firstError);
      } else {
        setError(error.message);
      }
    }
  };

  const handleCloseForm = () => {
    setVisible(false);
    setFormData(initFormData);
    formRef.current.reset();
    setError(null);
  };

  return (
    <div className="form-model">
      <Rodal visible={visible} onClose={handleCloseForm}>
        <div className="modal-container">
          <h2>{title}</h2>
          <form onSubmit={handleFormSubmit} ref={formRef}>
            {formField.map((d, i) => {
              let sectionItem;
              if (d.type === "time_range") {
                sectionItem = (
                  <div className="section-item" key={i}>
                    <div className="section-header">{d.section_title}</div>
                    <div className="input-field">
                      <label className="form-label">
                        {d.section_title + ":"}
                      </label>
                      <div className="datetime-field">
                        {d.contents.map((content, i) => {
                          return (
                            <div className="datetime-item" key={i}>
                              <label htmlFor="">{content.label}</label>
                              <input
                                type={content.type}
                                name={content.name}
                                required
                                value={
                                  formData?.[content.name] ?? content.default
                                }
                                onChange={handleFieldChange}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              } else {
                sectionItem = (
                  <div className="section-item" key={i}>
                    <div className="section-header">{d.section_title}</div>
                    {d.contents.map((content, index) => {
                      let inputField;
                      if (content.type === "select") {
                        inputField = (
                          <select
                            onChange={handleFieldChange}
                            name={content.name}
                            required
                            value={formData?.[content.name] ?? content.default}
                          >
                            {content.options.map((option) => (
                              <option key={option.label} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        );
                      } else if (content.type === "image") {
                        inputField = (
                          <div className="img-container">
                            <input
                              type="file"
                              id={content.name}
                              name={content.name}
                              accept=".jpg,.png"
                              onChange={handleFileChange}
                            />
                            <img
                              src={
                                formData?.[content.name]
                                  ? URL.createObjectURL(formData[content.name])
                                  : content.default
                              }
                            />
                          </div>
                        );
                      } else {
                        inputField = (
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
                        );
                      }
                      return (
                        <div className="input-field" key={index}>
                          <label className="form-label">
                            {content.label + ":"}
                          </label>
                          {inputField}
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return sectionItem;
            })}

            {error && <p className="error-message">{error}</p>}
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

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  customFunction: PropTypes.func.isRequired,
  formField: PropTypes.array.isRequired,
  defaultFormValue: PropTypes.object,
};

export default ModalForm;
