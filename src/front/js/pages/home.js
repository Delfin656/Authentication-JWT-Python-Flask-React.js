import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import starwars from "../../img/starwars.jpeg";
import "../../styles/home.css";
import "../../styles/index.css";
import { CardCharacter } from "../component/CardCharacter";
import { CardPlanet } from "../component/CardPlanet";
import { CardVehicle } from "../component/CardVehicle.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getFavorites();
    }
  }, [store.token]);

  return (
    <>
      {store.token ? (
        <div className="container">
          {/* <div className="alert alert-info">{store.message}</div> */}
          <h2 className="text-danger mt-5">Characters</h2>
          <div className="carousel">
            <div className="characters">
              {store.characters.map((character) => {
                return (
                  <CardCharacter item={character} key={character.uid + 10} />
                );
              })}
            </div>
          </div>
          <h2 className="text-danger mt-5">Planets</h2>
          <div className="carousel">
            <div className="characters">
              {store.planets.map((planet) => {
                return <CardPlanet item={planet} key={planet.uid} />;
              })}
            </div>
          </div>
          <h2 className="text-danger mt-5">Vehicles</h2>
          <div className="carousel">
            <div className="characters">
              {store.vehicles.map((vehicle) => {
                return <CardVehicle item={vehicle} key={vehicle.uid} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-bg-dark">
          <img
            src="https://img.freepik.com/foto-gratis/nave-espacial_1048-4457.jpg?w=1380&t=st=1667597384~exp=1667597984~hmac=395b095b3139704ebb2b40e48524ecf6c55fb59baea144ecd360c40c6815ccda"
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay d-flex justify-content-center align-items-center">
            <div className="d-flex gap-5">
              <Link to="/login">
                <button className="btn btn-dark btn-lg">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-dark btn-lg">Signup</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
