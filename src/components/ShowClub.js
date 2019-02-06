import React from "react";

const ShowClub = props => {
  return (
    <div>
      <div className="card">
        <ul>
          <p>Club name : {props.clubs.name_eng} اسم النادي: {props.clubs.name_arb}</p>
          {/* <p>{props.clubs.name_arb}</p> */}
          <p>Club of the Faculty of: {props.clubs.realtedTo} :النادي التابع لكلية</p>
          <p>Twitter account: {props.clubs.twitter_account} : الحساب في تويتر </p>
          <p>E-mail : {props.clubs.email} : الايميل </p>
          <p>office number : {props.clubs.office} : رقم المكتب </p>
          
          {/* {props.clubs.realtedTo} */}
        </ul>
      </div>
    </div>
  );
};

export default ShowClub;
