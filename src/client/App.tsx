import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chirps from "./views/chirps";
import Edit from "./views/Edit";
import ChirpDetails from "./views/chirpdetails";
import Home from "./views/home";
import Create from "./views/Create";
import Users from "./views/users";
import UserDetails from "./views/userdetails";
import NotFound from "./views/notfound";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/chirps"
                        element={<Chirps />}
                    />
                    <Route
                        path="/chirps/:id"
                        element={<ChirpDetails />}
                    />
                    <Route
                        path="/chirps/:id/edit"
                        element={<Edit />}
                    />
                    <Route
                        path="/create"
                        element={<Create />}
                    />
                    <Route
                        path="/users"
                        element={<Users />}
                    />
                    <Route
                        path="/users/:id"
                        element={<UserDetails />}
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
