import React from "react";

const Summary = props => {
  const {
    name,
    surname,
    password,
    email,
    packageQ,
    price,
    addPrice,
    dataOf,
    type,
    token
  } = props.values;

  return (
    <>
      <h5>Podsumowanie:</h5>
      <p>{name}</p>
      <p>{surname}</p>
      <p>{password}</p>
      <p>{email}</p>
      <p>{packageQ}</p>
      <p>{price}</p>
      <p>{addPrice}</p>
      <p>{dataOf}</p>
      <p>{type}</p>
      <p>{token} </p>
    </>
  );
};

export default Summary;
