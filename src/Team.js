import React from "react";
import { Link } from "react-router-dom";

export default class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: {},
      stats: [],
      statsRanking: [],
      gameInfo: {},
      roster: []
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
        <div className="mt-3">
          <Link className="button" to={"/teams"}>
            Back to Teams
          </Link>
          <div className="app">
            <h1>
              <strong>{this.state.team.name}</strong>
            </h1>
            {this.state.team.id !== undefined ? 
              (<div><img src={`/images/${this.state.team.id}.png`} alt="logo" height="150"/></div>)
              : 
              (<div></div>)
            }
          </div>
        </div>

        <div className="scroll-table mt-5">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {Object.keys(this.state.stats).map((splits, h) => {
                  return (
                    <th key={h} scope="col">
                      {splits}
                    </th>
                  );
                })}
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
              Upcoming Game
              <div className="card container mt-3">
                <div className="row">
                  <div className="col mt-3">
                    <Link to={`/teams/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}`}>
                      <div className="mb-3"><strong>{this.state.gameInfo.dates[0].games[0].teams.away.team.name}</strong></div>
                      <img src={`/images/${this.state.gameInfo.dates[0].games[0].teams.away.team.id}.png`} alt="logo" height="150"></img>
                    </Link>
                    {/* <div><strong>{this.state.gameInfo.dates[0].games[0].teams.away.team.name}</strong></div> */}
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
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roster.map((player) => {
                return (
                  <tr key={player.person.id}>
                    <td>{player.jerseyNumber}</td>
                    <td>
                      <Link
                        to={`/teams/${this.props.match.params.id}/${player.person.id}`}
                      >
                        {player.person.fullName}
                      </Link>
                    </td>
                    <td>{player.position.code}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
