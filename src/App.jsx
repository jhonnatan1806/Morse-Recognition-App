import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import OptionsModel from './components/OptionsModel';
import Vowals from './components/Vowals';
import TestModel from './components/TestModel';

function App() {
	const [tabActive, setTabActive] = useState(0);

	return (
		<main className="bg-gradient-to-t from-white to-slate-100 w-screen h-screen flex justify-center gap-8">
			<section className="bg-white w-[435px] h-[660px] shadow-md p-4 rounded-md mt-8">
				<nav className="flex">
					<button
						className={`py-2 px-4 rounded-t-md ${tabActive === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
						onClick={() => setTabActive(0)}>
						Cargar Modelo
					</button>
					<button
						className={`py-2 px-4 rounded-t-md ${tabActive === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
						onClick={() => setTabActive(1)}>
						Predecir con Modelo
					</button>
				</nav>
				<div className="bg-slate-200 w-full h-0.5 mx-aut mb-4"></div>
				{tabActive === 0 && <UploadForm />}
                {tabActive === 1 && <TestModel />}
			</section>
			<aside className="flex flex-col gap-8 mt-8">
				<section className="bg-white min-w-[400px] h-fit shadow-md p-4 rounded-md">
					<Vowals />
				</section>
				<section className="bg-white min-w-[400px] h-fit shadow-md p-4 rounded-md">
					<OptionsModel />
				</section>
			</aside>
		</main>
	);
}

export default App;
