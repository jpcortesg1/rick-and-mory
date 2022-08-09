import { useState } from "react";

export default function useFilter(filters) {
  // Stablesh initial state
  const initialState = {};
  Object.keys(filters).map((key) => {
    initialState[key] ??= filters[key];
  });
  const [filter, setFilter] = useState({ ...initialState });

  // On change any value
  const handleChangeFilter = ({ target }) => {
    const { value, name } = target;
    setFilter((currentFilter) => ({ ...currentFilter, [name]: value }));
  };

  // Set with initial state
  const handleInitialState = () => {
    setFilter(() => ({ ...initialState }));
  };

  return [filter, { handleChangeFilter, handleInitialState }];
}
