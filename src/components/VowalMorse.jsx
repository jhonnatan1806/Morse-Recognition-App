import React, { useState } from 'react';

function VowalMorse({vowal, morse}) {

    const [currentVowal, ] = useState( {
        vowal: vowal??'A',
        morse: morse??'.-'
    });

	return (
        <div className='flex flex-col items-center justify-center gap-4 px-12 py-6'>
            <h1 className='text-6xl'>{currentVowal.vowal}</h1>
            <h2 className='text-4xl font-bold'>{currentVowal.morse}</h2>
        </div>
    );
}

export default VowalMorse;
