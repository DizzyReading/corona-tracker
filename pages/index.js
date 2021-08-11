import { css, cx } from '@emotion/css';
import { Cards, Chart, CountryPicker } from '../comps';
import Typography from '@material-ui/core/Typography';
import { fetchData } from './api';
import { fecthHistoicalDataForCountries } from './api';
import { useEffect, useState, useRef } from 'react';

import Loader from '../comps/Loader/Loader';

const App = () => {
	const [ data, setData ] = useState({});
	const [ country, setCountry ] = useState('');
	const [ histData, setHistData ] = useState('nope');
	let [ isClicked, setIsClicked ] = useState(false);
	const [ countryHistData, setCountryHistData ] = useState({
		date: [],
		cases: [],
		recovered: [],
		deaths: []
	});

	useEffect(async () => {
		const fetchedData = await fetchData();

		setData(fetchedData);
	}, []);

	const handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		const countryHistDataRes = await fecthHistoicalDataForCountries(country);

		setHistData('yup');
		setData(fetchedData);
		setCountry(country);

		setCountryHistData(countryHistDataRes);
	};

	const handleHistoricalDataForCountries = async (e) => {
		setIsClicked(!isClicked); // toggle
	};
	console.log(country);
	// console.log(isClicked);
	console.log('histData is ' + histData);
	console.log('isClicked is ' + isClicked);
	// console.log("country is " + country);

	return (
		<div id="home">
			<Typography
				variant="h3"
				className={css`
					padding: 3rem;
					text-align: center;
				`}
			>
				Corona Tracker
			</Typography>

			<Cards data={data} />

			<CountryPicker
				country={country}
				isClicked={isClicked}
				handleHistoricalDataForCountries={handleHistoricalDataForCountries}
				histData={histData}
				handleCountryChange={handleCountryChange}
			/>

			<Chart isClicked={isClicked} countryHistData={countryHistData} data={data} country={country} />
		</div>
	);
};

export default App;
