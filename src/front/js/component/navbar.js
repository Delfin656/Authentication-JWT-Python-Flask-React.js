import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import starWarsLogo from "../../img/pngwing.com.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-dark sticky-top">
      <div className="container">
        <Link to="/">
          <img style={{ width: "100px" }} src={starWarsLogo}></img>
        </Link>
        <div className="d-flex">
          {store.token && (
            <div className="dropdown p-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites {store.favorites.length}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {!(store.favorites.length == 0) ? (
                  store.favorites.map((favorite) => (
                    <li key={favorite.id} className="d-flex flex-nowrap p-2">
                      <span className="dropdown-item">{favorite.name}</span>
                      <button
                        className="btn-dropdown"
                        onClick={(e) =>
                          actions.deleteFavorites(
                            favorite.character_id,
                            favorite.planet_id,
                            favorite.vehicle_id
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-center">No favorites</li>
                )}
              </ul>
            </div>
          )}

          <div className="p-2">
            {!store.token ? (
              <Link to="/login">
                <button className="btn btn-light">Log In</button>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  onClick={() => actions.logout()}
                  className="btn btn-dark"
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
