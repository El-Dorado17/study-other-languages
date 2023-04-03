/*This module will contain the function that deletes an
individual card/initialIndexCard from the API using a DELETE

See Honey Rae's Ch 18
*/
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom"

//TODO:

export const DeleteCard = () => {
  const [cards, setCards] = useState([]); //Saving the cards into this useState

  //const localLanguageUser = localStorage.getItem("language_user")
  //const languageUserObject = JSON.parse(localLanguageUser)
  // const navigate = useNavigate()

  useEffect(
    //This actually brings the cards in from API
    () => {
      fetch("http://localhost:8088/initialIndexCards")
        .then((response) => response.json())
        .then((cardArray) => {
          setCards(cardArray);
        });
    },
    []
  );

  //The way I read this, This will delete the ID of the card this button is on.
  //I'm missing a lot of meat though...
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

/*
 <header className="card_header">
            {}
        </header>
        <section> {cards.word} </section>
        <section> emergency. Does this show?</section>
        <footer className="card_footer">

        </footer>
*/
