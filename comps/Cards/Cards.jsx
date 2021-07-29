import * as React from "react";
import Box from "@material-ui/core/Box";
import { Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../../comps/Cards/Cards.module.css";
import Loader from "../Loader/Loader";
import Button from '@material-ui/core/Button';

import { css, cx } from "@emotion/css";
import CountUp from "react-countup";

const Cards = ({ data : { confirmed, recovered, deaths, lastUpdate }}) => {
  if (!confirmed) {
    return <Loader></Loader>;
  }

  const dataArray =[confirmed, recovered, deaths, lastUpdate];
  console.log(dataArray);

  // console.log(data)

  return (

    <Box className={styles.cardsDiv}>  
      <Card sx={{ minWidth: 275 }} className={cx(styles.card, styles.infected)}>
        <CardContent>
          <Typography sx={{ fontSize: 14 , margin:"8px" }} color="text.secondary" gutterBottom>
            Infected
          </Typography>

          <CountUp
            start={0}
            end={confirmed.value}
            duration={2.5}
            separator=","
          ></CountUp>
          <Typography sx={{ fontSize: 14, margin:"8px" }} color="text.secondary" gutterBottom>
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2" sx={{ margin:"8px" }}>Number of Active cases of COVID-19</Typography>
        </CardContent>
       
      </Card>

      <Card sx={{ minWidth: 275 }} className={cx(styles.card, styles.recovered)}>
        <CardContent>
          <Typography sx={{ fontSize: 14, margin:"8px" }} color="text.secondary" gutterBottom>
            Recovered
          </Typography>
          <CountUp start={0}
            end={recovered.value}
            duration={2.5}
            separator=","></CountUp>
            <Typography sx={{ fontSize: 14, margin:"8px" }} color="text.secondary" gutterBottom>
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2" sx={{ margin:"8px" }}>Number of Recoveries from COVID-19</Typography>
           
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className={cx(styles.card, styles.deaths)} >
        <CardContent>
          <Typography sx={{ fontSize: 14, margin:"8px" }} color="text.secondary" gutterBottom>
            Deaths
          </Typography>
          <CountUp start={0}
            end={deaths.value}
            duration={2.5}
            separator=","></CountUp>
            <Typography sx={{ fontSize: 14, margin:"8px" }} color="text.secondary" gutterBottom>
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2" sx={{ margin:"8px" }}>Number of Deaths from COVID-19</Typography>
        </CardContent>
      </Card>

    </Box>

    // null
  );
};

export default Cards;
