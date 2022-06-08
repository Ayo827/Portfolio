import React, { useState } from 'react';
import axios from 'axios';

const Contact = ({ data }) => {
   //const [url, setUrl] = useState('mailto:test@example.com?subject=subject&body=body');
   const [name, setName] = useState('');
   const [subject, setSubject] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [resultMessage, setResultMessage] = useState("");
   const [disable, setDisable] = useState(false)


    const handleClick = (e) => {
       e.preventDefault();
      // window.open(`mailto:${email}?subject=${subject}&body=${name}: ${message}`);
      setDisable(true)
      axios({
         method: "post",
         headers: { "Content-Type": "application/json" },
         data : {name: name, subject: subject, message: message, email: email},
         url: "/send-mail",
      }).then(result => {
         if(result.data.result === "Success"){
            setMessage("");
            setName("");
            setEmail("");
            setSubject("")
            setResultMessage(result.data.message);
            setDisable(false);
         }else{
            setResultMessage(result.data.message);
            setDisable(false);
         }
      }).catch(err=> {
         setResultMessage("An Error Occured");
         setDisable(false);
      })
    }
    

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{data?.message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">
                  <p>{resultMessage}</p>
               <form id="contactForm" name="contactForm" onSubmit={handleClick}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input value={name} type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={e => setName(e.target.value)} required/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input value={email} type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={e=> setEmail(e.target.value)} required/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input value={subject} type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={e => setSubject(e.target.value)} required/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea value={message} onChange={e => setMessage(e.target.value)} cols="50" rows="15" id="contactMessage" name="contactMessage" required></textarea>
                  </div>

                  <div>
                     <button type='submit'  className={(disable === false)? "submit" : "submit buttonDisabled"}>{(disable === false) ? 'Submit' : 'Sending'}</button>
                     <p>{resultMessage}</p>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {data?.name}<br />
						   {data?.address.street} <br />
						   {data?.address.region}<br/> {data?.address.state}, {data?.address.country}<br /> {data?.address.zip}<br />
						   <span>{data?.phone}</span>
					   </p>
				   </div>

               <div className="widget widget_tweets">

		         </div>
            </aside>
      </div>
   </section>
    );
}

export default Contact;