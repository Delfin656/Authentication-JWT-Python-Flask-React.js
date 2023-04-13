import React, { useContext } from "react";
import rigoImageUrl from "../../img/placeholder.jpg";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardPlanet = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card me-5" style={{ minWidth: "14rem" }}>
      <img
        src={
          props.item.uid != 1 && props.item.uid < 20
            ? `https://starwars-visualguide.com/assets/img/planets/${props.item.uid}.jpg`
            : rigoImageUrl
        }
        className="card-img-top"
        alt={props.item.name}
      />
      <div className="card-body d-flex flex-column justify-content-around">
        <h5 className="card-title">{props.item.name}</h5>
        <div className="card-text">
          <p>
            <strong>Population:</strong> {props.item.population}
          </p>
          <p>
            <strong>Terrain:</strong> {props.item.terrain}
          </p>
        </div>
        <div className="buttons-card">
          <Link
            to={`/planets/${props.item.uid}`}
            className="btn btn-outline-primary"
          >
            Learn more!
          </Link>
          <button
            className="btn btn-outline-warning fas fa-heart"
            onClick={(e) =>
              actions.addFavorites("planet", props.item.name, props.item.id)
            }
          ></button>
        </div>
      </div>
    </div>
  );
};
