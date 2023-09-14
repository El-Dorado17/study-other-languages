//? Importing useState & useEffect from the react library. React is a library. 
//* I REPEAT: React is a LIBRARY
import { useState, useEffect } from "react";

//? This DeleteCard function starts on line 5 and closes at the very bottom of this module
export const DeleteCard = () => {
  const [cards, setCards] = useState([]); //Saving the cards into this useState

  useEffect(
    //? This brings the cards in from the API
    () => {
      fetch("http://localhost:8088/initialIndexCards")
        .then((response) => response.json())
        .then((cardArray) => {
          setCards(cardArray);
        });
    },
    []
  );

  //? This will delete the ID of the card this button is on, and then re-fetch (re-quest) the list of index cards to show the list with the deleted one eliminated!
  const deleteButton = (cardObj) => {
    return (
      <button
        onClick={() => {
          fetch(`http://localhost:8088/initialIndexCards/${cardObj.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch("http://localhost:8088/initialIndexCards").then((response) =>
              response.json()
            );
          });
        }}
      >
        DELETE BUTTON
      </button>
    );
  };

  return <section className="card">{deleteButton(cards)}</section>;
};