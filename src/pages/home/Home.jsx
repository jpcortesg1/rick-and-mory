import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const [page, setPage] = useState(1);
  const [characters, setCharacter] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    species: "",
    type: "",
    status: "",
    gender: "",
  });

  const handleNext = () => setPage((currentPage) => currentPage + 1);
  const handlePrev = () => setPage((currentPage) => currentPage - 1);

  useEffect(() => {
    const createPath = () => {
      let filters = "";
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== "")
          filters = filters.concat(`&${key}=${filter[key]}`);
      });
      let path = `https://rickandmortyapi.com/api/character?page=${page}`;
      path = path.concat(filters);
      return path;
    };

    const getData = async () => {
      const path = createPath();
      try {
        const response = await fetch(path); // Get data with dinamic page;
        const { status } = response;
        if (status !== 200) return;
        const { results } = await response.json(); // Convert to JSON and get characters
        setCharacter(results); // Set characters
      } catch (error) {
        setCharacter((currentCharacter) => [...currentCharacter]);
      }
    };
    getData();
  }, [page, filter]);

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
            {characters.map((character, index) => (
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
            {page > 1 && (
              <button className="homeButton" onClick={handlePrev}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
            )}
            {page <= 41 && (
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
