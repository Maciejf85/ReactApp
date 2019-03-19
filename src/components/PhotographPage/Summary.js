import React from "react";

const Summary = props => {
  const {
    name,
    surname,
    password,
    email,
    phone,
    packageQ,
    price,
    addPrice,
    dateOf,
    type,
    filesSummary,
    token
  } = props.values;

  return (
    <>
      <h5>Podsumowanie:</h5>
      <div className='summary-items'>


        <div className='form-item'>
          <span className='form-item-title'>
            <p>Imię</p>
          </span>
          <div className='form-item-value'>
            <p>{name}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Nazwisko</p>
          </div>
          <div className='form-item-value'>
            <p>{surname}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Hasło</p>
          </div>
          <div className='form-item-value'>
            <p>{password}</p>
          </div>
        </div>
        <div className='form-item'>
          <div className='form-item-title'>
            <p>email</p>
          </div>
          <div className='form-item-value'>
            <p>{email}</p>
          </div>
        </div>
        <div className='form-item'>
          <div className='form-item-title'>
            <p>telefon</p>
          </div>
          <div className='form-item-value'>
            <p>{phone}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Pakiet</p>
          </div>
          <div className='form-item-value'>
            <p>{packageQ} szt</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Cena</p>
          </div>
          <div className='form-item-value'>
            <p>{price} zł</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Cena za dodatkowe</p>
          </div>
          <div className='form-item-value'>
            <p>{addPrice}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Data sesji</p>
          </div>
          <div className='form-item-value'>
            <p>{dateOf}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>Rodzaj sesji</p>
          </div>
          <div className='form-item-value'>
            <p>{type}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>token</p>
          </div>
          <div className='form-item-value'>
            <p>{token}</p>
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item-title'>
            <p>importowane pliki</p>
          </div>
          <div className='form-item-value files'>
            <p >plików : {filesSummary.quantity} </p>
            <p>rozmiar: {filesSummary.size}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Summary;
