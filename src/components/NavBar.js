// import React from "react";

// const NavBar = ({ user, changeForm, logout, renderClubs }) => {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="navbar-brand"> <h1>SYANA</h1></div>
//         <div id="navbarNav">
//           <ul className="navbar-nav">
//             {// if the user is not authenticated
//               <React.Fragment>
//                 <li
//                   className="nav-item active"
//                   onClick={() => changeForm("login")}
//                 >
//                   <div className="nav-link">Login</div>
//                 </li>
//                 <li className="nav-item active" onClick={() => logout()}>
//                   <div className="nav-link">Logout</div>
//                 </li>

//               </React.Fragment>

//             // if the user authenticated
//             }
//           </ul>
//         </div>
//       </nav>
//     );
//   };
// export default NavBar;

import React, { Component } from "react";
// import PNU from "../images/PNU.png"
class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  renderNavs() {
    return this.props.navs.map(nav => {
      let isActive = nav.toLowerCase() === this.props.active;
      let style = isActive ? "nav-item active" : "nav-item";
      return (
        <li className={style}>
          <a
            className="nav-link"
            onClick={() => this.props.onNavClick(nav.toLowerCase())}
          >
            {nav}
            {isActive ? <span className="sr-only">(current)</span> : ""}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top sticky navbar-light bg-light">
        <a class="navbar-brand" href="#">
          PNU
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">{this.renderNavs()}</ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
