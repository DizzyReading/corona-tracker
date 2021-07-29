import React from 'react'
import { useState, useEffect } from 'react';
import { fetchDailyData} from '../../pages/api/index';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';
import { css, cx } from "@emotion/css";
import Loader from '../Loader/Loader'
import { defaults } from 'react-chartjs-2';
import { Button } from '@material-ui/core';



const Chart = ({isClicked, countryHistData, data:{confirmed, deaths, recovered}, country}) => {
 

  const [dailyData, setDailyData] = useState({
    date:[],
    cases:[],
    recovered:[],
    deaths:[]
  });

useEffect(async () => {

const response = await fetchDailyData();

setDailyData({

...dailyData.date, date: Object.keys(response.cases), 
...dailyData.cases, cases: Object.values(response.cases),
...dailyData.recovered, recovered: Object.values(response.recovered),
...dailyData.deaths, deaths: Object.values(response.deaths)

})


  }, []);

  const lineChart = (


  dailyData ? (  <Line className={css`
    padding:2rem 
    `}
 options= {
{
        plugins: {
            title: {
                display: true,
                text: 'Worldwide Daily Data',
                          
            }
        }
    }
 }
    data={
      {
        labels: dailyData.date.map((date) => date),
        datasets: [{
          
          data: dailyData.cases.map((cases) => cases),
          label:'Infected',
          borderColor: '#3333ff',
          fill: true

        }, {

          data: dailyData.deaths.map((deaths) => deaths),
          label:'Deceased',
          borderColor: 'rgba(255, 0, 0, 0.5)',
          fill: true
          
        }, {

          data: dailyData.recovered.map((recovered) => recovered),
          label: 'Recovered',
          borderColor: 'rgba(0, 255, 0, 0.5)',
          fill:true

        }],

    }

    }></Line>) : (<Loader></Loader>)

  )


  const countryHistDataLineChart = (

countryHistData ? (  <Line className={css`
    padding:2rem 
    `}
 options= {
{
        plugins: {
            title: {
                display: true,
                text: 'Historical Data for ' + country,
                          
            }
        }
    }
 }
    data={
      {
        labels:  Object.keys(countryHistData.cases).map((date) => date),
        datasets: [{
          
          data: Object.values(countryHistData.cases).map((cases) => cases),
          label:'Infected',
          borderColor: '#3333ff',
          fill: true

        }, {

          data: Object.values(countryHistData.deaths).map((deaths) => deaths),
          label:'Deceased',
          borderColor: 'rgba(255, 0, 0, 0.5)',
          fill: true
          
        }, {

          data: Object.values(countryHistData.recovered).map((recovered) => recovered),
          label: 'Recovered',
          borderColor: 'rgba(0, 255, 0, 0.5)',
          fill:true

        }],

    }

    }></Line>) : (<Loader></Loader>)

  )

  const barChart = (

    confirmed ? ( 
    <>
    <Bar
    className={css`
    padding:2rem 
    `}
    data= {{
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [{
        label: 'People',
        backgroundColor:[
          '#3333ff',
           'rgba(0, 255, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)',
         

        ],
        data:[
          confirmed.value,
          recovered.value,
          deaths.value,
          
        ]
      }]
    }}

    options={
      {
         plugins: {
            title: {
                display: true,
                text: 'Current State in ' + country,
                          
            }
        }
      }
    }
    >

    </Bar>
  
    </>
    ) : (<Loader></Loader> )
   
  )


  // console.log(countryHistData)
  // console.log(country)

//   console.log(dailyData);
// console.log(countryHistData);
// console.log('country is ' + country)

  return (

   <div>
    
     { 
      countryHistData === undefined  ? (lineChart) :  

      isClicked ? (countryHistDataLineChart) : 

      country ? (barChart) : (lineChart)

      }
   </div>
 
    // null
  
  );
};

export default React.memo(Chart);


