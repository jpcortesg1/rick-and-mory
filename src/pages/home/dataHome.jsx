// Initial values of filter in characters
export const initialValuesFilter = {
  name: "",
  species: "",
  type: "",
  status: "",
  gender: "",
};

// To create inputs to filter characters
export const filterForm = {
  name: {
    label: "Name",
    placeholder: "Rick...",
    type: "text",
    name: "name",
  },
  species: {
    label: "Species",
    placeholder: "Human...",
    type: "text",
    name: "species",
  },
  type: {
    label: "Type",
    placeholder: "Space Station...",
    type: "text",
    name: "type",
  },
  status: {
    label: "Status",
    type: "select",
    name: "status",
    options: {
      Any: "",
      Alive: "alive",
      Dead: "dead",
      Unknown: "unknown",
    },
  },
  gender: {
    label: "Gender",
    type: "select",
    name: "gender",
    options: {
      Any: "",
      Female: "female",
      Male: "male",
      Genderless: "genderless",
      Unknown: "unknown",
    },
  },
};
