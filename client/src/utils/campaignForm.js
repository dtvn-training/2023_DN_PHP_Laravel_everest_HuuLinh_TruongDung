let createCampaignFormField = [
  {
    section_title: "Details",
    contents: [
      {
        label: "Name",
        type: "text",
        placeholder: "name",
        name: "name",
      },
      {
        label: "User status",
        type: "select",
        default: 1,
        options: [
          { label: "Active", value: "1" },
          { label: "Inactive", value: "0" },
        ],
        name: "status",
      },
    ],
  },
  {
    section_title: "Schedule",
    type: "time_range",
    contents: [
      {
        label: "Start time",
        type: "datetime-local",
        name: "start_date",
      },
      {
        label: "End time",
        type: "datetime-local",
        name: "end_date",
      },
    ],
  },
  {
    section_title: "Budget",
    contents: [
      {
        label: "Budget",
        type: "number",
        placeholder: "1000000",
        name: "budget",
      },
    ],
  },
  {
    section_title: "Bidding",
    contents: [
      {
        label: "Bidding",
        type: "number",
        placeholder: "1000000",
        name: "bid_amount",
      },
    ],
  },
  {
    section_title: "Creative",
    contents: [
      {
        label: "Title",
        type: "text",
        placeholder: "",
        name: "title",
      },
      {
        label: "Description",
        type: "text",
        placeholder: "",
        name: "description",
      },
      {
        label: "Creative preview",
        type: "image",
        placeholder: "",
        name: "creative_preview",
      },
      {
        label: "Final URL",
        type: "text",
        placeholder: "",
        name: "final_url",
      },
    ],
  },
];

let editCampaignFormField = [
  {
    section_title: "Details",
    contents: [
      {
        label: "Name",
        type: "text",
        placeholder: "name",
        name: "name",
        default: "",
      },
      {
        label: "User status",
        type: "select",
        default: 1,
        options: [
          { label: "Active", value: "1" },
          { label: "Inactive", value: "0" },
        ],
        name: "status",
        default: "",
      },
    ],
  },
  {
    section_title: "Schedule",
    type: "time_range",
    contents: [
      {
        label: "Start time",
        type: "datetime-local",
        name: "start_date",
        default: "",
      },
      {
        label: "End time",
        type: "datetime-local",
        name: "end_date",
        default: "",
      },
    ],
  },
  {
    section_title: "Budget",
    contents: [
      {
        label: "Budget",
        type: "number",
        placeholder: "1000000",
        name: "budget",
        default: "",
      },
    ],
  },
  {
    section_title: "Bidding",
    contents: [
      {
        label: "Bidding",
        type: "number",
        placeholder: "1000000",
        name: "bid_amount",
        default: "",
      },
    ],
  },
  {
    section_title: "Creative",
    contents: [
      {
        label: "Title",
        type: "text",
        placeholder: "",
        name: "name",
        default: "",
      },
      {
        label: "Description",
        type: "text",
        placeholder: "",
        name: "description",
        default: "",
      },
      {
        label: "Creative preview",
        type: "image",
        placeholder: "",
        name: "creative_preview",
      },
      {
        label: "Final URL",
        type: "text",
        placeholder: "",
        name: "final_url",
        default: "",
      },
    ],
  },
];

export { createCampaignFormField, editCampaignFormField };
