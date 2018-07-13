import React from 'react';

const faceRecognition = ({imageURL}) => {
	return (
    <div className='center ma'>
     <div className='absolute ma2'>
      <img alt='' src={imageURL} width='500px' height='auto'/>
     </div>
    </div>
    );
}

export default faceRecognition;