import Box from "@material-ui/core/Box";
import Image from "next/image";
import styles from "../Loader/Loader.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { css } from "@emotion/react";

import useState from "react";

const Loader = () => {
  return (
    <Box className={styles.loader}>
      <CircularProgress size={"6.5rem"}></CircularProgress>
    </Box>
  );
};

export default Loader;
