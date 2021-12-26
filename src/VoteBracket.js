import React, { useEffect, useState } from "react"
import { toast } from "react-toastify";
import BracketTable from "./BracketTable";
import { useAuth0 } from "@auth0/auth0-react";

export default function VoteBracket() {
    const [westList, setWestList] = useState([]);
    const [eastList, setEastList] = useState([]);
    const [wList, setWList] = useState([]);
    const [eList, setEList] = useState([]);
    const [cen1, setCen1] = useState("");
    const [cen2, setCen2] = useState("");
    const [pac1, setPac1] = useState("");
    const [pac2, setPac2] = useState("");
    const [wConf1, setWConf1] = useState("");
    const [wConf2, setWConf2] = useState("");
    const [met1, setMet1] = useState("");
    const [met2, setMet2] = useState("");
    const [atl1, setAtl1] = useState("");
    const [atl2, setAtl2] = useState("");
    const [eConf1, setEConf1] = useState("");
    const [eConf2, setEConf2] = useState("");
    const [fin1, setFin1] = useState("");
    const [fin2, setFin2] = useState("");
    const [isValid, setIsValid] = useState(true);

    const { user } = useAuth0();

    useEffect(() => {
        fetch("https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders")
            .then((response) => {
                return response.json();
            }).then((standings) => {

                let west = [];
                let east = [];
                let w = [];
                let e = [];

                createConference(standings, east, 2, 0);
                setEastList(east);

                createConference(standings, west, 4, 1);
                setWestList(west)

                for (let i = 0; i < 8; i++) {
                    w.push(west[i].team.name);
                    e.push(east[i].team.name);
                }
                setWList(w);
                setEList(e)
            })
        document.title = "Vote Bracket"
    }, []);

    function handleCen1Change(event) {
        setCen1(event.target.value);
    }
    function handleCen2Change(event) {
        setCen2(event.target.value);
    }
    function handlePac1Change(event) {
        setPac1(event.target.value);
    }
    function handlePac2Change(event) {
        setPac2(event.target.value);
    }
    function handleMet1Change(event) {
        setMet1(event.target.value);
    }
    function handleMet2Change(event) {
        setMet2(event.target.value);
    }
    function handleAtl1Change(event) {
        setAtl1(event.target.value);
    }
    function handleAtl2Change(event) {
        setAtl2(event.target.value);
    }
    function handleWConf1Change(event) {
        setWConf1(event.target.value);
    }
    function handleWConf2Change(event) {
        setWConf2(event.target.value);
    }
    function handleFinal1Change(event) {
        setFin1(event.target.value);
    }
    function handleFinal2Change(event) {
        setFin2(event.target.value);
    }
    function handleEConf1Change(event) {
        setEConf1(event.target.value);
    }
    function handleEConf2Change(event) {
        setEConf2(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        let newBracket = [wList, [cen1, cen2, pac1, pac2], [wConf1, wConf2],
            [fin1, fin2], [eConf1, eConf2], [met1, met2, atl1, atl2], eList];

        let valid = true;
        for (let i = 0; i < newBracket.length; i++) {
            for (let j = 0; j < newBracket[i].length; j++) {
                if (newBracket[i][j] === "") {
                    valid = false;
                }
            }
        }

        if (valid) {
            let currentDate = getDate();
            fetch("https://acchang24-nhl-brackets-api.herokuapp.com/api/brackets", {
                method: "POST",
                body: JSON.stringify({
                    name: user.name,
                    userid: user.sub,
                    bracket: { "vote": newBracket },
                    date: currentDate
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    toast.success(`Post "${json.name}" was successfully created`);
                });
        }
        else {
            setIsValid(false);
        }
    }

    return <div>
        {user !== undefined ? <form onSubmit={handleSubmit}>
            <div className="app">
                <h1 className="mt-3" title="Vote for Playoff Brackets Based off of Current Standings"><strong>Vote Bracket</strong></h1>
                <div className="container mt-3">
                    <div className="mt-5 row">
                        <div className="col round">
                            {westList.map((team, i) => {
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
                                value={cen1}
                                onChange={handleCen1Change}
                            >
                                <option>Select a Team</option>
                                <option value={wList[0]}>{wList[0]}</option>
                                <option value={wList[1]}>{wList[1]}</option>
                            </select>

                            <select className="mb-3 card form-select" id="size"
                                value={cen2}
                                onChange={handleCen2Change}
                            >
                                <option>Select a Team</option>
                                <option value={wList[2]}>{wList[2]}</option>
                                <option value={wList[3]}>{wList[3]}</option>
                            </select>
                            <select className="mb-3 card form-select" id="size"
                                value={pac1}
                                onChange={handlePac1Change}
                            >
                                <option>Select a Team</option>
                                <option value={wList[4]}>{wList[4]}</option>
                                <option value={wList[5]}>{wList[5]}</option>
                            </select>
                            <select className="mb-3 card form-select" id="size"
                                value={pac2}
                                onChange={handlePac2Change}
                            >
                                <option>Select a Team</option>
                                <option value={wList[6]}>{wList[6]}</option>
                                <option value={wList[7]}>{wList[7]}</option>
                            </select>
                        </div>

                        <div className="col round form-group">
                            <select className="mb-3 card form-select" id="size"
                                value={wConf1}
                                onChange={handleWConf1Change}
                            >
                                <option>Select a Team</option>
                                {westList.map((team, i) => {
                                    if (i < 4) {
                                        return <option value={team.team.name} key={i}>
                                            {team.team.name}
                                        </option>
                                    }
                                    return ""
                                })}
                            </select>

                            <select className="mb-3 card form-select" id="size"
                                value={wConf2}
                                onChange={handleWConf2Change}
                            >
                                <option>Select a Team</option>
                                {westList.map((team, i) => {
                                    if (i >= 4) {
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
                                value={fin1}
                                onChange={handleFinal1Change}
                            >
                                <option>Select a Team</option>
                                {westList.map((team, i) => {
                                    return <option value={team.team.name} key={i}>
                                        {team.team.name}
                                    </option>
                                })}
                            </select>
                            <select className="mb-3 card form-select" id="size"
                                value={fin2}
                                onChange={handleFinal2Change}
                            >
                                <option>Select a Team</option>
                                {eastList.map((team, i) => {
                                    return <option value={team.team.name} key={i}>
                                        {team.team.name}
                                    </option>
                                })}
                            </select>
                        </div>

                        <div className="col round form-group">
                            <select className="mb-3 card form-select" id="size"
                                value={eConf1}
                                onChange={handleEConf1Change}
                            >
                                <option>Select a Team</option>
                                {eastList.map((team, i) => {
                                    if (i < 4) {
                                        return <option value={team.team.name} key={i}>
                                            {team.team.name}
                                        </option>
                                    }
                                    return ""
                                })}
                            </select>

                            <select className="mb-3 card form-select" id="size"
                                value={eConf2}
                                onChange={handleEConf2Change}
                            >
                                <option>Select a Team</option>
                                {eastList.map((team, i) => {
                                    if (i >= 4) {
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
                                value={met1}
                                onChange={handleMet1Change}
                            >
                                <option>Select a Team</option>
                                <option value={eList[0]}>{eList[0]}</option>
                                <option value={eList[1]}>{eList[1]}</option>
                            </select>

                            <select className="mb-3 card form-select" id="size"
                                value={met2}
                                onChange={handleMet2Change}
                            >
                                <option>Select a Team</option>
                                <option value={eList[2]}>{eList[2]}</option>
                                <option value={eList[3]}>{eList[3]}</option>
                            </select>
                            <select className="mb-3 card form-select" id="size"
                                value={atl1}
                                onChange={handleAtl1Change}
                            >
                                <option>Select a Team</option>
                                <option value={eList[4]}>{eList[4]}</option>
                                <option value={eList[5]}>{eList[5]}</option>
                            </select>
                            <select className="mb-3 card form-select" id="size"
                                value={atl2}
                                onChange={handleAtl2Change}
                            >
                                <option>Select a Team</option>
                                <option value={eList[6]}>{eList[6]}</option>
                                <option value={eList[7]}>{eList[7]}</option>
                            </select>
                        </div>

                        <div className="col round">
                            {eastList.map((team, i) => {
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
                    {isValid ? <></> : <div className="error">Missing Selections</div>}
                </div>
            </div>
        </form> : <h1 className="mt-3 app">Please login to vote</h1>}
        <div className="mt-5 app">
            <div>
                <h3><strong>Submitted Brackets</strong></h3>
                {/* <BracketTable /> */}
            </div>
        </div>
    </div>

}
function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    return today;
}


function createConference(standings, array, division, conference) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            array.push(standings.records[division + i].teamRecords[j])
            if (j === 0) {
                array.push(standings.records[conference].teamRecords[i])
            }
        }
    }
}