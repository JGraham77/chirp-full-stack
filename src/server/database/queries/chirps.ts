import { Query } from "..";
import { Chirps, ChirpsWithUsers } from "../../../types";


const getAllChirps = () => 
Query<ChirpsWithUsers[]>(
    'select c.id, c.content, u.name as "username" from chirps c join users u on u.id=c.userid'
    );


const getOneChirp = (id: number) => 
Query<ChirpsWithUsers[]>(
    'select c.id, c.content, u.name as "username" from chirps c join users u on u.id=c.userid where c.id=?', [id]
    );

const createChirp = (newChirp: Chirps) => Query("INSERT INTO chirps set ?", [newChirp]);

const update = (id: number, content: string) => Query('UPDATE chirps SET content=? WHERE id=?', [content, id]);

const destroy = (id: number) => Query("DELETE FROM chirps WHERE id=?", [id]);


export default {
    getAllChirps,
    getOneChirp,
    createChirp,
    update,
    destroy,
}