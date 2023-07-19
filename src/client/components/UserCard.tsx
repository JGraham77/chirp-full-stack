import * as React from "react";
import { Users } from "../../types";
import { Link } from "react-router-dom";

const UserCard = ({ user, isDetails }: { user: Users; isDetails?: boolean }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className="card shadow-lg">
                <div className="card-title">
                    <div className="card-header bg-white display-6">{user.name}</div>
                </div>
                <div className="card-body">
                    <p className="text-muted">{user.email}</p>
                    {!isDetails && (
                        <Link
                            className="btn btn-primary"
                            to={`/users/${user.id}`}
                        >
                            User {user.id}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
