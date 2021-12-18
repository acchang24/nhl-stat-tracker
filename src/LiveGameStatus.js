import React from "react";

export default class LiveGameStatus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            linescore: {},
        }
    }

    componentDidMount() {
        const link = this.props.link;
        fetch(`https://statsapi.web.nhl.com${link}`)
            .then((results) => {
                return results.json();
            }).then((json) => {
                this.setState({ linescore: json.liveData.linescore });
            })
    }

    render() {
        return <div>
            <strong>
                <div>
                    {this.state.linescore.currentPeriodOrdinal}: {this.state.linescore.currentPeriodTimeRemaining}
                </div>
            </strong>
        </div>
    }
}