import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardCharacter = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="card me-5" style={{ minWidth: "14rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${props.item.uid}.jpg`}
        className="card-img-top"
        alt={props.item.name}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{props.item.name}</h5>
        <div className="card-text">
          <p>
            <strong>Gender:</strong> {props.item.gender}
          </p>
          <p>
            <strong>Hair color:</strong> {props.item.hair_color}
          </p>
          <p>
            <strong>Eye-color: </strong>
            {props.item.eye_color}
          </p>
        </div>
        <div className="buttons-card">
          <Link
            to={`/people/${props.item.uid}`}
            className="btn btn-outline-primary"
          >
            Learn more!
          </Link>
          <button
            className="btn btn-outline-warning fas fa-heart"
            onClick={(e) =>
              actions.addFavorites("people", props.item.name, props.item.id)
            }
          ></button>
        </div>
      </div>
    </div>
  );
};
