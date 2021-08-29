import React from 'react';
import { css, cx } from '@emotion/css';
import { Cards, Chart, CountryPicker } from '../comps';
import Typography from '@material-ui/core/Typography';
import { fetchData } from './api';
import { fecthHistoicalDataForCountries } from './api';
import { useEffect, useState, useRef } from 'react';
import Alert from '@material-ui/core/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Box from '@material-ui/core/Box';

import Loader from '../comps/Loader/Loader';

function TransitionAlerts() {
	const [ open, setOpen ] = useState(true);

	return (
		<Box sx={{ width: '100%', padding: '2rem' }}>
			<Collapse in={open}>
				<Alert
					severity="info"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<AiOutlineCloseCircle fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					Unfortunately, for some reason the API has stopped collecting data for recovered patients Worldwide.
				</Alert>
			</Collapse>
		</Box>
	);
}

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

	useEffect(() => {
		const getData = async () => {
			const fetchedData = await fetchData();
			setData(fetchedData);
		};

		getData();
	}, []);

	const handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		const countryHistDataRes = await fecthHistoicalDataForCountries(country);

		setHistData('yup');
		setData(fetchedData);
		setCountry(country);

		setCountryHistData(countryHistDataRes);
	};

	const handleHistoricalDataForCountries = () => {
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
			<TransitionAlerts />

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
