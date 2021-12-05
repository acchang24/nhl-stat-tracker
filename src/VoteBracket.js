import React from "react"

export default class VoteBracket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            westList: [],
            eastList: [],
            wList: [],
            eList: [],
            cen1: "",
            cen2: "",
            pac1: "",
            pac2: "",
            wConf1: "",
            wConf2: "",
            met1: "",
            met2: "",
            atl1: "",
            atl2: "",
            eConf1: "",
            eConf2: "",
            fin1: "",
            fin2: "",
        };

        this.handleCen1Change = this.handleCen1Change.bind(this);
        this.handleCen2Change = this.handleCen2Change.bind(this);
        this.handlePac1Change = this.handlePac1Change.bind(this);
        this.handlePac2Change = this.handlePac2Change.bind(this);
        this.handleWConf1Change = this.handleWConf1Change.bind(this);
        this.handleWConf2Change = this.handleWConf2Change.bind(this);

        this.handleMet1Change = this.handleMet1Change.bind(this);
        this.handleMet2Change = this.handleMet2Change.bind(this);
        this.handleAtl1Change = this.handleAtl1Change.bind(this);
        this.handleAtl2Change = this.handleAtl2Change.bind(this);
        this.handleEConf1Change = this.handleEConf1Change.bind(this);
        this.handleEConf2Change = this.handleEConf2Change.bind(this);
        this.handleFinal1Change = this.handleFinal1Change.bind(this);
        this.handleFinal2Change = this.handleFinal2Change.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCen1Change(event) {
        this.setState({cen1: event.target.value});
        console.log("selected " + event.target.value)
    }

    handleCen2Change(event) {
        this.setState({cen2: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handlePac1Change(event) {
        this.setState({pac1: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handlePac2Change(event) {
        this.setState({pac2: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleWConf1Change(event) {
        this.setState({wConf1 : event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleWConf2Change(event) {
        this.setState({wConf2 : event.target.value});
        console.log("selected " +  event.target.value);
    }

    handleMet1Change(event) {
        this.setState({met1: event.target.value});
        console.log("selected " + event.target.value)
    }
    handleMet2Change(event) {
        this.setState({met2: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleAtl1Change(event) {
        this.setState({atl1: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleAtl2Change(event) {
        this.setState({atl2: event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleEConf1Change(event) {
        this.setState({eConf1 : event.target.value});
        console.log("selected " +  event.target.value);
    }
    handleEConf2Change(event) {
        this.setState({eConf2 : event.target.value});
        console.log("selected " +  event.target.value);
    }

    handleFinal1Change(event) {
        this.setState({fin1 : event.target.value});
        console.log("selected " + event.target.value);
    }
    handleFinal2Change(event) {
        this.setState({fin2 : event.target.value});
        console.log("selected " + event.target.value);
    }
    handleSubmit(event) {
        
        event.preventDefault();
        console.log("ASD")
        console.log(this.state.cen1)
        console.log(this.state.cen2)
        console.log(this.state.pac1)
        console.log(this.state.pac2)
        console.log(this.state.wConf1)
        console.log(this.state.wConf2)
        console.log(this.state.met1)
        console.log(this.state.met2)
        console.log(this.state.atl1)
        console.log(this.state.atl2)
        console.log(this.state.eConf1)
        console.log(this.state.eConf2)
        console.log(this.state.fin1)
        console.log(this.state.fin2)
    }



    fetchWildCardStandings() {
        fetch("https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders")
        .then((response) => {
            return response.json();
        }).then((standings) => {

            let west = [];
            let east = [];
            let w = [];
            let e = [];

            this.createConference(standings, east, 2, 0);
            this.setState({eastList: east});

            this.createConference(standings, west, 4, 1);
            this.setState({westList: west});

            for(let i = 0; i < 8; i++) {
                w.push(west[i].team.name);
                e.push(east[i].team.name);
            }
            this.setState({wList: w});
            this.setState({eList: e});
        })
    }

    createConference(standings, array, division, conference) {
        for(let i = 0; i < 2; i++) {
            for(let j = 0; j < 3; j++) {
                array.push(standings.records[division + i].teamRecords[j])
                if(j === 0) {
                    array.push(standings.records[conference].teamRecords[i])
                }
            }
        }
    }

    componentDidMount() {
        this.fetchWildCardStandings();
    }

    render() {
        return  <div>
            <form onSubmit={this.handleSubmit}>
                <div className="app">
                    <h1 className="mt-3" title="Vote for Playoff Brackets Based off of Current Standings"><strong>Vote Bracket</strong></h1>
                    <div className="container mt-3">
                        <div className="mt-5 row">
                            <div className="col round">
                                {this.state.westList.map((team, i) => {
                                    return <div key={team.team.id}>
                                        <div className="card mb-3">
                                            <div>
                                                <div className="mt-2">{team.team.name}</div>
                                                <img className="mb-2" src={`./images/${team.team.id}.png`} alt="logo" height="100" width="100"></img>
                                            </div>
                                        </div>
                                        {i % 2 === 1 ? <br></br> : <div></div>}
                                    </div>
                                })}
                            </div>

                            <div className="col round form-group">
                                <select className="mb-3 card form-select"
                                    value={this.state.cen1}
                                    onChange={this.handleCen1Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.wList[0]}>{this.state.wList[0]}</option>
                                    <option value={this.state.wList[1]}>{this.state.wList[1]}</option>
                                </select>

                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.cen2}
                                    onChange={this.handleCen2Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.wList[2]}>{this.state.wList[2]}</option>
                                    <option value={this.state.wList[3]}>{this.state.wList[3]}</option>
                                </select>
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.pac1}
                                    onChange={this.handlePac1Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.wList[4]}>{this.state.wList[4]}</option>
                                    <option value={this.state.wList[5]}>{this.state.wList[5]}</option>
                                </select>
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.pac2}
                                    onChange={this.handlePac2Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.wList[6]}>{this.state.wList[6]}</option>
                                    <option value={this.state.wList[7]}>{this.state.wList[7]}</option>
                                </select>
                            </div>

                            <div className="col round form-group">
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.wConf1}
                                    onChange={this.handleWConf1Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.westList.map((team, i) => {
                                        if(i < 4) {
                                            return <option value={team.team.name} key={i}>
                                                {team.team.name}
                                            </option>
                                        }
                                        return ""
                                    })}
                                </select>

                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.wConf2}
                                    onChange={this.handleWConf2Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.westList.map((team, i) => {
                                        if(i >= 4) {
                                            return <option value={team.team.name} key={i}>
                                                {team.team.name}
                                            </option>
                                        }
                                        return ""
                                    })}
                                </select>
                            </div>

                            <div className="col my-auto form-group">
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.fin1}
                                    onChange={this.handleFinal1Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.westList.map((team, i) => {
                                        return <option value={team.team.name} key={i}>
                                            {team.team.name}
                                        </option>
                                    })}
                                </select>
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.fin2}
                                    onChange={this.handleFinal2Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.eastList.map((team, i) => {
                                        return <option value={team.team.name} key={i}>
                                            {team.team.name}
                                        </option>
                                    })}
                                </select>
                            </div>

                            
                            <div className="col round form-group">
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.eConf1}
                                    onChange={this.handleEConf1Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.eastList.map((team, i) => {
                                        if(i < 4) {
                                            return <option value={team.team.name} key={i}>
                                                {team.team.name}
                                            </option>
                                        }
                                        return ""
                                    })}
                                </select>

                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.eConf2}
                                    onChange={this.handleEConf2Change}
                                    >
                                    <option>Select a Team</option>
                                    {this.state.eastList.map((team, i) => {
                                        if(i >= 4) {
                                            return <option value={team.team.name} key={i}>
                                                {team.team.name}
                                            </option>
                                        }
                                        return ""
                                    })}
                                </select>
                            </div>

                            <div className="col round form-group">
                                <select className="mb-3 card form-select"
                                    value={this.state.met1}
                                    onChange={this.handleMet1Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.eList[0]}>{this.state.eList[0]}</option>
                                    <option value={this.state.eList[1]}>{this.state.eList[1]}</option>
                                </select>

                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.met2}
                                    onChange={this.handleMet2Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.eList[2]}>{this.state.eList[2]}</option>
                                    <option value={this.state.eList[3]}>{this.state.eList[3]}</option>
                                </select>
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.atl1}
                                    onChange={this.handleAtl1Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.eList[4]}>{this.state.eList[4]}</option>
                                    <option value={this.state.eList[5]}>{this.state.eList[5]}</option>
                                </select>
                                <select className="mb-3 card form-select" id="size"
                                    value={this.state.atl2}
                                    onChange={this.handleAtl2Change}
                                    >
                                    <option>Select a Team</option>
                                    <option value={this.state.eList[6]}>{this.state.eList[6]}</option>
                                    <option value={this.state.eList[7]}>{this.state.eList[7]}</option>
                                </select>
                            </div>

                            <div className="col round">
                                {this.state.eastList.map((team, i) => {
                                    return <div key={team.team.id}>
                                        <div className="card mb-3">
                                            <div>
                                                <div className="mt-2">{team.team.name}</div>
                                                <img className="mb-2" src={`./images/${team.team.id}.png`} alt="logo" height="100" width="100"></img>
                                            </div>
                                        </div>
                                        {i % 2 === 1 ? <br></br> : <div></div>}
                                    </div>
                                })}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Bracket</button>
                    </div>
                </div>
            </form>
            <div className="mt-5 app">
                <div>
                    <h3><strong>Submitted Brackets</strong></h3>
                </div>
            </div>
        </div>
    }
}