import { useNavigate } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import useFetchDataPagesFilter from "../../hooks/useFetchDataPagesFilter";
import useFilter from "../../hooks/useFilter";
import useInfoPage from "../../hooks/useInfoPage";
import { initialValuesFilter, filterForm } from "./dataHome";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  // Manage the pagination
  const [infoPage, functionsInfoPage] = useInfoPage();
  const { handleNext, handlePrev } = functionsInfoPage;

  // Manage form inputs
  const [filter, functionsInfoFilter] = useFilter({ ...initialValuesFilter });
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

  // Change of page to individual character
  const handleNavigate = (id) => {
    navigate(`/character/${id}`);
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeTop">
          <div className="homeTopLeft">
            <h1 className="homeTitle">Characters:</h1>
          </div>
          <div className="homeTopRight">
            <Filter
              form={{ ...filterForm }}
              handleChangeFilter={handleChangeFilter}
              filter={filter}
            />
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
                      onClick={() => handleNavigate(character.id)}
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
                    <button
                      className="characterSeeMore"
                      onClick={() => handleNavigate(character.id)}
                    >
                      See More
                    </button>
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
