import React from "react";

export default class LiveGameStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linescore: {},
      status: "",
    };
  }

  componentDidMount() {
    const link = this.props.link;
    this.setState({ status: this.props.status });
    fetch(`https://statsapi.web.nhl.com${link}`)
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        this.setState({ linescore: json.liveData.linescore });
      });
  }

  render() {
    return (
      <div>
        <strong>
          <div>
            {this.state.status === "Final"
              ? this.state.linescore.currentPeriodOrdinal === "3rd"
                ? "Final"
                : this.state.linescore.currentPeriodOrdinal
              : this.state.linescore.currentPeriodOrdinal +
                ": " +
                this.state.linescore.currentPeriodTimeRemaining}
          </div>
        </strong>
      </div>
    );
  }
}
