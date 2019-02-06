import React from "react";

const ShowAnnouncInfo = (props) =>{
    return (
        <div>
            <div className="card">
            <ul className="card-body">
                    <li>{props.announcements.subject}</li>
                    <li>Type of announcement: {props.announcements.type}</li>
                    <li>issue date: {props.announcements.issue_date}</li>
                    <li>period: {props.announcements.period}</li>
                    <li>Day: {props.announcements.day}</li>
                    <li>
                        <a href={props.announcements.link}>click here to for more</a>
                        {/* Link: {props.announcements.link} */}
                        </li>
                </ul>
            </div>
           
        </div>
    )
}

export default ShowAnnouncInfo;