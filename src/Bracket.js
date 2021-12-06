import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";

export default class Bracket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            bracket: [],
            isLoading: true,
            isModalOpen: false
        }
    }

    fetchBracketDetails(id) {
        fetch(`http://localhost:3000/api/brackets/${id}`)
            .then((response) => {
                return response.json();
            }).then((info) => {
                document.title = `${info.name}'s Bracket`
                this.setState({ info: info });
                this.setState({ bracket: info.bracket.vote });
                this.setState({ isLoading: false });
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchBracketDetails(id);
    }

    render() {
        return <div className="mt-3">
            <Link className="button" to={"/vote"}>
                Back to Vote
            </Link>
            {this.state.isLoading ? <Loader /> : <div className="app mt-3">
                <h1><strong>{this.state.info.name}'s Bracket</strong></h1>
                <div className="mt-3">Submitted on {this.state.info.date}</div>
                <div className="container mt-3">
                    <div className="row mt-5">
                        <div className="col round">
                            {this.state.bracket[0].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {this.state.bracket[1].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {this.state.bracket[2].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col my-auto">
                            {this.state.bracket[3].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {this.state.bracket[4].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {this.state.bracket[5].map((team, i) => {
                                return <div key={i}>
                                    <div className="card mb-3">
                                        {team}
                                    </div>
                                    {i % 2 === 1 ? <br></br> : <div></div>}
                                </div>
                            })}
                        </div>
                        <div className="col round">
                            {this.state.bracket[6].map((team, i) => {
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

                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                        this.setState({ isModalOpen: true });
                    }}
                >
                    Delete
                </button>

                {this.state.isModalOpen && (
                    <Modal
                        id={this.state.info.id}
                        title="Delete Confirmation"
                        body={() => {
                            return <p>Are you sure you want to delete this bracket?</p>;
                        }}
                        onClose={() => {
                            this.setState({ isModalOpen: false });
                        }}
                    />
                )}
            </div>}
        </div>
    }
}