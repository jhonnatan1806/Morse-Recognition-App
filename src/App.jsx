import React from 'react';
import UploadForm from './components/UploadForm';
import OptionsModel from './components/OptionsModel';

function App() {
	return (
		<main className='flex gap-8 w-fit mx-auto'>
			<section className="w-[400px]">
				<UploadForm />
				<OptionsModel />
			</section>
		</main>
	);
}

export default App;
