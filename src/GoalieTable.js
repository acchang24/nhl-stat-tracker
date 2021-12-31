import React from "react";
import { Link } from "react-router-dom";

export default class GoalieTable extends React.Component {
  render() {
    return (
      <div>
        <div className="scroll-table">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th title="Season" scope="col">
                  Season
                </th>
                <th title="Team" scope="col">
                  Team
                </th>
                <th title="Games Played" scope="col">
                  GP
                </th>
                <th title="Games Started" scope="col">
                  GS
                </th>
                <th title="Wins" scope="col">
                  W
                </th>
                <th title="Losses" scope="col">
                  L
                </th>
                <th title="Overtime Losses" scope="col">
                  OT
                </th>
                <th title="Shots Against" scope="col">
                  SA
                </th>
                <th title="Goals Against" scope="col">
                  GA
                </th>
                <th title="Goals Against Average" scope="col">
                  GAA
                </th>
                <th title="Saves" scope="col">
                  S
                </th>
                <th title="Save Percentage" scope="col">
                  SV%
                </th>
                <th title="Shutouts" scope="col">
                  SO
                </th>
                <th title="Minutes Played" scope="col">
                  MIN
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.careerStats.map((season, i) => {
                return season.league.name === "National Hockey League" ? (
                  <tr key={i}>
                    <td>
                      {season.season.slice(0, 4)}
                      {" - "}
                      {season.season.slice(4)}
                    </td>
                    <td>
                      <Link to={`/teams/${season.team.id}`}>
                        {season.team.name}
                      </Link>
                    </td>
                    <td>{season.stat.games}</td>
                    <td>{season.stat.gamesStarted}</td>
                    <td>{season.stat.wins}</td>
                    <td>{season.stat.losses}</td>
                    <td>{season.stat.ot}</td>
                    <td>{season.stat.shotsAgainst}</td>
                    <td>{season.stat.goalsAgainst}</td>
                    <td>{season.stat.goalAgainstAverage}</td>
                    <td>{season.stat.saves}</td>
                    <td>{season.stat.savePercentage}</td>
                    <td>{season.stat.shutouts}</td>
                    <td>{season.stat.timeOnIce}</td>
                  </tr>
                ) : (
                  <tr key={i}></tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
