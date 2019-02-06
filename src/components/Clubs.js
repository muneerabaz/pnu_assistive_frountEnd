import React from 'react';

const Clubs = props =>{
    return(
        <div className="container">
        <div  class="container-fluid p-5 mb-5"
        // onClick={() => props.onClickShow(props.announcement)}
        onClick={() => props.setActiveClub(props.clubs)}>
        <p>{props.clubs.name_eng}</p>
        <p>{props.clubs.name_arb}</p>
        {/* {props.clubs.name_eng}
        {props.clubs.name_arb} */}
        {/* {props.clubs.realtedTo}
        {props.clubs.twitter_account}
        {props.clubs.email} */}
        </div>
        </div>
    )
}

export default Clubs;