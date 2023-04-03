import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

export const CardList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setfilteredCards] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [translation, setTranslation] = useState(false);
  const navigate = useNavigate();

  const localLanguageUser = localStorage.getItem("language_user");
  const languageUserObject = JSON.parse(localLanguageUser);

  useEffect(() => {
    fetch("http://localhost:8088/initialIndexCards?_expand=category")
      .then((response) => response.json())
      .then((cardsArray) => {
        const updatedCardsArray = cardsArray.map((card) => ({
          ...card,
          translate: false,
        }));
        setCards(updatedCardsArray);
        setfilteredCards(updatedCardsArray)
      });
  }, []);

  useEffect(
    () => {
      fetch("http://localhost:8088/categories")
        .then((response) => response.json())
        .then((categoryArray) => {
          setCategories(categoryArray);
        });
    },
    [] // When this array is empty, you are observing initial component state
  );

  /*
set false as english and true as spanish

The state needs to be simultaneously set to false onClick

In the return
 <button onClick = { () => {setTranslation(true)}}> </button>


!Below is the function used for the button to switch instead of CSS flip-card feature
  const checkTranslate = (card) => {
    return card.translate ? (
      <>
        <div className="language2">
          {card.translatedWord}
          <div>{card.translatedExampleSentence}</div>
          <div>
            {card.categoryId} - {card.category.translatedCategory}
          </div>
        </div>
      </>
    ) : (
      <div className="language1">
        {card.word}
        <div>{card.exampleSentence}</div>
        <div>
          {card.categoryId} - {card.category.category}
        </div>
      </div>
    );
  };
*/

  const deleteButton = (cardObj) => {
    return (
      <button
        className="DeleteButton"
        onClick={() => {
          fetch(`http://localhost:8088/initialIndexCards/${cardObj.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch("http://localhost:8088/initialIndexCards?_expand=category")
              .then((response) => response.json())
              .then((cardArray) => {
                setfilteredCards(cardArray);
              });
          });
        }}
      >
        X
      </button>
    );
  };

  return (
    <>
      {languageUserObject.staff ? (
        <>
          <button onClick={() => navigate("/card/create")}>
            Create A New Card
          </button>
        </>
      ) : (
        <> </>
      )}
     <div></div> 

     <select className="categoryFilter" onChange={(e) => {
   if(e.target.value === "showAll"){setfilteredCards(cards)}else{
    const filtered = cards.filter((card)=> card.categoryId === parseInt(e.target.value) )
    setfilteredCards(filtered);
            }}}> 
        <option  value="placeholder">Filter by Category</option> 
        {categories.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.id}- {category.category}/{category.translatedCategory}
            </option>
          );
        })}
         <option value="showAll">Show all</option>

      </select>
      
      <h2>List of Cards</h2>
    
      <article className="cards">
        {filteredCards.map((card, index) => {
          return (
            <section className="card">
               {languageUserObject.staff ? <>{deleteButton(card)}</> : <> </>}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    {card.word}
                    <div>{card.exampleSentence}</div>
                    <div>Category - {card.category.category}</div>
                    {card.formal === true ? (
                      <div>Formal? True</div>
                    ) : (
                      <div>Formal? False</div>
                    )}
                  </div>
                  <div className="flip-card-back">
                    {card.translatedWord}
                    <div>{card.translatedExampleSentence}</div>
                    <div>Categoría - {card.category.translatedCategory}</div>
                    {card.formal === true ? (
                      <div>Formal? Verdadero</div>
                    ) : (
                      <div>Formal? Falso</div>
                    )}
                  </div>
                </div>
              </div>

              

             
            </section>
          );
        })}
      </article>
    </>
  );
};

/*
 Only ONE button should change state when clicked; rn all of them change onClick
 Make buttons able to switch back and forth when clicked - Toggle State?
 Upon delete, everything goes away until refresh

?Try and implement a filter by category!


!INCASE I CHANGE MY MIND, HERE IS THE CODE FOR THE CLICK-TO-TRANSLATE BUTTON INSTEAD
<button
                onClick={() => {
                  if (card.translate === true) {
                    card.translate = false;
                  } else {
                    card.translate = true;
                  }
                  const copy = [...cards];
                  copy[index] = card;
                  setCards(copy);
                }}
                className="button"
              >
                {card.translate ? (
                  <>
                    <div className="language2">
                      {card.translatedWord}
                      <div>{card.translatedExampleSentence}</div>
                      <div>Categoría - {card.category.translatedCategory}</div>
                      {card.formal === true ? (
                        <div>Formal? Verdadero</div>
                      ) : (
                        <div>Formal? Falso</div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="language1">
                    {card.word}
                    <div>{card.exampleSentence}</div>
                    <div>Category - {card.category.category}</div>
                    {card.formal === true ? (
                      <div>Formal? True</div>
                    ) : (
                      <div>Formal? false</div>
                    )}
                  </div>
                )}
              </button>

*/
