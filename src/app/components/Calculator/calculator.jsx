"use client"
import React, { useState } from 'react';
import styles from './Calculator.module.css';
import Top from './Top';
import Lside from './Lside';
import Rside from './Rside';

export default function Calculator() {
  const [selGen, setSelGen] = useState('male');
  const [ft, setFt] = useState('');
  const [htInInc, setHtInInc] = useState('');
  const [htInCm, setHtInCm] = useState('');
  const [inc, setInc] = useState(true);
  const [age, setAge] = useState('');
  const [month,setMonth]=useState('');
  const [wt, setWt] = useState('');
  const [bmiResult, setBmiResult] = useState('NaN');
  const [selCat, setSelCat] = useState('Adult (Age 20+)'); 
  const [healthyCategory, setHealthyCategory]=useState('');
  const [healthywt1, sethealthywt1]=useState('');
  const [healthywt2, sethealthywt2]=useState('');
  const [xAxis, setxAxis]=useState('');

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleWtChange = (event) => {
    setWt(event.target.value);
  };

  const handleFtChange = (event) => {
    setFt(event.target.value);
  };

  const handleIncChange = (event) => {
    setHtInInc(event.target.value);
  };
  

  const handleHtChange = (event) => {
    setHtInCm(event.target.value);
  };

  const handleUnitSwitch = () => {
    setFt(''); 
    setHtInInc(''); 
    setInc(!inc);
	  setBmiResult('NaN'); 
  };

  const handleGenChange = (gender) => {
    setSelGen(gender);
  };
  

  function handleCalculate(ev) {
    let valid=false;

    if(inc){
      if((parseInt(ft)>=4 && parseInt(ft)<=8) && (parseInt(htInInc)>=0 && parseInt(htInInc)<=11) && (parseInt(wt)>=40 && parseInt(wt)<=600)){
        valid=true;
      }
    }
    else{
      if((parseInt(htInCm)>=100 && parseInt(htInCm)<=244) && (parseInt(wt)>=15 && parseInt(wt)<=272)){
        valid=true;
      }
    }

    if(selCat=="Child (Age 5-19)"){
      if(parseInt(age)<5 || parseInt(age)>19 || parseInt(month)>12){
        valid=false;
      }
    }

    if(valid){
      const queryString = `?ft=${ft}&htInInc=${htInInc}&htInCm=${htInCm}&wt=${wt}&inc=${inc}`;

      return fetch(`/api/bmi${queryString}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).then(response => {
          if (response.ok) {
            return response.json().then(data => {
              console.log("Data from API:", data); 
              setBmiResult(parseFloat(data).toFixed(2));
              console.log("BMI Result:", parseFloat(data).toFixed(2));
              if(inc){
                let h1=(18.5/703)*(parseInt(ft)*12+parseInt(htInInc))*(parseInt(ft)*12+parseInt(htInInc));
                sethealthywt1(h1.toFixed(0));
                let h2=(25.0/703)*(parseInt(ft)*12+parseInt(htInInc))*(parseInt(ft)*12+parseInt(htInInc));
                sethealthywt2(h2.toFixed(0));
              }
              if(!inc){
                let h1=18.5*parseInt(htInCm)*parseInt(htInCm)*0.0001;
                sethealthywt1(h1.toFixed(0));
                let h2=25.0*parseInt(htInCm)*parseInt(htInCm)*0.0001;
                sethealthywt2(h2.toFixed(0));
              }
              if(data<18.5){
                setHealthyCategory('Underweight')
                setxAxis("100");
              }
              else if(data>=18.5 && data<25.0){
                setHealthyCategory('Healthy')
                setxAxis("300");
              }
              else if(data>=25.0 && data<30.0){
                setHealthyCategory('Overweight')
                setxAxis("500");
              }
              else if(data>30.0){
                  setHealthyCategory('Obese')
                  setxAxis("700");
              }
            });
          }
            else {
              alert("Error");
            }
          }).catch(error => {
          console.log('error: ', error);
        });
      }
  }

  return (
    <>
    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
      <div style={{ width: '80%'}}>
        <Top/>
        <div className={styles.stylesSide}>
          <Lside
              selCat={selCat}
              setSelCat={setSelCat}
              selGen={selGen}
              handleGenChange={handleGenChange}
              age={age}
              month={month}
              handleAgeChange={handleAgeChange}
              handleMonthChange={handleMonthChange}
              ft={ft}
              htInInc={htInInc}
              handleFtChange={handleFtChange}
              handleIncChange={handleIncChange}
              htInCm={htInCm}
              handleHtChange={handleHtChange}
              wt={wt}
              handleWtChange={handleWtChange}
              inc={inc}
              setInc={setInc}
              handleCalculate={handleCalculate}
              bmiResult={bmiResult}
          />
          <Rside
              bmiResult={bmiResult}
              healthyCategory={healthyCategory}
              xAxis={xAxis}
              healthywt1={healthywt1}
              healthywt2={healthywt2}
              inc={inc}
          />
      </div>
    </div>
  </div>
  </>
  );
}