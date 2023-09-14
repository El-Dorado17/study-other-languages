//? Importing useEffect, useState, and useNavigate
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //? this one allows for a re-route after an action (ex: when you click "submit" you're taken to the main page, etc.)

//? CardForm function takes up the entire page
export const CardForm = () => {
  const [card, update] = useState({ //? Here I'm setting the template values of the card for whern you are in the create form!
    word: "",
    exampleSentence: "",
    translatedWord: "",
    translatedExampleSentence: "",
    categoryId: 0,
    formal: false,
  });

  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  //? This fetch has an expand query that reaches another layer deep into the database to get the actual names of the categories; not just their ID's
  useEffect(() => {
    fetch("http://localhost:8088/initialIndexCards?_expand=category")
      .then((response) => response.json())
      .then((cardArray) => {
        setCards(cardArray);
      });
  }, []);

  //? This fetch gets the categories to help the query above
  useEffect(
    () => {
      fetch("http://localhost:8088/categories")
        .then((response) => response.json())
        .then((categoryArray) => {
          setCategories(categoryArray);
        });
    },
    [] //? When this array is empty, you are observing initial component state
  );

  //? Function that turns the data from transient state to permanent state 
  const handleSaveButtonClick = (event) => {
    event.preventDefault()
    //? Create the object to be saved to the API
    const cardObjectToSendToAPI = {
      cardId: card.id,
      word: card.word,
      exampleSentence: card.exampleSentence,
      translatedWord: card.translatedWord,
      translatedExampleSentence: card.translatedExampleSentence,
      categoryId: card.categoryId,
      formal: card.formal,
    };

    //? This is my post request where we take the card the user made (on line 45) and POST it to the API
    return fetch("http://localhost:8088/initialIndexCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardObjectToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/cards"); //? After posting, we're auto-navigated top the /cards page, which is the main tab that displays all the cards in the database (which includes the new one we make)
      });
  };


  //? Below is all the HTML the user will actually see and interact with. Above are all the functions that do something as the user decides to, but below is actually rendered
  return (
    <form className="cardForm">
      <h2 className="cardForm_Title">New Card</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="word">Word:</label>
          <input
            required  //? as it says, this is needed to function
            autoFocus //? Just learned this one; autofocus let's the users cursor be active here as soon as the page loads. Very neat!
            type="text" //? expected input
            className="form-control" //? These classnames are for styling purposes
            placeholder="Apple." //? placeholder ready to be written over
            //? When this field gets value, the change event will fire to set this card value as what we input. 
            value={card.word} //! Transient state until we click Create Card at the bottom!
            onChange={(evt) => {
              const copy = { ...card };
              copy.word = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Example Sentence:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="The red apple."
            value={card.exampleSentence}
            onChange={(evt) => {
              const copy = { ...card };
              copy.exampleSentence = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Translated Word:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Manzana"
            value={card.translatedWord}
            onChange={(evt) => {
              const copy = { ...card };
              copy.translatedWord = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Translated Example Sentence:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="La manzana roja."
            value={card.translatedExampleSentence}
            onChange={(evt) => {
              const copy = { ...card };
              copy.translatedExampleSentence = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <label htmlFor="description">Category (*REQUIRED*)</label>
      <div></div>
      <select
        value={card.categoryId}
        onChange={(e) => {
          const copy = { ...card };
          copy.categoryId = parseInt(e.target.value);
          update(copy);
        }}
      >
       
        <option value="placeholder">Select a category</option>

        {categories.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.id}- {category.category}/{category.translatedCategory}
            </option>
          );
        })}
      </select>

      {/*this is a comment
// IDK why this is not reading as a function: //! bc I didn't bring in the data I needed
        */}

      <fieldset>
        <div className="form-group5">
          <label htmlFor="name">Formal?</label>
          <input
            type="checkbox"
            value={card.formal}
            onChange={(evt) => {
              const copy = { ...card };
              copy.formal = evt.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>

      
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Create card
      </button>
    </form>
  );
};
