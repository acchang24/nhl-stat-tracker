import React, { useEffect, useState } from "react"
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";
import { useAuth0 } from "@auth0/auth0-react";

export default function Bracket(props) {

    const [info, setInfo] = useState({});
    const [bracket, setBracket] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuth0();

    useEffect(() => {
        fetch(`https://acchang24-nhl-brackets-api.herokuapp.com/api/brackets/${props.match.params.id}`)
            .then((response) => {
                return response.json();
            }).then((info) => {
                document.title = `${info.name}'s Bracket`
                setInfo(info);
                setBracket(info.bracket.vote);
                setIsLoading(false);
            })
    }, [props.match.params.id]);

    return <div>
        {isLoading ? <Loader /> : <div className="mt-3">
            <Link className="button" to={"/vote"}>
                Back to Vote
            </Link>
            {isLoading ? <Loader /> : <div className="app mt-3">
                <h1><strong>{info.name}'s Bracket</strong></h1>
                <div className="mt-3">Submitted on {info.date}</div>
                <div className="container mt-3">
                    <div className="row mt-5">
                        <div className="col round">
                            {bracket[0].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {bracket[1].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {bracket[2].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col my-auto">
                            {bracket[3].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {bracket[4].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {bracket[5].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {bracket[6].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                {user !== undefined &&
                    <div>
                        {info.userid === user.sub ?
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            >
                                Delete
                            </button>
                            : <></>}
                    </div>
                }

                {isModalOpen && (
                    <Modal
                        id={info.id}
                        title="Delete Confirmation"
                        body={() => {
                            return <p>Are you sure you want to delete this bracket?</p>;
                        }}
                        onClose={() => {
                            setIsModalOpen(false);
                        }}
                    />
                )}
            </div>}
        </div>}

    </div>
}