import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Character = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, []);

  return (
    <React.Fragment>
      {store.characters.map((character) => {
        if (character.uid == params.id) {
          return (
            <div className="container" key={character.uid}>
              <div className="row d-flex justify-content-evenly">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                  className="img-description col-6"
                  alt={character.name}
                />
                <div className="description col-6 text-center">
                  <h1>{character.name}</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin semper diam et augue faucibus, eu elementum leo
                    euismod. Aenean id ipsum velit. Integer quis hendrerit
                    purus. Aliquam sagittis diam et lorem posuere, sit amet
                    ultricies velit efficitur. Nunc molestie elit risus, ut
                    commodo ligula facilisis et. Suspendisse viverra lobortis
                    ipsum.
                  </p>
                </div>
              </div>
              <div className="row justify-content-center text-danger border-top border-danger mt-4 text-center">
                <div className="col-2">
                  <p className="fw-bolder">Name</p>
                  <p>{character.name}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Birth Year</p>
                  <p>{character.birth_year}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Gender</p>
                  <p>{character.gender}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Height</p>
                  <p>{character.height}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Skin Color</p>
                  <p>{character.skin_color}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Eye Color</p>
                  <p>{character.eye_color}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};
