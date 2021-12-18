import React from "react";
import LiveGameStatus from "./LiveGameStatus";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesToday: {},
      gamesList: [],
      currDate: "",
      loading: true,
    };
  }

  getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    return today;
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
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.fetchGamesToday();
  }

  render() {
    document.title = "Home";
    return (
      <div className="container mt-5">
        <div className="app">
          <h1>
            <strong>National Hockey League Stat Tracker</strong>
          </h1>
        </div>
        <div className="mb-3">
          <h2 className="mt-5 app">Games for Today: {this.getDate()}</h2>

          {this.state.loading ?
            <Loader />
            :
            this.state.gamesToday.totalGames > 0 ? (
              <div>
                {this.state.gamesList.map((game, i) => {
                  return (
                    <div className="card container mt-3" key={i}>
                      <div className="row">
                        <div className="col mt-3">
                          <Link to={`/teams/${game.teams.away.team.id}`}>
                            <div className="mb-3"><strong>{game.teams.away.team.name}</strong></div>
                            <img src={`./images/${game.teams.away.team.id}.png`} alt="logo" height="150"></img>
                          </Link>
                          <div className="mt-3"><h1><strong>{game.teams.away.score}</strong></h1></div>
                        </div>
                        <div className="col my-auto">
                          <div><h1><strong>@</strong></h1></div>
                          <div>
                            {game.status.abstractGameState === "Live" ?
                              <div>
                                <strong>{game.status.abstractGameState}</strong>
                                <LiveGameStatus link={game.link}/>
                              </div>
                              :
                              <strong>{game.status.abstractGameState}</strong>}
                          </div>
                        </div>

                        <div className="col mt-3">
                          <Link to={`/teams/${game.teams.home.team.id}`}>
                            <div className="mb-3"><strong>{game.teams.home.team.name}</strong></div>
                            <img src={`./images/${game.teams.home.team.id}.png`} alt="logo" height="150"></img>
                          </Link>
                          <div className="mt-3"><h1><strong>{game.teams.home.score}</strong></h1></div>
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
