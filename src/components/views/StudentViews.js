//will only see view cards
import { Outlet, Route, Routes } from "react-router-dom"
import { CardList } from "../cards/CardList"


export const StudentViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title--main">Welcome, Student, to SOL!</h1>

                    <Outlet />
                </>
            }>
                                    
                <Route path="cards" element={ <CardList/> }/>
            </Route>
        </Routes>
    )
}