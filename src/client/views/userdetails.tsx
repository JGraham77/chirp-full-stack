import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Users } from "../../types";
import { GET } from "../services/fetch-helper";
import UserCard from "../components/UserCard";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState<Users>();

    useEffect(() => {
        GET(`/api/users/${id}`).then(setUser);
    }, [id]);

    return (
        <div className="row justify-content-center">
            <h1 className="d-flex justify-content-center pt-2">User #{id}</h1>
            {user && (
                <UserCard
                    isDetails
                    user={user}
                />
            )}
        </div>
    );
};

export default UserDetails;
