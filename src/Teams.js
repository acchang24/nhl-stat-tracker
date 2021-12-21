import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamStandings: [],
      isLoading: true,
    };
  }

  fetchStandings() {
    fetch("https://statsapi.web.nhl.com/api/v1/standings")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ teamStandings: json.records });
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.fetchStandings();
  }

  render() {
    document.title = "Teams";
    return (
      <div className="container mt-5 mb-3 app">
        {this.state.isLoading ? <Loader /> : <div><h1>
          <strong>Standings</strong>
        </h1>
          <div className="row">
            {this.state.teamStandings.map((divisions, i) => {
              return (
                <div key={i} className="col-12 col-md-6 col-lg-6 mt-3">
                  <h4 className="mt-3">{divisions.division.name} Division</h4>
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" title="Standing">#</th>
                        <th scope="col" title="Team Name" colSpan={2}>Team</th>
                        <th scope="col" title="Games Played">GP</th>
                        <th scope="col" title="Wins">W</th>
                        <th scope="col" title="Losses">L</th>
                        <th scope="col" title="Overtime Losses">OT</th>
                        <th scope="col" title="Points">PTS</th>
                      </tr>
                    </thead>
                    {divisions.teamRecords.map((teams, j) => {
                      return (
                        <tbody key={j}>
                          <tr>
                            <td>{teams.divisionRank}</td>
                            <td>
                              <Link to={`/teams/${teams.team.id}`}>
                                <img src={`./images/${teams.team.id}.png`} height="25" width="25" alt="logo"></img>
                              </Link>
                            </td>
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
          </div></div>}
      </div>
    );
  }
}
