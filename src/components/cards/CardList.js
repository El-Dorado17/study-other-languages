import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cards.css"
import { DeleteCard } from "./Card"




export const CardList = () => {
    const [cards, setCards] = useState([]) 
    const navigate = useNavigate()


    const localLanguageUser = localStorage.getItem("language_user")
    const languageUserObject = JSON.parse(localLanguageUser)

    useEffect(
        () => {
            fetch('http://localhost:8088/initialIndexCards')
            .then(response => response.json())
            .then((cardArray) => {
                setCards(cardArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )


    const deleteButton = (cardObj) =>{
        return <button onClick={()=>{
            fetch(`http://localhost:8088/initialIndexCards/${cardObj.id}`, {
                method: "DELETE",
            })
                .then(()=> {
                    fetch('http://localhost:8088/initialIndexCards')
                .then(response => response.json())
                .then((cardArray)=>{
                    setCards(cardArray)
                })
                })

            }}>DELETE</button>
    }



    return <> 
 {
        languageUserObject.staff
        ? <> 
            <button onClick={() => navigate("/card/create")}>Create A New Card</button>
        </>
        : <> </>
    }
        <h2>List of Cards</h2>

        <article className="cards">
            {
                cards.map( 
                    (card) => {
                        
                        return <section className="card">
                            <button className="button">

                            <div className="language1">
                                {card.word}  
                                    <div>
                                        {card.exampleSentence}
                                    </div>
                            </div>

                            <div className="language2">
                                {card.translatedWord}
                                    <div>
                                        {card.translatedExampleSentence}
                                    </div>
                            </div>

                            </button>
                            {
        languageUserObject.staff
        ? <> 
            {deleteButton(card)}
        </>
        : <> </>
    }
                        </section>
                    }
                    
                )
                
            }
        </article>
    </>
}

/*
<button onClick = { () => {setEmergency(true) } } >Emergency Only</button>
            <button onClick = { () => {setEmergency(false) } } >Show All</button>
        </>
        : <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
        <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>


    <button onClick={() => navigate("/product/create")}>Create Candy>


        dic for each word and sentence

*/