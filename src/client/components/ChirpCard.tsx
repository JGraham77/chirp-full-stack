import * as React from "react";
import { ChirpsWithUsers } from "../../types";
import { Link } from "react-router-dom";

const ChirpCard = ({ chirp, isDetails }: { chirp: ChirpsWithUsers; isDetails?: boolean }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className="card shadow-lg">
                <div className="card-title">
                    <div className="card-header bg-white display-6">{chirp.username}</div>
                </div>
                <div className="card-body">
                    <p className="text-muted">{chirp.content}</p>
                    {!isDetails && (
                        <Link className="btn btn-primary" to={`/chirps/${chirp.id}`}>
                            Chirp {chirp.id}
                        </Link>
                    )}
                    {isDetails && (
                        <Link className="btn btn-warning" to={`/chirps/${chirp.id}/edit`}>
                            Edit or Delete Chirp #{chirp.id}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChirpCard;
