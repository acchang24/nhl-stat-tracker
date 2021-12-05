import React from "react";
import { Link } from "react-router-dom";
import SkaterTable from "./SkaterTable";
import GoalieTable from "./GoalieTable";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      position: {},
      team: {},
      careerStats: []
    };
  }

  fetchPlayer(id) {
    fetch(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((player) => {
        this.setState({ player: player.people[0] });
        this.setState({ position: player.people[0].primaryPosition });
        this.setState({ team: player.people[0].currentTeam });
      });
  }

  fetchStats(id) {
    fetch(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats/?stats=yearByYear`
    )
      .then((result) => {
        return result.json();
      })
      .then((stats) => {
        this.setState({ careerStats: stats.stats[0].splits });
      });
  }

  componentDidMount() {
    const playerId = this.props.match.params.player;
    this.fetchPlayer(playerId);
    this.fetchStats(playerId);
  }

  render() {
    document.title = this.state.player.fullName;
    let spacing = " | ";
    return (
      <div>
        <div className="mt-3">
          <Link className="button" to={`/teams/${this.props.match.params.id}`}>
            Back to Team Page
          </Link>
        </div>
        <div className="app">
          <h1>
            <strong>
              {this.state.player.fullName +
                " | # " +
                this.state.player.primaryNumber}
            </strong>
          </h1>
          <div>
            {this.state.position.code === "L" || this.state.position.code === "R" 
              ? this.state.position.code + "W" 
              : this.state.position.code}
            {spacing}
            {this.state.player.height}
            {spacing}
            {this.state.player.weight}
            {" lbs | Age: "}
            {this.state.player.currentAge}
            {spacing}
            {this.state.position.code !== "G"
              ? `Shoots: ${this.state.player.shootsCatches}`
              : `Catches: ${this.state.player.shootsCatches}`}
            {spacing}
            {this.state.team.name}
          </div>
          <div className="mt-3">
            {`Born: ${this.state.player.birthDate} | `}{" "}
            {`Birthplace: ${this.state.player.birthCity}`}
            {this.state.player.birthStateProvince !== undefined
              ? ", " + this.state.player.birthStateProvince + ", "
              : ", "}
            {this.state.player.birthCountry}
          </div>

          <div className="mt-5">
            <h2>Career Stats</h2>

            {this.state.position.code !== "G" ? (
              <SkaterTable
                position={this.state.position}
                team={this.state.team}
                careerStats={this.state.careerStats}
              />
            ) : (
              <GoalieTable
                position={this.state.position}
                team={this.state.team}
                careerStats={this.state.careerStats}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
