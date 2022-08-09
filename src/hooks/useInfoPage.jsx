import { useState } from "react";

export default function useInfoPage() {
  // Establish initial state
  const initialState = {
    current: 1,
    min: 1,
    max: 1,
  };
  const [infoPage, setInfoPage] = useState({ ...initialState });

  // Next page
  const handleNext = () =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      current: currentInfoPage.current + 1,
    }));

  // Previous page
  const handlePrev = () =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      current: currentInfoPage.current - 1,
    }));

  // Change the number of max page
  const handleMaxPage = (newMaxPage) =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      max: newMaxPage,
    }));

  // Set the state for initial state
  const handleInitialState = () => {
    setInfoPage(() => ({ ...initialState }));
  };

  return [
    infoPage,
    { handleNext, handlePrev, handleMaxPage, handleInitialState },
  ];
}
