import React from 'react';

class SignUp extends React.Component {

	constructor() {
			super();
			this.state = {
				email: '',
				password: '',
				name: ''
			}
		}

	onEmailInput = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordInput = (event) => {
		this.setState({password: event.target.value})
	}

	onNameInput = (event) => {
		this.setState({name: event.target.value})
	}	

	onButtonClick = (event) => {
		fetch('https://api-face-marker.herokuapp.com/register', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		  	email: this.state.email,
		  	password: this.state.password,
		  	name: this.state.name
		  }),
		})
		.then(response => response.json())
		.then(data => {
		  if (data.id) {
		  	this.props.updateUserInfo(data);
		  	this.props.changeRoute('home');
		  	console.log(data);
		  } else {window.alert("there was an error....")}
		}) 
		.catch(err => console.log(err))
		
	}


	render () {
		const {changeRoute} = this.props;
		return (
			<div className="pa4 black-80 center">
			  <div className="measure signForm card1">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <h1 className="f4 fw6 ph0 mh0">Sign up!</h1>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">First Name</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="first-name"
			        onChange={this.onNameInput}  
			        id="first-name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address" 
			        onChange={this.onEmailInput} 
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"
			        onChange={this.onPasswordInput}  
			        id="password" />
			      </div>		      
			    </fieldset>
			    <div className="">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register!" 
			      onClick={this.onButtonClick}/>
			    </div>
			    <div className="lh-copy mt3">
			      <p href="#0" className="f6 link dim black db pointer" onClick={() => {changeRoute('signin')}}>Alreay a member? Sign in!</p>
			      
			    </div>
			  </div>
			</div>

		)
	} 
}



export default SignUp



















