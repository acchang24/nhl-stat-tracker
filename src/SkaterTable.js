import React from "react";
import { Link } from "react-router-dom";


export default class SkaterTable extends React.Component {
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
                <th title="Goals Scored" scope="col">
                  G
                </th>
                <th title="Assists Scored" scope="col">
                  A
                </th>
                <th title="Points Scored" scope="col">
                  P
                </th>
                <th title="Goal Differential" scope="col">
                  +/-
                </th>
                <th title="Penalty in Minutes" scope="col">
                  PIM
                </th>
                <th title="Power Play Goals" scope="col">
                  PPG
                </th>
                <th title="Power Play Points" scope="col">
                  PPP
                </th>
                <th title="Short Handed Goals" scope="col">
                  SHG
                </th>
                <th title="Short Handed Points" scope="col">
                  SHP
                </th>
                <th title="Game Winning Goals" scope="col">
                  GWG
                </th>
                <th title="Overtime Goals" scope="col">
                  OTG
                </th>
                <th title="Shots on Goal" scope="col">
                  S
                </th>
                <th title="Faceoff Win Percentage" scope="col">
                  FO%
                </th>
                <th title="Time On Ice" scope="col">
                  TOI
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
                    <td>{season.stat.goals}</td>
                    <td>{season.stat.assists}</td>
                    <td>{season.stat.points}</td>
                    <td>{season.stat.plusMinus}</td>
                    <td>{season.stat.penaltyMinutes}</td>
                    <td>{season.stat.powerPlayGoals}</td>
                    <td>{season.stat.powerPlayPoints}</td>
                    <td>{season.stat.shortHandedGoals}</td>
                    <td>{season.stat.shortHandedPoints}</td>
                    <td>{season.stat.gameWinningGoals}</td>
                    <td>{season.stat.overTimeGoals}</td>
                    <td>{season.stat.shots}</td>
                    <td>{season.stat.faceOffPct}</td>
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
