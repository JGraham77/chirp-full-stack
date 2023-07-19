import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET, POST } from "../services/fetch-helper";
import Swal from "sweetalert2";
import { Users } from "../../types";

const Create = () => {
    const nav = useNavigate();
    const [content, setContent] = useState("");
    const [users, setUsers] = useState<Users[]>([]);
    const [userid, setUserid] = useState("");

    useEffect(() => {
        GET(`/api/users`).then((users) => {
            setUsers(users);
            setUserid(users[0].id);
        });
    }, []);

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        POST(`/api/chirps`, { userid, content }).then((data) => {
            Swal.fire(data.message);
            nav(`/chirps`);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9">
                <h1 className="text-center">Add a New Chirp</h1>
                <form className="p-3 shadow-lg rounded-3 bg-light">
                    <label htmlFor="username">Select Your Username</label>
                    <select
                        name="username"
                        defaultValue={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        id="username"
                        className="form-control"
                    >
                        {users.map((user) => (
                            <option
                                key={`user-id-${user.id}`}
                                value={user.id}
                            >
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="content">Content ({content.length}/250)</label>
                    <textarea
                        className={`form-control ${content.length === 251 ? "bg-danger" : "bg-white"}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        maxLength={250}
                    />
                    <div className="p-2">
                        <button
                            onClick={handleCreate}
                            className="btn btn-primary"
                        >
                            Chirp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
