import { Query } from "..";
import { Users } from "../../../types";

const getAllUsers = () =>
Query<Users[]>('select * from users');

const getOneUser = (id: number) =>
Query<Users[]>('select * from users where id=?', [id]);

const createUser = (newUser: Users) => Query("INSERT INTO users set ?", [newUser]);

const update = (id: number, email: string) => Query('UPDATE users SET email=? WHERE id=?', [email, id]);

const destroy = (id: number) => Query("DELETE FROM users WHERE id=?", [id]);

const searchByName = (name: Users['name']) => Query<Users[]>('SELECT * FROM Users WHERE name=?', [name]);

export default {
    getAllUsers,
    createUser,
    update,
    destroy,
    getOneUser,
    searchByName
};