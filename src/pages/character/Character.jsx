import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./character.css";

export default function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const { status } = response;
      if (status !== 200) return false;
      const character = await response.json();
      setCharacter(() => ({ ...character }));
    };
    getData();
  }, [id]);

  const getNumberEpisode = (episode) => {
    const number = episode.substring(episode.lastIndexOf("/") + 1);
    return number;
  };

  return (
    <div className="character">
      <div className="characterWrapper">
        <div className="characterTop">
          <div className="characterTopLeft">
            <img src={character?.image} alt="" className="characterImg" />
            <h1 className="characterTitle">{character?.name}</h1>
          </div>
          <div className="characterTopRight">
            <div className="characterInfo">
              <span className="characterKey">Status:</span>
              <p className="characterValue">{character?.status}</p>
            </div>
            <div className="characterInfo">
              <span className="characterKey">Specie:</span>
              <p className="characterValue">{character?.species}</p>
            </div>
            <div className="characterInfo">
              <span className="characterKey">Type:</span>
              <p className="characterValue">{character?.type}</p>
            </div>
            <div className="characterInfo">
              <span className="characterKey">Gender:</span>
              <p className="characterValue">{character?.gender}</p>
            </div>
            <div className="characterInfo">
              <span className="characterKey">Origin:</span>
              <p className="characterValue">{character?.origin?.name}</p>
            </div>
            <div className="characterInfo">
              <span className="characterKey">Location:</span>
              <p className="characterValue">{character?.location?.name}</p>
            </div>
          </div>
        </div>
        <div className="characterBottom">
          <h2 className="characterBottomTitle">Episodes:</h2>
          <div className="characterEpisodes">
            {character?.episode?.map((item, index) => (
              <div key={index} className="characterEpisode">
                <span className="characterEpisodeTitle">Episode</span>
                <p className="characterEpisodeValue">
                  {getNumberEpisode(item)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
