import React from "react";

// import ShowAnnouncInfo from "./ShowAnnouncInfo";

const Announcements = props => {
  return (
    <div className="container">
      <div
        // class="mx-auto"
        class="container-fluid p-2 mb-5"
        // onClick={() => props.onClickShow(props.announcement)}
        onClick={() => props.setActiveAnnonc(props.announcement)}
      >
        <h4>{props.announcement.subject}</h4>
        <p className="col-6">{props.announcement.issue_date}</p>
        <p>{props.announcement.period}</p>
        <p>{props.announcement.type}</p>
        <p>{props.announcement.link}</p>
      </div>
    </div>
  );
};

export default Announcements;
