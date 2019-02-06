import React, { Component } from "react";
import Announcements from "./components/Announcements";
import { getUser, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import Clubs from "./components/Clubs";
// import ShowAnnouncements from "./components/ShowAnnouncements";
import ShowClub from "./components/ShowClub";

import "./App.css";
import ShowAnnouncInfo from "./components/ShowAnnouncInfo";
import PNU from "./images/PNU.png";
const API_URL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeNav: "announcements",
      navs: ["announcements", "clubs", "login"],
      user: false,
      form: "Login",
      // for the announcements to be called , renderd or notwhen needed
      announcements: [],
      // to render the announcment info
      activeAnnonc: "",

      // for the clubs to be called , renderd or not when needed
      clubs: [],
      // to render the club info
      activeClub: ""
    };
  }

  // 
  componentDidMount() {
    console.log("fetching data");
    const url = API_URL + `/announcements`;
    this.fetchClubs();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          announcements: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

   /* since i can't fetch more than one in one componentDidMount(){...} 
   i fetched in another function and called it in componentDidMount(){
   ... this.fetchClubs();} */

  fetchClubs() {
    this.setState({
      announcements: false
    });
    console.log("fetching data");
    const url = API_URL + `/clubs`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        clubs: data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  // both rendering the clubs and ammouncments 
  renderAnnounncements(allAnnouncements) {
    console.log("render", this.state.announcements);
    if (
      this.state.announcements.length > 0
      // this.state.listOfAnnouncements === true
    ) {
      return allAnnouncements.map(a => {
        return (
          <Announcements
            setActiveAnnonc={this.setActiveAnnonc.bind(this)}
            key={a.announcement_id}
            announcement={a}
          />
        );
      });
    } else return <h2> No Announcements yet </h2>;
  }

  renderClubs(fetchClubs) {
    console.log("render", this.state.clubs);
    if (this.state.clubs.length > 0) {
      return fetchClubs.map(a => {
        return (
          <Clubs
            setActiveClub={this.setActiveClub.bind(this)}
            key={a.club_id}
            clubs={a}
          />
        );
      });
    } else return <h2> No clubs yet </h2>;
  }


  changeForm = type => {
    // console.log(type);
    this.setState({
      form: type
    });
  };

  login = () => {
    const user = getUser();
    this.setState({ user });
  };

  logout = () => {
    logout();
    this.setState({ user: null });
  };

  // to set the announcment info
  setActiveAnnonc(activeAnnonc) {
    console.log("####### onClickShow", activeAnnonc);
    this.setState({ activeAnnonc });
    this.setState({ activeClub: "" });
  }

    // to set the club info
  setActiveClub(activeClub) {
    console.log("####### onClickShow", activeClub);
    this.setState({ activeClub });
    this.setState({ activeAnnonc: "" });
  }

  showAnno() {
    return <ShowAnnouncInfo announcements={this.state.activeAnnonc} />;
  }

  showClubInfo() {
    return <ShowClub clubs={this.state.activeClub} />;
  }

  onNavClick = activeNav => {
    //just to test what am i cliking on the NavBar
    //console.log("active nav is ", activeNav);
    if (activeNav === "login") {
      this.changeForm("login");
    }else if (activeNav === "announcements" && activeNav === "clubs") {
      this.setState({ activeAnnonc: "" });
      this.setState({ activeClub: "" });
    }
    this.setState({ activeNav });
  };

  render() {
    return (
      <div>
        <NavBar
          onNavClick={this.onNavClick}
          active={this.state.activeNav}
          navs={this.state.navs}
          url={<PNU/>} // try to render the logo
          alt=""
          class="img-fluid logo-light"
        />
        <div className="container mt-5 p-0">
        {/* activeAnnonc is the   */}
          {this.state.activeAnnonc !== "" ? this.showAnno() : ""}
          {(this.state.activeNav === "announcements") & (this.state.activeAnnonc === "")
            ? this.renderAnnounncements(this.state.announcements)
            : ""}
          {/* {(this.state.activeNav === "clubs") & (this)
            ? this.renderClubs(this.state.clubs)
            : ""} */}

          {this.state.activeClub !== "" ? this.showClubInfo() : ""}
          
          {(this.state.activeNav === "clubs") & (this.state.activeClub === "")
            ? this.renderClubs(this.state.clubs)
            : ""}
          {this.state.activeNav === "login" ? (
            <AuthForm form={this.state.form} onLogin={this.login} />
          ) : (
            ""
          )}
          
        </div>
        <footer class="footer bg-light">
          <div class="container">
            <div class="text-center text-white footer-alt">
              <p class="text-muted mb-0">&copy; Copyright | Muneera 2019</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
