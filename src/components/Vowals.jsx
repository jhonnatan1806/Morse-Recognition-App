import React from 'react';
import VowalMorse from './VowalMorse';

const vowals = {
	A: '.-',
	E: '.',
	I: '..',
	O: '---',
	U: '..-',
};

function Vowals() {
	return (
		<div className='select-none'>
            <h1 className='text-lg'>Vocales - Morse</h1>
			<div className="flex flex-wrap justify-center max-w-[400px]">
				{Object.entries(vowals).map(([vowal, morse]) => (
					<VowalMorse key={vowal} vowal={vowal} morse={morse} />
				))}
			</div>
		</div>
	);
}

export default Vowals;
