import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesToday: {},
      gamesList: [],
      currDate: ""
    };
  }

  fetchGamesToday() {
    fetch("https://statsapi.web.nhl.com/api/v1/schedule")
      .then((results) => {
        return results.json();
      })
      .then((games) => {
        this.setState({ gamesToday: games });

        if (this.state.gamesToday.totalGames > 0) {
          this.setState({ gamesList: games.dates[0].games });
          this.setState({ currDate: games.dates[0].date });
        }
      });
  }

  componentDidMount() {
    this.fetchGamesToday();
  }

  render() {
    return (
      
      <div className="container mt-5">
        <div className="app">
          <h1>
            <strong>National Hockey League Stat Tracker</strong>
          </h1>
        </div>
        <div className="mb-3">
          <h2 className="mt-5 app">Games for Today: {this.state.currDate}</h2>
          
          {this.state.gamesToday.totalGames > 0 ? (
            <div>
              {this.state.gamesList.map((game, i) => {
                return (
                  <div className="card container mt-3" key={i}>
                    <div className="row">
                      <div className="col">
                        <div><strong>{game.teams.away.team.name}</strong></div>
                        <img src={`./images/${game.teams.away.team.id}.png`} alt="logo" height="150"></img>
                        <div><h1><strong>{game.teams.away.score}</strong></h1></div>
                      </div>
                      <div className="col my-auto">
                        <div><h1><strong>@</strong></h1></div>
                        <div>
                          <strong>{game.status.abstractGameState}</strong>
                        </div>
                      </div>
                      
                      <div className="col">
                      <div><strong>{game.teams.home.team.name}</strong></div>
                        <img src={`./images/${game.teams.home.team.id}.png`} alt="logo" height="150"></img>
                        <div><h1><strong>{game.teams.home.score}</strong></h1></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-3 card">No Games Today</div>
          )}
        </div>
      </div>
    );
  }
}