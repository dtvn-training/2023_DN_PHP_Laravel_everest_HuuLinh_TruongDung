import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../assets/scss/components/ModalForm.scss";

const fakeData = [
  {
    section_title: "Details",
    contents: [
      { label: "Email", type: "text", placeholder: "example@gmail.com" },
      { label: "First name", type: "text", placeholder: "first name" },
      { label: "Last name", type: "text", placeholder: "last name" },
      {
        label: "Role",
        type: "select",
        options: [
          { label: "DAC", value: "DAC" },
          { label: "advertiser", value: "advertiser" },
        ],
      },
      { label: "Address", type: "text", placeholder: "your address" },
      { label: "Phone", type: "tel", placeholder: "0999999999" },
      { label: "Password", type: "password", placeholder: "*******" },
      { label: "Confirm password", type: "password", placeholder: "*******" },
    ],
  },
];

const ModalForm = ({
  title,
  visible,
  setVisible,
  customFunction,
  formContent,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    customFunction();
  };

  return (
    <Rodal visible={visible} onClose={() => setVisible(false)}>
      <div className="modal-container">
        <h2>{title}</h2>
        <form onSubmit={handleFormSubmit}>
          {fakeData.map((d, i) => {
            return (
              <div className="section-item" key={i}>
                <div className="section-header">{d.section_title}</div>
                {d.contents.map((content, index) => {
                  return (
                    <div className="input-field" key={index}>
                      <label>{content.label + ":"}</label>
                      {content.type === "select" ? (
                        <select>
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
