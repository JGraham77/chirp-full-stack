import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DELETE, GET, PUT } from "../services/fetch-helper";
import Swal from "sweetalert2";

const Edit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        GET(`/api/chirps/${id}`).then((chirp) => {
            setContent(chirp.content);
            setUsername(chirp.username);
        });
    }, []);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            icon: "question",
            title: "Hello",
            html: `<p>Are you sure you want to delete this chirp? Type out '${username}'</p><input type="text" id="username" class="swal2-input" placeholder="${username}">`,
            preConfirm: () => {
                //@ts-ignore
                const results = Swal.getPopup()?.querySelector("#username")?.value;
                if (!results) {
                    Swal.fire("Will not delete.");
                    return;
                }
                return { username: results };
            },
            showConfirmButton: true,
            showDenyButton: true,
        }).then((results) => {
            if (results.value?.username === username) {
                DELETE(`/api/chirps/${id}`).then((data) => Swal.fire(data.message));
                nav("/chirps");
            } else {
                Swal.fire("Will not delete.");
            }
        });
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        PUT(`/api/chirps/${id}`, { content }).then((data) => {
            Swal.fire(data.message);
            nav(`/chirps/${id}`);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9">
                <h1 className="text-center">Editing "{username}'s chirp</h1>
                <form className="p-3 shadow-lg rounded-3 bg-light">
                    <label htmlFor="">Content ({content.length}/250)</label>
                    <textarea
                        className={`form-control ${content.length === 251 ? "bg-danger" : "bg-white"}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={250}
                    />
                    <div className="d-flex justify-content-between p-2">
                        <button
                            onClick={handleUpdate}
                            className="btn btn-success"
                        >
                            Save Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
