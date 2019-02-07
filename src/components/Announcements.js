import React from "react";

// import ShowAnnouncInfo from "./ShowAnnouncInfo";

const Announcements = props => {
  return (
    <div className="container">
    
      <div
        // class="mx-auto"
        class="container-fluid p-1 mb-1"
        // onClick={() => props.onClickShow(props.announcement)}
        onClick={() => props.setActiveAnnonc(props.announcement)}
      >
        <h6 className="object">{props.announcement.subject}</h6>
        <p  className="col-6">{props.announcement.issue_date}</p>
        {/* <p>{props.announcement.period}</p> */}
        <p>{props.announcement.type}</p>
        {/* <a href={props.announcement.link}></a> */}
        {/* <p>{props.announcement.link}</p> */}
      </div>
    </div>
  );
};

export default Announcements;
