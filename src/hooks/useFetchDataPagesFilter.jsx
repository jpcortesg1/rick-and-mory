import { useEffect, useState } from "react";

export default function useFetchDataPagesFilter(
  filter,
  functionsInfoFilter,
  initialPath,
  infoPage,
  functionsInfoPage
) {
  const {
    handlePrev,
    handleMaxPage,
    handleInitialState: handleInitialStateInfoPage,
  } = functionsInfoPage;
  const { handleInitialState: handleInitialStateFilter } = functionsInfoFilter;

  // Stablesh initial state
  const [data, setData] = useState([]);

  // Set page in 1 and filters for default
  const setFiltersAndPage = () => {
    handleInitialStateInfoPage();
    handleInitialStateFilter();
  };

  useEffect(() => {
    const createPath = () => {
      let filters = "";

      // Create string with all filters
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== "")
          filters = filters.concat(`&${key}=${filter[key]}`);
      });
      let path = `${initialPath}${infoPage.current}`;

      // Concat path with all current filters
      path = path.concat(filters);
      return path;
    };

    const getData = async () => {
      const path = createPath(); // Get path with filters
      try {
        const response = await fetch(path); // Get data with dinamic page;
        const { status } = response;
        const { current: page } = infoPage;

        // Validate status and set values
        if (status !== 200 && page > 1) handlePrev(); // Reduce number of page until have data
        if ((status !== 200) & (page === 1)) setFiltersAndPage(); // If reach the limit, set all like in the start

        const { results, info } = await response.json(); // Convert to JSON and get characters
        const { pages: newMaxPage } = info;

        // Set info
        handleMaxPage(newMaxPage); // Set max page
        setData(() => [...results]); // Set characters
      } catch (error) {
        setData((currentCharacter) => [...currentCharacter]); // No changes
      }
    };
    getData(); // Get data when exist some change
  }, [infoPage.current, filter]);

  return [data];
}
