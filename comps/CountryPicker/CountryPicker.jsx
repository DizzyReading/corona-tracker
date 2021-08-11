import { useState, useEffect, useRef } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries, fetchedCountries } from '../../pages/api/index';
import { css, cx } from '@emotion/css';
import Button from '@material-ui/core/Button';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ country, isClicked, handleHistoricalDataForCountries, histData, handleCountryChange }) => {
	const [ fetchedCountries, setFetchedCountries ] = useState([]);

	useEffect(
		async () => {
			const data = await fetchCountries();

			setFetchedCountries(data);
		},
		[ setFetchedCountries ]
	);

	return (
		<div className={styles.select}>
			<FormControl className={css`margin: 20px 0 20px 0;`}>
				<NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
					<option value="">Global</option>
					{fetchedCountries.map((country, idx) => (
						<option key={idx} value={country}>
							{country}
						</option>
					))}
				</NativeSelect>
			</FormControl>
			{!country ? null : histData === 'nope' && isClicked === false ? null : histData === 'yup' &&
			isClicked === false ? (
				<Button
					onClick={() => handleHistoricalDataForCountries('clicked')}
					size="small"
					className={styles.toggle}
				>
					Historical{' '}
				</Button>
			) : histData === 'yup' && isClicked ? (
				<Button
					onClick={() => handleHistoricalDataForCountries('clicked')}
					size="small"
					className={styles.toggle}
				>
					Current{' '}
				</Button>
			) : null}
		</div>
		// null
	);
};

export default CountryPicker;
