import * as React from "react";
import { useEffect, useState } from "react";
import { ChirpsWithUsers } from "../../types";
import { GET } from "../services/fetch-helper";
import ChirpCard from "../components/ChirpCard";

const Chirps = () => {
    const [chirps, setChirps] = useState<ChirpsWithUsers[]>([]);

    useEffect(() => {
        GET("/api/chirps").then(setChirps);
    }, []);

    return (
        <div className="row justify-content-center">
            {chirps.map((chirp) => (
                <ChirpCard chirp={chirp} key={`chirp-card-${chirp.id}`} />
            ))}
        </div>
    );
};

export default Chirps;
