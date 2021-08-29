import Box from '@material-ui/core/Box';
import styles from '../Loader/Loader.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { css } from '@emotion/react';

const Loader = () => {
	return (
		<Box className={styles.loader}>
			<CircularProgress size={'6.5rem'} />
		</Box>
	);
};

export default Loader;
