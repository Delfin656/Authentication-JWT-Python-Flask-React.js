const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      urlBase: `${process.env.BACKEND_URL}`,
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    },
    actions: {
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log(
          "Aplication just loaded, synching the session storage token"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      register: async (name, email, password) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(`${store.urlBase}/api/users`, options);

          if (!response.ok) {
            let danger = await response.json();
            alert(danger);
            return false;
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Login out");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(`${store.urlBase}/api/token`, options);

          if (!response.ok) {
            let danger = await response.json();
            alert(danger.msg);
            return false;
          }

          const data = await response.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },

      addFavorites: async (category, fav_name, item_id) => {
        const actions = getActions();
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            name: fav_name,
          }),
        };

        try {
          const response = await fetch(
            `${store.urlBase}/api/favorite/${category}/${item_id}`,
            options
          );
          if (!response.ok) {
            let msg = await response.json();
            alert(msg.msg);
            return false;
          }
          let data = await response.json();
          actions.getFavorites();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      },

      deleteFavorites: async (character_id, planet_id, vehicle_id) => {
        const actions = getActions();
        const store = getStore();
        let category = "";
        let item_id = "";
        if (character_id != null) {
          category = "people";
          item_id = character_id;
        }
        if (planet_id != null) {
          category = "planet";
          item_id = planet_id;
        }
        if (vehicle_id != null) {
          category = "vehicle";
          item_id = vehicle_id;
        }

        console.log(character_id, planet_id, vehicle_id, category);
        try {
          const response = await fetch(
            `${store.urlBase}/api/favorite/${category}/${item_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + store.token,
              },
            }
          );
          if (response.ok) {
            let data = await response.json();
            actions.getFavorites();
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      },

      getFavorites: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const response = await fetch(
            `${store.urlBase}/api/users/favorites`,
            opts
          );
          if (response.ok) {
            let data = await response.json();
            setStore({
              favorites: data,
            });
            localStorage.setItem("favorites", JSON.stringify(store.favorites));
          }
        } catch (error) {
          console.log(error);
        }
      },

      getCharacters: () => {
        const store = getStore();

        if (localStorage.characters == undefined) {
          const apiURLPeople = `${store.urlBase}/api/people`;

          fetch(apiURLPeople)
            .then((respond) => {
              if (respond.ok) {
                return respond.json();
              }
              throw new Error("Algo salio mal");
            })
            .then((data) => {
              setStore({ characters: data });
              localStorage.setItem(
                "characters",
                JSON.stringify(store.characters)
              );
            })
            .catch((err) => console.error(err));
        }
      },

      fillCharacters: async () => {
        const store = getStore();
        const actions = getActions();

        const apiURLFillPeople = `${store.urlBase}/api/fill/people`;

        try {
          const response = await fetch(apiURLFillPeople);
          let msg = await response.json();
          if (!response.ok) {
            actions.getCharacters();
            console.log(msg);
            return false;
          }
          actions.getCharacters();
          console.log(msg);
        } catch (error) {
          console.error(error);
        }
      },

      getPlanets: () => {
        const store = getStore();

        if (localStorage.planets == undefined) {
          const apiURLPlanet = `${store.urlBase}/api/planets`;

          fetch(apiURLPlanet)
            .then((respond) => {
              if (respond.ok) {
                return respond.json();
              }
              throw new Error("Algo salio mal");
            })
            .then((data) => {
              setStore({ planets: data });
              localStorage.setItem("planets", JSON.stringify(store.planets));
            })
            .catch((err) => console.error(err));
        }
      },

      fillPlanets: async () => {
        const store = getStore();
        const actions = getActions();

        const apiURLFillPlanet = `${store.urlBase}/api/fill/planets`;

        try {
          const response = await fetch(apiURLFillPlanet);
          let msg = await response.json();
          if (!response.ok) {
            actions.getPlanets();
            console.log(msg);
            return false;
          }
          actions.getPlanets();
          console.log(msg);
        } catch (error) {
          console.error(error);
        }
      },

      getVehicles: () => {
        const store = getStore();

        if (localStorage.vehicles == undefined) {
          const apiURLVehicle = `${store.urlBase}/api/vehicles`;

          fetch(apiURLVehicle)
            .then((respond) => {
              if (respond.ok) {
                return respond.json();
              }
              throw new Error("Algo salio mal");
            })
            .then((data) => {
              setStore({ vehicles: data });
              localStorage.setItem("vehicles", JSON.stringify(store.vehicles));
            })
            .catch((err) => console.error(err));
        }
      },

      fillVehicles: async () => {
        const store = getStore();
        const actions = getActions();

        const apiURLFillVehcile = `${store.urlBase}/api/fill/vehicles`;

        try {
          const response = await fetch(apiURLFillVehcile);
          let msg = await response.json();
          if (!response.ok) {
            actions.getVehicles();
            console.log(msg);
            return false;
          }
          actions.getVehicles();
          console.log(msg);
        } catch (error) {
          console.error(error);
        }
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            "https://3001-4geeksacade-reactflaskh-0nazwprms7e.ws-us74.gitpod.io/api/hello",
            opts
          );
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
