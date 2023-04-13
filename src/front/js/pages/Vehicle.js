import React, { useContext, useEffect } from "react";
import rigoImageUrl from "../../img/placeholder.jpg";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Vehicle = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, []);

  return (
    <React.Fragment>
      {store.vehicles.map((vehicle) => {
        if (vehicle.uid == params.id) {
          return (
            <div className="container" key={vehicle.uid}>
              <div className="row d-flex justify-content-evenly">
                <img
                  src={
                    vehicle.uid < 44
                      ? `https://starwars-visualguide.com/assets/img/vehicles/${params.id}.jpg`
                      : rigoImageUrl
                  }
                  className="img-description col-6"
                  alt={vehicle.name}
                />
                <div className="description col-6 text-center">
                  <h1>{vehicle.name}</h1>
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
                  <p>{vehicle.name}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Model</p>
                  <p>{vehicle.model}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Cost</p>
                  <p>{vehicle.cost_in_credits}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Passengers</p>
                  <p>{vehicle.passengers}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Length</p>
                  <p>{vehicle.length}</p>
                </div>
                <div className="col-2">
                  <p className="fw-bolder">Vehicle Class</p>
                  <p>{vehicle.vehicle_class}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};
