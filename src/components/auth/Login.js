import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("ely@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("language_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Sorry Muchacho... Try something else!")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to S.O.L.!</h1>
                    <h2>Sign in por favor</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register/What is SOL?</Link>
            </section>
        </main>
    )
}

