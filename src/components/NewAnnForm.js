import React from "react";

class NewAnnForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        // issue_date: "" ,
        period: '',
        subject: '',
        type: '',
        link: '',
        day: '',
        hours: null,
        club_id: null
    };

    /* this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); */
  }

  handleChange(event) {
      const name = event.target.name;
      const value = event.target.value
    this.setState({ [name]: value });
    console.log(value)
  }

  handleSubmit(event) {
    alert("A announcement was submitted: " + this.state.value);
    event.preventDefault();
    console.log(this.state)
    this.props.fetchNewAnnForm(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <br/>
      <br/>
        <label>subject:</label><input type="text" name="subject" onChange={this.handleChange.bind(this)} /> <br/>
        <label>type:</label><input type="text" name="type" onChange={this.handleChange.bind(this)} /> <br/>
        <label>period:</label><input type="text" name="period" onChange={this.handleChange.bind(this)} /> <br/>
        <label>day:</label><input type="text" name="day" onChange={this.handleChange.bind(this)} /> <br/>
        <label>hours:</label><input type="number" name="hours" onChange={this.handleChange.bind(this)} /> <br/>
       <label>link:</label><input type="text" name="link" onChange={this.handleChange.bind(this)} /> <br/>

        

        <button>submit</button>
      </form>
    );
  }
}

export default NewAnnForm;
