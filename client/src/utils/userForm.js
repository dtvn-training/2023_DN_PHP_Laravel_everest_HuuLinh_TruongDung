let createUserFormField = [
  {
    section_title: "Details",
    contents: [
      {
        label: "Email",
        type: "email",
        placeholder: "example@gmail.com",
        name: "email",
      },
      {
        label: "First name",
        type: "text",
        placeholder: "first name",
        name: "first_name",
      },
      {
        label: "Last name",
        type: "text",
        placeholder: "last name",
        name: "last_name",
      },
      {
        label: "Role",
        type: "select",
        options: [
          { label: "--Select role--"},
          { label: "DAC", value: "1" },
          { label: "Advertiser", value: "2" },
          { label: "Admin", value: "3" },
        ],
        name: "role_id",
      },
      {
        label: "Address",
        type: "text",
        placeholder: "your address",
        name: "address",
      },
      { label: "Phone", type: "tel", placeholder: "0999999999", name: "phone" },
      {
        label: "Password",
        type: "password",
        placeholder: "*******",
        name: "password",
      },
      {
        label: "Confirm password",
        type: "password",
        placeholder: "*******",
        name: "confirm_password",
      },
    ],
  },
];

let editUserFormField = [
  {
    section_title: "Details",
    contents: [
      {
        label: "Email",
        type: "email",
        placeholder: "example@gmail.com",
        name: "email",
        default: "",
      },
      {
        label: "First name",
        type: "text",
        placeholder: "first name",
        name: "first_name",
        default: "",
      },
      {
        label: "Last name",
        type: "text",
        placeholder: "last name",
        name: "last_name",
        default: "",
      },
      {
        label: "Role",
        type: "select",
        options: [
          { label: "DAC", value: "1" },
          { label: "Advertiser", value: "2" },
          { label: "Admin", value: "3" },
        ],
        name: "role_id",
        default: "",
      },
      {
        label: "Address",
        type: "text",
        placeholder: "your address",
        name: "address",
        default: "",
      },
      {
        label: "Phone",
        type: "tel",
        placeholder: "0999999999",
        name: "phone",
        default: "",
      },
    ],
  },
];

export { createUserFormField, editUserFormField };
