import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var region = this.props.data.address.region;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var country = this.props.data.address.country;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }
    async function printTickets() {
      const { data } = await getTicketsPdf()
      const blob = new Blob([data], { type: 'application/pdf' })
      saveAs(blob, "Ayodeji-Adebola-Resume.pdf")
    }
    
    async function getTicketsPdf() {
      return axios.get('/getPdf', {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }

    return (
      <section id="about">
      <div className="row">
         <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Tim Baker Profile Pic" />
         </div>
         <div className="nine columns main-col">
            <h2>About Me</h2>

            <p>{bio}</p>
            <div className="row">
               <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
						   <span>{name}</span><br />
						   <span>{street}<br />
                           {region} <br /> {state}, {zip}<br />
                           {country}.
                   </span><br />
						   <span>{phone}</span><br />
                     <span>{email}</span>
					   </p>
               </div>
               <div className="columns download">
                  <p>
                     <a onClick={printTickets} className="button" target="_blank" download><i className="fa fa-download"></i>Download Resume</a>
                  </p>
               </div>
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
