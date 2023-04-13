import React, { useContext } from "react";
import rigoImageUrl from "../../img/placeholder.jpg";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardVehicle = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card me-5" style={{ minWidth: "14rem" }}>
      <img
        src={
          props.item.uid < 44
            ? `https://starwars-visualguide.com/assets/img/vehicles/${props.item.uid}.jpg`
            : rigoImageUrl
        }
        className="card-img-top"
        alt={props.item.name}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{props.item.name}</h5>
        <div className="card-text">
          <p>
            <strong>Model:</strong> {props.item.model}
          </p>
          <p>
            <strong>Passengers:</strong> {props.item.passengers}
          </p>
          <p>
            <strong>Cost:</strong> {props.item.cost_in_credits}
          </p>
        </div>
        <div className="buttons-card">
          <Link
            to={`/vehicles/${props.item.uid}`}
            className="btn btn-outline-primary"
          >
            Learn more!
          </Link>
          <button
            className="btn btn-outline-warning fas fa-heart"
            onClick={(e) =>
              actions.addFavorites("vehicle", props.item.name, props.item.id)
            }
          ></button>
        </div>
      </div>
    </div>
  );
};
