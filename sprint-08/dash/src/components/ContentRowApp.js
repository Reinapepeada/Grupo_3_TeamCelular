import React from "react";
import SmallCard from "./SmallCard";
import { useEffect, useState /*useRef*/ } from "react";

function ContentRowApp() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setCategory(Object.keys(data.countByCategory).length);
      })

      .catch((error) => console.error(error));
  }, []);

  /* <!-- Users in DB --> */

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.count);
      })
      .catch((error) => console.error(error));
  }, []);

  let productsInDB = {
    title: "Cantidad de Productos",
    color: "primary",
    cuantity: products.count ?? "Ups! no hay data",
    icon: "fa-clipboard-list",
  };

  /* <!-- Users quantity --> */

  let usersInDb = {
    title: "Cantidad de usuarios",
    color: "success",
    cuantity: users,
    icon: "fa-user-check",
  };

  let categoryInDB = {
    title: "Cantidad de Categorías ",
    color: "warning",
    cuantity: category ?? "Ups! no hay data",
    icon: "fa-clipboard-list",
  };

  let cartProps = [productsInDB, usersInDb, categoryInDB];

  return (
    <div className="row">
      {cartProps.map((element, i) => {
        return <SmallCard {...element} key={i} />;
      })}
    </div>
  );
}

export default ContentRowApp;
