import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Search = () => {
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChageHandler = (text) => {
    let matchCharacters = [];
    let matchPlanets = [];
    let matchVehicles = [];

    if (text.length > 0) {
      matchCharacters = store.characters.filter((character) => {
        const regex = new RegExp(`${text}`, "gi");
        return character.name.match(regex);
      });

      matchPlanets = store.planets.filter((planet) => {
        const regex = new RegExp(`${text}`, "gi");
        return planet.name.match(regex);
      });

      matchVehicles = store.vehicles.filter((vehicle) => {
        const regex = new RegExp(`${text}`, "gi");
        return vehicle.name.match(regex);
      });
    }
    let searches = [...matchCharacters, ...matchPlanets, ...matchVehicles];

    setSuggestions(searches);
    setInputValue(text);
  };

  const onSuggestHandler = (text) => {
    setInputValue(text);
    setSuggestions([]);
  };

  return (
    <>
      {store.token && (
        <div className="container py-3">
          <div className="row ">
            <h2 className="text-center">Search</h2>
            <input
              type="text"
              placeholder="Search"
              value={inputValue}
              className="input-search"
              onChange={(event) => {
                onChageHandler(event.target.value.trim());
              }}
            ></input>
            <div className="suggestions">
              {suggestions &&
                suggestions.map((suggestion, index) => {
                  return (
                    <Link
                      to={`/${
                        "gender" in suggestion
                          ? "people"
                          : "diameter" in suggestion
                          ? "planets"
                          : "vehicles"
                      }/${suggestion.uid}`}
                      key={suggestion.name}
                      className="d-block"
                      onClick={() => onSuggestHandler(suggestion.name)}
                    >
                      {suggestion.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
