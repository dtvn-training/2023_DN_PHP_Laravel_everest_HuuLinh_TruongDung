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
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
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
    setFormData(defaultFormValue || {});
    formRef.current.reset();
  };
  
  return (
    <div className="form-model">
      <Rodal visible={visible} onClose={handleCloseForm}>
        <div className="modal-container">
          <h2>{title}</h2>
          <form onSubmit={handleFormSubmit} ref={formRef}>
            {formField.map((d, i) => {
              return d.type === "time_range" ? (
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
                              value={
                                formData && formData[content.name] !== undefined
                                  ? formData[content.name]
                                  : content.default
                              }
                              onChange={handleFieldChange}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
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
                                  ? formData[content.name]
                                  : content.default
                              }
                            />
                            <label htmlFor={content.name}>Upload image</label>
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
