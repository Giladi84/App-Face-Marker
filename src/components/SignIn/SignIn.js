import React from 'react';

class SignIn extends React.Component {	
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
	}

	onEmailInput = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordInput = (event) => {
		this.setState({password: event.target.value})
	}

	onButtonClick = (event) => {
		fetch('https://api-face-marker.herokuapp.com/signin', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		  	email: this.state.email,
		  	password: this.state.password
		  }),
		})
		.then(response => response.json())
		.then(data => {
		  if (data.id) {
		  	this.props.updateUserInfo(data);
		  	this.props.changeRoute('home');
		  } else {window.alert(data)}
		}) 
		
	}

	render () {
		const {changeRoute} = this.props;
		return (
			<div className="pa4 black-80 center">
			  <div className="measure signForm card1">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <h1 className="f4 fw6 ph0 mh0">Sign In</h1>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        onChange={this.onEmailInput}
			        name="email-address"  
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password"
			        onChange={this.onPasswordInput} 
			        name="password"  
			        id="password" />
			      </div>		      
			    </fieldset>
			    <div className="">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      onClick={this.onButtonClick}/>
			    </div>
			    <div className="lh-copy mt3">
			      <p href="#0" className="f6 link dim black db pointer" onClick={() => changeRoute('signup')} >Don't have an acount? Sign up!</p>
			      
			    </div>
			  </div>
			</div>
		)
	}
}



export default SignIn




// onClick={changeRoute('home')}
















