import React from "react";
import { Link } from "react-router-dom";
import RosterTable from "./RosterTable";
import Loader from "./Loader";

export default class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: {},
      stats: [],
      statsRanking: [],
      gameInfo: {},
      roster: [],
      isLoading: true,
    };
  }

  fetchTeamStats(id) {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.stats`)
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        this.setState({ team: json.teams[0] });
        this.setState({ stats: this.state.team.teamStats[0].splits[0].stat });
        this.setState({
          statsRanking: this.state.team.teamStats[0].splits[1].stat
        });
        this.setState({ isLoading: false });
      });
  }

  fetchNextGame(id) {
    fetch(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.schedule.next`
    )
      .then((response) => {
        return response.json();
      })
      .then((game) => {
        this.setState({
          gameInfo: game.teams[0].nextGameSchedule
        });
        this.setState({ isLoading: false });
      });
  }

  fetchRoster(id) {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.roster`)
      .then((response) => {
        return response.json();
      })
      .then((players) => {
        this.setState({
          roster: players.teams[0].roster.roster
        });
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    const teamId = this.props.match.params.id;


    this.fetchTeamStats(teamId);
    this.fetchNextGame(teamId);
    this.fetchRoster(teamId);
  }

  render() {
    document.title = this.state.team.name;
    return (
      <div>
        {this.state.isLoading ? <Loader /> : <div>
          <div className="mt-3">
            <Link className="button" to={"/teams"}>
              Back to Teams
            </Link>
            <div className="app">
              <h1>
                <strong>{this.state.team.name}</strong>
              </h1>
              {this.state.team.id !== undefined ?
                (<div><img src={`/images/${this.state.team.id}.png`} alt="logo" height="150" /></div>)
                :
                (<div></div>)
              }
            </div>
          </div>

          <div className="scroll-table mt-5">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th title="Games Played" scope="col">GP</th>
                  <th title="Wins" scope="col">W</th>
                  <th title="Losses" scope="col">L</th>
                  <th title="Overtime Losses" scope="col">OT</th>
                  <th title="Points" scope="col">P</th>
                  <th title="Points Percentage" scope="col">P%</th>
                  <th title="Goals For Per Game" scope="col">GF/GP</th>
                  <th title="Goals Against Per Game" scope="col">GA/GP</th>
                  <th>EVGGARatio</th>
                  <th title="Power Play Percentage" scope="col">PP%</th>
                  <th title="Power Play Goals" scope="col">PPG</th>
                  <th title="Power Play Goals Against" scope="col">PPGA</th>
                  <th title="Power Play Opporunities" scope="col">PP</th>
                  <th title="Penalty Kill Percentage" scope="col">PK%</th>
                  <th title="Shots Per Game" scope="col">SPG</th>
                  <th title="Shots Allowed" scope="col">SA</th>
                  <th title="Win Score First" scope="col">WSF</th>
                  <th title="Win Opponent Score First" scope="col">WOSF</th>
                  <th title="Win Leading First Period" scope="col">WLFP</th>
                  <th title="Win Leading Second Period" scope="col">WLSP</th>
                  <th title="Win Outshoot Opponent" scope="col">WOO</th>
                  <th title="Win OutShot By Opponent" scope="col">WOBO</th>
                  <th title="Faceoffs Taken" scope="col">FOT</th>
                  <th title="Faceoffs Won" scope="col">FOW</th>
                  <th title="Faceoffs Lost" scope="col">FOL</th>
                  <th title="Faceoff Percentage" scope="col">FO%</th>
                  <th title="Shooting Percentage" scope="col">S%</th>
                  <th title="Save Percentage" scope="col">SV%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.keys(this.state.stats).map((splits, i) => {
                    return <td key={i}>{this.state.stats[splits]}</td>;
                  })}
                </tr>
                <tr>
                  {Object.keys(this.state.statsRanking).map((splits, j) => {
                    return <td key={j}>{this.state.statsRanking[splits]}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="app mt-5">
            {this.state.gameInfo.metaData !== undefined ? (
              <div>
                <strong>Upcoming Game</strong>
                <div className="card container mt-3">
                  <div className="row">
                    <div className="col mt-3">
                      <Link to={`/teams/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}`}>
                        <div className="mb-3"><strong>{this.state.gameInfo.dates[0].games[0].teams.away.team.name}</strong></div>
                        <img src={`/images/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}.png`} alt="logo" height="150"></img>
                      </Link>
                      <div className="mt-3"><h1><strong>{this.state.gameInfo.dates[0].games[0].teams.away.score}</strong></h1></div>
                    </div>
                    <div className="col my-auto">
                      <div><h1><strong>@</strong></h1></div>
                      <div>
                        <strong>{this.state.gameInfo.dates[0].games[0].status
                          .abstractGameState}</strong>
                        <div>{this.state.gameInfo.dates[0].date}</div>
                      </div>
                    </div>

                    <div className="col mt-3">
                      <Link to={`/teams/${this.state.gameInfo.dates[0].games[0].teams.home.team.id}`}>
                        <div className="mb-3"><strong>{this.state.gameInfo.dates[0].games[0].teams.home.team.name}</strong></div>
                        <img src={`/images/${this.state.gameInfo.dates[0].games[0].teams.home.team.id}.png`} alt="logo" height="150"></img>
                      </Link>
                      <div className="mt-3"><h1><strong>{this.state.gameInfo.dates[0].games[0].teams.home.score}</strong></h1></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="app mt-5">
            <h2>Roster</h2>
            <RosterTable roster={this.state.roster} id={this.props.match.params.id} />
          </div>
        </div>}
        {/* <div className="mt-3">
          <Link className="button" to={"/teams"}>
            Back to Teams
          </Link>
          <div className="app">
            <h1>
              <strong>{this.state.team.name}</strong>
            </h1>
            {this.state.team.id !== undefined ?
              (<div><img src={`/images/${this.state.team.id}.png`} alt="logo" height="150" /></div>)
              :
              (<div></div>)
            }
          </div>
        </div>

        <div className="scroll-table mt-5">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th title="Games Played" scope="col">GP</th>
                <th title="Wins" scope="col">W</th>
                <th title="Losses" scope="col">L</th>
                <th title="Overtime Losses" scope="col">OT</th>
                <th title="Points" scope="col">P</th>
                <th title="Points Percentage" scope="col">P%</th>
                <th title="Goals For Per Game" scope="col">GF/GP</th>
                <th title="Goals Against Per Game" scope="col">GA/GP</th>
                <th>EVGGARatio</th>
                <th title="Power Play Percentage" scope="col">PP%</th>
                <th title="Power Play Goals" scope="col">PPG</th>
                <th title="Power Play Goals Against" scope="col">PPGA</th>
                <th title="Power Play Opporunities" scope="col">PP</th>
                <th title="Penalty Kill Percentage" scope="col">PK%</th>
                <th title="Shots Per Game" scope="col">SPG</th>
                <th title="Shots Allowed" scope="col">SA</th>
                <th title="Win Score First" scope="col">WSF</th>
                <th title="Win Opponent Score First" scope="col">WOSF</th>
                <th title="Win Leading First Period" scope="col">WLFP</th>
                <th title="Win Leading Second Period" scope="col">WLSP</th>
                <th title="Win Outshoot Opponent" scope="col">WOO</th>
                <th title="Win OutShot By Opponent" scope="col">WOBO</th>
                <th title="Faceoffs Taken" scope="col">FOT</th>
                <th title="Faceoffs Won" scope="col">FOW</th>
                <th title="Faceoffs Lost" scope="col">FOL</th>
                <th title="Faceoff Percentage" scope="col">FO%</th>
                <th title="Shooting Percentage" scope="col">S%</th>
                <th title="Save Percentage" scope="col">SV%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(this.state.stats).map((splits, i) => {
                  return <td key={i}>{this.state.stats[splits]}</td>;
                })}
              </tr>
              <tr>
                {Object.keys(this.state.statsRanking).map((splits, j) => {
                  return <td key={j}>{this.state.statsRanking[splits]}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="app mt-5">
          {this.state.gameInfo.metaData !== undefined ? (
            <div>
              <strong>Upcoming Game</strong>
              <div className="card container mt-3">
                <div className="row">
                  <div className="col mt-3">
                    <Link to={`/teams/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}`}>
                      <div className="mb-3"><strong>{this.state.gameInfo.dates[0].games[0].teams.away.team.name}</strong></div>
                      <img src={`/images/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}.png`} alt="logo" height="150"></img>
                    </Link>
                    <div className="mt-3"><h1><strong>{this.state.gameInfo.dates[0].games[0].teams.away.score}</strong></h1></div>
                  </div>
                  <div className="col my-auto">
                    <div><h1><strong>@</strong></h1></div>
                    <div>
                      <strong>{this.state.gameInfo.dates[0].games[0].status
                        .abstractGameState}</strong>
                      <div>{this.state.gameInfo.dates[0].date}</div>
                    </div>
                  </div>

                  <div className="col mt-3">
                    <Link to={`/teams/${this.state.gameInfo.dates[0].games[0].teams.home.team.id}`}>
                      <div className="mb-3"><strong>{this.state.gameInfo.dates[0].games[0].teams.home.team.name}</strong></div>
                      <img src={`/images/${this.state.gameInfo.dates[0].games[0].teams.home.team.id}.png`} alt="logo" height="150"></img>
                    </Link>
                    <div className="mt-3"><h1><strong>{this.state.gameInfo.dates[0].games[0].teams.home.score}</strong></h1></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="app mt-5">
          <h2>Roster</h2>
          <RosterTable roster={this.state.roster} id={this.props.match.params.id} />
        </div> */}
      </div>
    );
  }
}
