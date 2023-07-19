import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-primary p-2 d-flex">
            <NavLink
                to={"/"}
                className="btn btn-success m-2 text-white"
                end
            >
                Home
            </NavLink>
            <NavLink
                to={"/chirps"}
                className="btn btn-success m-2 text-white"
                end
            >
                Chirps
            </NavLink>
            <NavLink
                to={"/users"}
                className="btn btn-success m-2 text-white"
                end
            >
                Users
            </NavLink>
            <NavLink
                to={"/create"}
                className="btn btn-success m-2 text-white"
                end
            >
                New Chirp
            </NavLink>
        </div>
    );
};

export default Navbar;
