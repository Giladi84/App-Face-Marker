import React from 'react';

const Navigation = ({changeRoute , route}) => {
	if (route==='home') {
		return (
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p className="f3 link dim black underline pa3 pointer" onClick={()=>{changeRoute('signin')}}> sign out </p>
			</nav>
		)
	} else {
		return (
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p className="f3 link dim black underline pa3 pointer" onClick={()=>{changeRoute('signin')}}> sign in </p>
				<p className="f3 link dim black underline pa3 pointer" onClick={()=>{changeRoute('signup')}}> sign up </p>
			</nav>
		)
	}
}

export default Navigation


