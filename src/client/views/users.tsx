import * as React from "react";
import { useEffect, useState } from "react";
import { Users } from "../../types";
import { GET } from "../services/fetch-helper";
import UserCard from "../components/UserCard";

const Users = () => {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        GET("api/users").then(setUsers);
    }, []);

    return (
        <div className="row justify-content-center">
            {users.map((users) => (
                <UserCard
                    user={users}
                    key={`users-card-${users.id}`}
                />
            ))}
        </div>
    );
};

export default Users;
