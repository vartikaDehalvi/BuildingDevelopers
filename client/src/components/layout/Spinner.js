import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
	return (
		<img
			src={spinner}
			style={{ width: '200px', margin: '15% auto auto auto', display: 'block' }}
			alt="Loading..."
		/>
	);
};

export default Spinner;
