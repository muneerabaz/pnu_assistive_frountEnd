import React, { Component } from "react";
import "./App.css";
import { getUser, logout } from "./services/authService";
import Announcements from "./components/Announcements";
import Clubs from "./components/Clubs";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import NewAnnForm from "./components/NewAnnForm"; 
import ShowClub from "./components/ShowClub";
import ShowAnnouncInfo from "./components/ShowAnnouncInfo";

import PNU from "./images/PNU.png"; // pnu logo

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

  checkForUser() {
    const user = getUser();
    if (user) {
      this.login();
    }
  }

  //
  componentDidMount() {
    console.log("fetching data");

    this.checkForUser();
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


  fetchNewAnnForm(data){
    const url = "http://localhost:3000/announcements/"
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const announcements = data.concat[this.state.announcements];
        this.setState({announcements});
      })
      .catch(error => {
        console.log(error);
      })
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

  renderNewAnnForm(){
    return (
      <div>
        <NewAnnForm fetchNewAnnForm={this.fetchNewAnnForm.bind(this)}/>
      </div>
    )
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

  // the form algorithm
  changeForm = type => {
    // console.log(type);
    this.setState({
      form: type
    });
  };

  handleNewAnnForm(data){
    this.fetchNewAnnForm(data)
  }

  login = () => {
    const user = getUser();
    this.setState({ user });
    // let newNav = this.state.navs.filter(nav => nav !== "login");
    this.setState({ 
      navs: ["announcements", "clubs", "add announcement" , "logout"] ,
      activeNav: "announcements",
  });
  };

  logout = () => {
    logout();
    this.setState({ user: null });
    let newNav = this.state.navs.filter(nav => nav !== "logout");
    this.setState({ navs: ["announcements", "clubs", "login"]  ,
    activeNav: "announcements"
  });
    // this.setState({ activeNav: "announcements" });
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
    } else if (activeNav === "announcements" || activeNav === "clubs") {
      this.setState({ activeAnnonc: "" });
      this.setState({ activeClub: "" });
    } else if (activeNav === "logout") {
      this.logout();
    }else if(activeNav === "add announcement"){
      this.renderNewAnnForm()
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
          url={<PNU />} // try to render the logo
          alt=""
          class="img-fluid logo-light"
        />

        <div className="container mt-3 p-0">
          {/* activeAnnonc is the   */}
          {/* if activeAnnonc which is (the announcments information )
           is renderd or not empty then show the announc info  */}
          {this.state.activeAnnonc !== "" ? this.showAnno() : ""}

          {/* this.state.activeAnnonc === "" */}
          {this.state.activeNav === "announcements" &&
          this.state.activeAnnonc === ""
            ? this.renderAnnounncements(this.state.announcements)
            : ""}


          {this.state.activeNav === "add announcement" &&
          this.state.activeAnnonc === ""
            ? this.renderNewAnnForm(this.state.announcements)
            : ""}

          {/* {(this.state.activeNav === "clubs") & (this)
            ? this.renderClubs(this.state.clubs)
            : ""} */}
          {this.state.activeClub !== "" ? this.showClubInfo() : ""}

          {this.state.activeNav === "clubs" && this.state.activeClub === ""
            ? this.renderClubs(this.state.clubs)
            : ""}
          {/**&(this.state.activeAnnonc !== "")  */}
          {/* {this.state.activeNav === } */}

          {this.state.activeNav === "login" ? (
            <AuthForm
              form="login"
              onLogin={this.login}
              changeActiveNav={this.onNavClick}
            />
          ) : (
            ""
          )}
          {this.state.activeNav === "login" ? (
            <AuthForm
              form="login"
              onLogin={this.login}
              changeActiveNav={this.onNavClick}
            />
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
