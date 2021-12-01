import React from "react";
import { Link } from "react-router-dom";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamStandings: []
    };
  }

  fetchStandings() {
    fetch("https://statsapi.web.nhl.com/api/v1/standings")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ teamStandings: json.records });
      });
  }

  componentDidMount() {
    this.fetchStandings();
  }

  render() {
    return (
      <div className="container mt-5 mb-3 app">
        <h1>
          <strong>Standings</strong>
        </h1>
        <div className="row">
          {this.state.teamStandings.map((divisions, i) => {
            return (
              <div key={i} className="col-12 col-md-6 col-lg-6 card">
                <h4 className="mt-3">{divisions.division.name} Division</h4>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Team</th>
                      <th scope="col">GP</th>
                      <th scope="col">W</th>
                      <th scope="col">L</th>
                      <th scope="col">OT</th>
                      <th scope="col">PTS</th>
                    </tr>
                  </thead>
                  {divisions.teamRecords.map((teams, j) => {
                    return (
                      <tbody key={j}>
                        <tr>
                          <td>{teams.divisionRank}</td>
                          <td>
                            <Link to={`/teams/${teams.team.id}`}>
                              {teams.team.name}
                            </Link>
                          </td>
                          <td>{teams.gamesPlayed}</td>
                          <td>{teams.leagueRecord.wins}</td>
                          <td>{teams.leagueRecord.losses}</td>
                          <td>{teams.leagueRecord.ot}</td>
                          <td>{teams.points}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
