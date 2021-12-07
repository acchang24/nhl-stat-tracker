import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from "./SignupButton";
import { NavLink } from "react-router-dom";


export default function Navigation() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { user } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/vote">
                Vote Bracket
              </NavLink>
            </li>
          </ul>
          {!isLoading && (
            <div className="d-flex">
              {isAuthenticated ? (
                <div>
                  <span>{user.name}</span>
                  <LogoutButton />
                </div>

              ) : (
                <>
                  <LoginButton />
                  <SignupButton />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
    // <nav>
    //   <ul className="nav">
    //     <li className="nav-item">
    //       <NavLink exact className="nav-link" to="/">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li className="nav-item">
    //       <NavLink exact className="nav-link" to="/teams">
    //         Teams
    //       </NavLink>
    //     </li>
    //     <li className="nav-item">
    //       <NavLink exact className="nav-link" to="/vote">
    //         Vote Bracket
    //       </NavLink>
    //     </li>
    //   </ul>
    //   <ul className="nav mr-auto">
    //     {!isLoading && (
    //       <div>
    //         {isAuthenticated ? (
    //           <li className="nav-item">
    //             <LogoutButton />
    //           </li>

    //         ) : (
    //           <>
    //             <LoginButton />
    //             <SignupButton />
    //           </>
    //         )}
    //       </div>
    //     )}
    //   </ul>

    /* {!isLoading && (
      <div>
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </div>
    )} */
    // </nav>
  )
}

// export default class Navigation extends React.Component {

//   render() {
//     const { isAuthenticated, isLoading } = useAuth0();
//     return (
//       <nav>
//         <ul className="nav">
//           <li className="nav-item">
//             <NavLink exact className="nav-link" to="/">
//               Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink exact className="nav-link" to="/teams">
//               Teams
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink exact className="nav-link" to="/vote">
//               Vote Bracket
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }
