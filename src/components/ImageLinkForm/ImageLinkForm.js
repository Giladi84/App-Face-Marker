import React from 'react';
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInput, onButtonClick }) => {
	return (
		<div className="ma4 mt0">
			<h1 className="title"> {`Add a link to your image and we'll detect where the faces are in it!`}</h1>
			<div className="pa4 br3 shadow-5 form">
				<input className="w-70 f4 pa2 br3" type="text" onChange={onInput} />
				<button className="w-30 br3 grow f4 link ph3 pv2 bg-blue white" onClick={onButtonClick}>Detect!</button>
			</div>
		</div>
		)
}

export default ImageLinkForm