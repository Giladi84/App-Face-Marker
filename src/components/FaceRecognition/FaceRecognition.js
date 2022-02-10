import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ( {imageURL, regions} ) => {	
	return (
		<div className="center">
			<div className="absolute">
				<img alt='' src={imageURL} style={{width:"500px", height:"auto"}}/>
				{ 
				regions.map(region => {
					let {top_row, bottom_row, left_col, right_col} = region.region_info.bounding_box

					return (
						<div 
						className="bounding-box" 
						style={{top:`${top_row*100}%`, right:`${(1-right_col)*100}%`, left:`${left_col*100}%`,bottom:`${(1-bottom_row)*100}%`}}></div>
						)					
				})
				}
				
			</div>
		</div>
		)}

export default FaceRecognition


  // updateBox = (borders) => {
  //   let top = `${borders.top_row*100}%`;
  //   let bottom = `${(1-borders.bottom_row)*100}%`;
  //   let left = `${borders.left_col*100}%`;
  //   let right = `${(1-borders.right_col)*100}%`;
  //   this.setState({box: [top,bottom,left,right]})
  //   console.log(top,bottom,left,right)
  // }