import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const [characters, setCharacter] = useState([]);
  const [infoPage, setInfoPage] = useState({
    current: 1,
    min: 1,
    max: 1,
  });
  const [filter, setFilter] = useState({
    name: "",
    species: "",
    type: "",
    status: "",
    gender: "",
  });

  // Next page
  const handleNext = () =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      current: currentInfoPage.current + 1,
    }));

  // Next page
  const handlePrev = () =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      current: currentInfoPage.current - 1,
    }));

  const handleMaxPage = (newMaxPage) =>
    setInfoPage((currentInfoPage) => ({
      ...currentInfoPage,
      max: newMaxPage,
    }));

  // Set page in 1 and filters for default
  const setFiltersAndPage = () => {
    setInfoPage({
      current: 1,
      min: 1,
      max: 1,
    });
    setFilter({
      name: "",
      species: "",
      type: "",
      status: "",
      gender: "",
    });
  };

  useEffect(() => {
    const createPath = () => {
      let filters = "";

      // Create string with all filters
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== "")
          filters = filters.concat(`&${key}=${filter[key]}`);
      });
      let path = `https://rickandmortyapi.com/api/character?page=${infoPage.current}`;

      // Concat path with all current filters
      path = path.concat(filters);
      return path;
    };

    const getData = async () => {
      const path = createPath();
      try {
        const response = await fetch(path); // Get data with dinamic page;
        const { status } = response;
        const { current: page } = infoPage;

        if (status !== 200 && page > 0) handlePrev(); // Reduce number of page until have data
        if ((status !== 200) & (page === 1)) setFiltersAndPage(); // If reach the limit, set all like in the start

        const { results, info } = await response.json(); // Convert to JSON and get characters
        const { pages: newMaxPage } = info;
        handleMaxPage(newMaxPage); // Set max page

        setCharacter(() => [...results]); // Set characters
      } catch (error) {
        setCharacter((currentCharacter) => [...currentCharacter]); // No changes
      }
    };
    getData();
  }, [infoPage.current, filter]);

  const handleChangeForm = ({ target }) => {
    const { value, name } = target;
    setFilter((currentFilter) => ({ ...currentFilter, [name]: value }));
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeTop">
          <div className="homeTopLeft">
            <h1 className="homeTitle">Characters:</h1>
          </div>
          <div className="homeTopRight">
            <form className="homeForm">
              <label className="homeLabel">
                Name:
                <input
                  placeholder="Rick..."
                  type="text"
                  className="homeInput"
                  name="name"
                  onChange={handleChangeForm}
                />
              </label>
              <label className="homeLabel">
                Species:
                <input
                  placeholder="Human..."
                  type="text"
                  className="homeInput"
                  name="species"
                  onChange={handleChangeForm}
                />
              </label>
              <label className="homeLabel">
                Type:
                <input
                  placeholder="Space station..."
                  type="text"
                  className="homeInput"
                  name="type"
                  onChange={handleChangeForm}
                />
              </label>
              <div className="homeSelectInput">
                <label className="homeLabel">Status:</label>
                <select
                  className="homeSelect"
                  name="status"
                  onChange={handleChangeForm}
                >
                  <option value="alive">Alive</option>
                  <option value="dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div className="homeSelectInput">
                <label className="homeLabel">Gender:</label>
                <select
                  className="homeSelect"
                  name="gender"
                  onChange={handleChangeForm}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="genderless">Genderless</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="homeBottom">
          <div className="homeCharacters">
            {characters?.map((character, index) => (
              <div className="character" key={index}>
                <div className="characterWrapper">
                  <div className="characterTop">
                    <img
                      src={character.image}
                      alt=""
                      className="characterImage"
                    />
                  </div>
                  <div className="characterBottom">
                    <div className="characterBottomLeft">
                      <p className="characterText">
                        <span className="characterLabel">Name:</span>
                        {character.name}
                      </p>
                    </div>
                    <div className="characterBottomRight">
                      <p className="characterText">
                        <span className="characterLabel">Specie:</span>
                        {character.species}
                      </p>
                    </div>
                    <button className="characterSeeMore">See More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="homePagination">
            {infoPage.current > infoPage.min && (
              <button className="homeButton" onClick={handlePrev}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
            )}
            <div className="homeCurrentPage">{infoPage.current}</div>
            {infoPage.current < infoPage.max && (
              <button className="homeButton" onClick={handleNext}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
