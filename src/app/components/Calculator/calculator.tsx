"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './calculator.module.css';
export default function Calculator() {
  const [selectedGender, setSelectedGender] = useState('male');
  const [feet, setFeet] = useState('');
  const [heightInInches, setHeightInInches] = useState('');
  const [heightInCm, setHeightInCm] = useState('');
  const [isInches, setIsInches] = useState(true);
  const [age, setAge] = useState('');
  const [month, setMonth] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [chartData, setChartData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Adult (Age 20+)'); 
  const [healthyCategory, setHealthyCategory]=useState('');
  const [healthyweight1, sethealthyweight1]=useState('');
  const [healthyweight2, sethealthyweight2]=useState('');
  const [xAxis, setxAxis] = useState('');
  const handleAgeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };
  const handleMonth = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleWeightChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleFeetChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFeet(event.target.value);
  };

  const handleInchesChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHeightInInches(event.target.value);
  };
  

  const handleHeightChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHeightInCm(event.target.value);
  };

  const handleUnitSwitch = () => {
    setFeet(''); 
    setHeightInInches(''); 
    setIsInches(!isInches);
	  setBmiResult('NaN'); 
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };
  useEffect(() => {
    const bmiChartData = {
      labels: ['BMI'],
      datasets: [
        {
          label: 'Underweight',
          backgroundColor: 'darkgreen',
          data: [{ x: 0, y: 18.5 }],
        },
        {
          label: 'Healthy',
          backgroundColor: 'lightgreen',
          data: [{ x: 18.5, y: 25.0 }],
        },
        {
          label: 'Overweight',
          backgroundColor: 'orange',
          data: [{ x: 25.0, y: 30.0 }],
        },
        {
          label: 'Obese',
          backgroundColor: 'red',
          data: [{ x: 30.0, y: 40.0 }], 
        },
      ],
    };
    setChartData(bmiChartData);
  }, []);

 async function handleCalculate() {
    const response = await fetch('/api/bmi', {
      method: 'POST',
      body: JSON.stringify({feet, heightInInches, heightInCm, weight, isInches}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      const data = await response.json();
      setBmiResult(data.toFixed(2));
      if(isInches){
        let h1 = (18.5 / 703) * (parseInt(feet) * 12 + parseInt(heightInInches)) * (parseInt(feet) * 12 + parseInt(heightInInches));

        sethealthyweight1(h1.toFixed(0));
        let h2 = (25.0 / 703) * (parseInt(feet) * 12 + parseInt(heightInInches)) * (parseInt(feet) * 12 + parseInt(heightInInches));

        sethealthyweight2(h2.toFixed(0));
      }
      if(!isInches){
        let h1=18.5*parseInt(heightInCm)*parseInt(heightInCm)*0.0001;
        sethealthyweight1(h1.toFixed(0));
        let h2=25.0*parseInt(heightInCm)*parseInt(heightInCm)*0.0001;
        sethealthyweight2(h2.toFixed(0));
      }
      if(data<18.5){
        setHealthyCategory('Underweight')
        setxAxis("30");
      }
      else if(data>=18.5 && data<25.0){
        setHealthyCategory('Healthy')
        setxAxis("120");
      }
      else if(data>=25.0 && data<30.0){
        setHealthyCategory('Overweight')
        setxAxis("200");
      }
      else if(data>30.0){
          setHealthyCategory('Obese')
          setxAxis("280");
      }

    }
    else {
      alert("Error");
    }
  }


  return (
    <>
    <div style={{display: 'flex', justifyContent:'center'}}>
      <div style={{ width: '80%'}}>
        <div className={styles.Header}>
              <div className={styles.HeaderContent}>
                <h1 className={styles.Title}>BMI Calculator</h1>
                <h2 className={styles.Subtitle}>Use this calculator to check your body mass index (BMI).</h2>
              </div>
              <Image className={styles.Logo} src="/bmi2.png" alt="" width={100} height={50} />
        </div>

        <div style={{width:'30%'}}>
          <div className={styles.SelectContainer}>
        <label className={styles.Label}>Select</label>
    <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className={styles.SelectDropdown}
  >
    <option value="Child (Age 5-19)">Child (Age 5-19)</option>
    <option value="Adult (Age 20+)">Adult (Age 20+)</option>
  </select>
</div>

          {selectedCategory==="Child (Age 5-19)"?(
            <div>
              <label className={styles.Label}>Age</label>
                <div style={{display: 'flex'}}>
                        <div style={{width:'45%', marginRight: '20px'}}>
                        <input
                          type="number"
                          value={age}
                          onChange={handleAgeChange}
                          placeholder="years"
                          className={styles.Input}
                        />
                      </div>
                      <div style={{width:'50%'}}>
                        <input
                          type="number"
                          value={month}
                          onChange={handleMonth}
                          placeholder="months"
                          className={styles.Input}
                        />
                      </div>
                </div>
              </div>
          ):(
            <div></div>
          )}

            <div>
              <label className={styles.Label}>Height</label>
              <div>
              <label className={styles.RadioButtonLabel}>
                <input type="radio" value="false" 
                              checked={isInches === false} 
                              onChange={e => setIsInches(false)} />
                Centimetres
              </label>
              <label>
                <input type="radio" value="true" 
                              checked={isInches === true} 
                              onChange={e => setIsInches(true)} />
                Feet and inches
              </label>
              </div>
              <div>
              {isInches?(
                <div>
                  <div style={{display: 'flex'}}>
                      <div style={{width:'45%', marginRight: '20px'}}>
                        <input
                          type="number"
                          value={feet}
                          onChange={handleFeetChange}
                          placeholder="ft"
                          className={styles.Input}
                        />
                      </div>
                      <div style={{width:'50%'}}>
                        <input
                          type="number"
                          value={heightInInches}
                          onChange={handleInchesChange}
                          placeholder="in"
                          className={styles.Input}
                        />
                      </div>
                  </div>
                </div>
                  ):(
                  <div>
                    <input
                      type="number"
                      value={heightInCm}
                      onChange={handleHeightChange}
                      placeholder="cm"
                      className={styles.Input}
                    />
                    </div>)}
              </div>
            </div>
            

            <div>
              <label className={styles.Label}>Weight</label>
              <div>
              <label className={styles.RadioButtonLabel}>
                <input type="radio" value="false" 
                              checked={isInches === false} 
                              onChange={e => setIsInches(false)} />
                 Kilograms
              </label>
              <label>
                <input type="radio" value="true" 
                              checked={isInches === true} 
                              onChange={e => setIsInches(true)} />
                 Pounds
              </label>
              </div>
              <div>
              {isInches?(
                <div>
                    <input
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                      placeholder="lbs"
                      className={styles.Input}
                    />
                    </div>
                  ):(
                  <div>
                    <input
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                      placeholder="kg"
                      className={styles.Input}
                    />
                    </div>)}
              </div>
            </div>
            
            {selectedCategory==="Child (Age 5-19)"?(

              <div>
                <label className={styles.Label}>Gender</label>
                <div>
                  <label>
                    <input type="radio" value="male" 
                                  checked={selectedGender === 'male'} 
                                  onChange={e => handleGenderChange('male')} />
                    Male
                  </label>
                  <label>
                    <input type="radio" value="female" 
                                  checked={selectedGender === 'female'} 
                                  onChange={e =>handleGenderChange('female')} />
                    Gender
                  </label>
                </div>
              </div>
            ):(<div></div>)}
            
              <div className={styles.ButtonContainer}>
        <button onClick={handleCalculate} className={styles.CalculateButton}>
          Calculate
        </button>
        <h1 style={{ fontWeight: 'bold' }}>
          
          Your Body Mass Index (BMI) is{' '}
          <span style={{ fontSize: '40px', color: '#657E79', fontWeight: 'bold', marginLeft: '10px', marginRight: '5px' }}>
            {bmiResult}
          </span>
        </h1>
        <hr style={{ width: '100%', margin: '30px auto', borderTop: '2px solid #657E79' }} />
      </div>

      <svg width="70%" height="250" style={{ position: 'absolute', zIndex: '2' }}>
         <circle cx={xAxis} cy="25" r="18" stroke="#657E79" fill="#657E79" />
      </svg>


                <br />
                <div style={{display:'flex', position:'relative', zIndex:'1'}}>
                  <div style={{backgroundColor:'green', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'lightgreen', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'orange', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'red', width:'200px', height:'5px'}}></div>
                </div>
                <br/>
                <div style={{display:'flex', marginBottom:'20px'}}>
                  <div style={{width:'300px', height:'10px', textAlign:'center', fontWeight:'bold'}}>Underweight </div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', fontWeight:'bold'}}>Healthy </div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', fontWeight:'bold'}}>Overweight </div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', fontWeight:'bold'}}>Obese</div>
                </div>
                <div style={{display:'flex'}}>
                  <div style={{width:'300px', height:'10px', textAlign:'center',  color:'grey'}}>(Below 18.5)</div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', color:'grey'}}>(18.5 - 25.0)</div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', color:'grey'}}>(25.0 - 30.0)</div>
                  <div style={{ width:'300px', height:'10px', textAlign:'center', color:'grey'}}>(30.0 & Above)</div>
                </div>
              <br/>
              <br/>
              <hr style={{ width: '100%', margin: '30px auto', borderTop: '2px solid #657E79' }} />
              <h1 style={{fontWeight:'bold'}}>According to your inputs, your weight is in the<span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{healthyCategory}</span>category</h1>
              <hr style={{ width: '100%', margin: '30px auto', borderTop: '2px solid #657E79' }} />
              <h1 style={{fontWeight:'bold'}}>For your height, a healthy weight would be between <span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{healthyweight1} & {healthyweight2}</span>{isInches?("pounds"):("kilograms")}</h1>
               
                <div/>
                </div>
            </div>
          </div>
          <div>
      </div>
        
    </>
  );
}
