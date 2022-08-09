import useFetchDataPagesFilter from "../../hooks/useFetchDataPagesFilter";
import useFilter from "../../hooks/useFilter";
import useInfoPage from "../../hooks/useInfoPage";
import "./home.css";

export default function Home() {
  // Manage the pagination
  const [infoPage, functionsInfoPage] = useInfoPage();
  const { handleNext, handlePrev } = functionsInfoPage;

  // Manage form inputs
  const [filter, functionsInfoFilter] = useFilter({
    name: "",
    species: "",
    type: "",
    status: "",
    gender: "",
  });
  const { handleChangeFilter } = functionsInfoFilter;

  // Get data to render
  const path = "https://rickandmortyapi.com/api/character?page=";
  const [characters] = useFetchDataPagesFilter(
    filter,
    functionsInfoFilter,
    path,
    infoPage,
    functionsInfoPage
  );

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
                  onChange={handleChangeFilter}
                />
              </label>
              <label className="homeLabel">
                Species:
                <input
                  placeholder="Human..."
                  type="text"
                  className="homeInput"
                  name="species"
                  onChange={handleChangeFilter}
                />
              </label>
              <label className="homeLabel">
                Type:
                <input
                  placeholder="Space station..."
                  type="text"
                  className="homeInput"
                  name="type"
                  onChange={handleChangeFilter}
                />
              </label>
              <div className="homeSelectInput">
                <label className="homeLabel">Status:</label>
                <select
                  className="homeSelect"
                  name="status"
                  onChange={handleChangeFilter}
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
                  onChange={handleChangeFilter}
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
