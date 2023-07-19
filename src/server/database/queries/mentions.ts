import { Query } from "..";
import { Mentions } from "../../../types";

const createMention = (userid: Mentions['userid'], chirpid: Mentions['chirpid']) => Query('INSERT INTO Mentions (chirpid, userid) VALUES (?, ?)', [chirpid, userid]);

const destroyByChirpId = (chirpid: Mentions['chirpid']) => Query('DELETE FROM Mentions WHERE chirpid=?', [chirpid]);

export default {
    createMention,
    destroyByChirpId
};