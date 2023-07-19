import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChirpsWithUsers } from "../../types";
import { GET } from "../services/fetch-helper";
import ChirpCard from "../components/ChirpCard";

const ChirpDetails = () => {
    const { id } = useParams();
    const [chirp, setChirp] = useState<ChirpsWithUsers>();

    useEffect(() => {
        GET(`/api/chirps/${id}`).then(setChirp);
    }, [id]);

    return (
        <div className="row justify-content-center">
            <h1 className="d-flex justify-content-center pt-2">Chirp #{id}</h1>
            {chirp && (
                <ChirpCard
                    isDetails
                    chirp={chirp}
                />
            )}
        </div>
    );
};

export default ChirpDetails;
