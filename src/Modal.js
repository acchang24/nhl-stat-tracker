import React from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bracket: {}
        }
    }

    deleteBracket() {
        fetch(`https://acchang24-nhl-brackets-api.herokuapp.com/api/brackets/${this.props.id}`, {
            method: "DELETE"
        }).then((json) => {
            toast.success(`Your Bracket was deleted`);
            
            this.props.history.push("/vote");
        });
    }

    render() {
        const modalContainer = document.getElementById("modal-container");

        return ReactDom.createPortal(
            <div className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={this.props.onClose}
                            ></button>
                        </div>
                        <div className="modal-body">{this.props.body()}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={() => {
                                this.deleteBracket();
                            }}>Delete</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.props.onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>,
            modalContainer
        );
    }
}

export default withRouter(Modal);