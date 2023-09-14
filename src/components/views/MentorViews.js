//will see list of cards & create card
import { Outlet, Route, Routes } from "react-router-dom"
import { CardList } from "../cards/CardList"
import { CardForm } from "../cards/CardForm"
import { DeleteCard } from "../cards/Card"

export const MentorViews = () => {
	return (
        <Routes> 
            <Route path="/" element={
                <>
                    <h1 className="title--main">Welcome, Mentor, to SOL!</h1>

                    <Outlet />
                </>
            }>

                <Route path="cards" element={ <CardList/> }/>
                <Route path="card/create" element={ <CardForm /> } />
                <Route path="card/create" element={ <DeleteCard /> } />
            </Route>
        </Routes>
    )
}

/*
I WILL NEED SOMETHING LIKE THIS FOR MY CARD FORM
                <Route path="tickets" element={ <TicketList/> }/>

                <Route path="ticket/create" element={ <TicketForm /> } />



*/