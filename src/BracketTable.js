import React from "react"
import { Link } from "react-router-dom";

export default class BracketTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brackets: [],
        }
    }

    fetchBrackets() {
        fetch("https://acchang24-nhl-brackets-api.herokuapp.com/api/brackets")
            .then((response) => {
                return response.json();
            }).then((brackets) => {
                this.setState({ brackets: brackets });
            })
    }

    componentDidMount() {
        this.fetchBrackets();
    }

    render() {
        return <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th title="Name" scope="col">Name</th>
                        <th title="Date" scope="col">Submission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.brackets.map((entry, i) => {
                        return <tr key={i}>
                            <td><Link to={`/vote/${entry.id}`}>{entry.name}</Link></td>
                            <td>{entry.date}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
}