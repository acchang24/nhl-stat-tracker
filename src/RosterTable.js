import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RosterTable(props) {
    const roster = props.roster;
    const teamId = props.id;
    const [sortedField, setSortedField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    sortNumber();

    if (sortedField !== null) {
        if (sortedField === "number") {
            sortNumber();
        }
        if (sortedField === "name") {
            sortName();
        }
        if (sortedField === "pos") {
            sortPos();
        }
    }

    function changeDirection() {
        if (sortDirection === "asc") {
            setSortDirection("desc");
        }
        else if (sortDirection === "desc") {
            setSortDirection("asc");
        }
    }

    function sortNumber() {
        if (sortDirection === "asc") {
            roster.sort((a, b) => {
                if (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)) {
                    return -1;
                }
                if (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) {
                    return 1;
                }
                return 0;
            });
        }
        else if (sortDirection === "desc") {
            roster.sort((a, b) => {
                if (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) {
                    return -1;
                }
                if (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)) {
                    return 1;
                }
                return 0;
            });
        }

    }

    function sortName() {
        if (sortDirection === "asc") {
            roster.sort((a, b) => {
                if (a.person.fullName < b.person.fullName) {
                    return -1;
                }
                if (a.person.fullName > b.person.fullName) {
                    return 1;
                }
                return 0;
            })
        }
        else if (sortDirection === "desc") {
            roster.sort((a, b) => {
                if (a.person.fullName > b.person.fullName) {
                    return -1;
                }
                if (a.person.fullName < b.person.fullName) {
                    return 1;
                }
                return 0;
            })
        }
    }

    function sortPos() {
        if (sortDirection === "asc") {
            roster.sort((a, b) => {
                if (a.position.code < b.position.code) {
                    return -1;
                }
                if (a.position.code > b.position.code) {
                    return 1;
                }
                return 0;
            })
        }
        else if (sortDirection === "desc") {
            roster.sort((a, b) => {
                if (a.position.code > b.position.code) {
                    return -1;
                }
                if (a.position.code < b.position.code) {
                    return 1;
                }
                return 0;
            })
        }

    }

    return (<table className="table table-bordered table-hover sortable">
        <thead>
            <tr>
                <th
                    onClick={() => {
                        changeDirection();
                        setSortedField("number");
                    }}
                    scope="col"
                >
                    #
                </th>
                <th
                    onClick={() => {
                        changeDirection();
                        setSortedField("name");
                    }}
                    scope="col"
                >
                    Name
                </th>
                <th
                    onClick={() => {
                        changeDirection();
                        setSortedField("pos");
                    }}
                    scope="col"
                >
                    Position
                </th>
            </tr>
        </thead>
        <tbody>
            {roster.map((player) => {
                return (
                    <tr key={player.person.id}>
                        <td>{player.jerseyNumber}</td>
                        <td>
                            <Link
                                to={`/teams/${teamId}/${player.person.id}`}
                            >
                                {player.person.fullName}
                            </Link>
                        </td>
                        <td>{player.position.code}</td>
                    </tr>
                );
            })}
        </tbody>
    </table >)
}