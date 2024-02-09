"use client"
import React, { useState } from 'react';
import styles from './calculator.module.css';
import Image from 'next/image';

export default function Calculator() {
  const [sGender, setSGender] = useState('male');
  const [ft, setFt] = useState('');
  const [xAxis, setxAxis]=useState('');
  const [age, setAge] = useState('');
  const [month,setMonth]=useState('');
  const [htInIn, setHtInIn] = useState('');
  const [htInCm, setHtInCm] = useState('');
  const [isInches, setIsInches] = useState(true);
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('NaN');
  const [sCategory, setSCategory] = useState('Adult (Age 20+)'); 
  const [hCategory, setHCategory]=useState('');
  const [hwt1, sethwt1]=useState('');
  const [hwt2, sethwt2]=useState('');

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleFtChange = (event) => {
    setFt(event.target.value);
  };

  const handleInChange = (event) => {
    setHtInIn(event.target.value);
  };
  

  const handleHeightChange = (event) => {
    setHtInCm(event.target.value);
  };

  const handleUnitSwitch = () => {
    setFt(''); 
    setHtInIn(''); 
    setIsInches(!isInches);
	  setBmiResult('NaN'); 
  };

  const handleGenderChange = (gender) => {
    setSGender(gender);
  };
  

  async function handleCalculate(ev) {
    const response = await fetch('/api/bmi', {
      method: 'POST',
      body: JSON.stringify({ft, htInIn, htInCm, weight, isInches}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      const data = await response.json();
      setBmiResult(data.toFixed(2));
      if(isInches){
        let h1=(18.5/703)*(parseInt(ft)*12+parseInt(htInIn))*(parseInt(ft)*12+parseInt(htInIn));
        sethwt1(h1.toFixed(0));
        let h2=(25.0/703)*(parseInt(ft)*12+parseInt(htInIn))*(parseInt(ft)*12+parseInt(htInIn));
        sethwt2(h2.toFixed(0));
      }
      if(!isInches){
        let h1=18.5*parseInt(htInCm)*parseInt(htInCm)*0.0001;
        sethwt1(h1.toFixed(0));
        let h2=25.0*parseInt(htInCm)*parseInt(htInCm)*0.0001;
        sethwt2(h2.toFixed(0));
      }
      if(data<18.5){
        setHCategory('Underweight')
        setxAxis("100");
      }
      else if(data>=18.5 && data<25.0){
        setHCategory('Healthy')
        setxAxis("300");
      }
      else if(data>=25.0 && data<30.0){
        setHCategory('Overweight')
        setxAxis("500");
      }
      else if(data>30.0){
          setHCategory('Obese')
          setxAxis("700");
      }

    }
    else {
      alert("Error");
    }
  }

  return (
    <>
    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
      <div style={{ width: '80%'}}>
        <div className={styles.top}>
              <div className={styles.topCt}>
                <h1 className={styles.Tt}>BMI Calculator</h1>
                <h2 className={styles.Stt}>Use this calculator to check your body mass index (BMI).</h2>
              </div>
              <div>
                <Image className={styles.Logo} src="/bmi2.png" alt="" width={100} height={50} />
              </div>
        </div>
        <div className={styles.sGd}>
          <div className={styles.sLGd}>
            <div>
              <label className={styles.Label}>Select</label>
                <select value={sCategory} onChange={e => setSCategory(e.target.value)} style={{padding:'15px'}}>
                  <option value="Child (Age 5-19)">Child (Age 5-19)</option>
                  <option value="Adult (Age 20+)">Adult (Age 20+)</option>
                </select>
            </div>
            {sCategory==="Child (Age 5-19)"?(
              <div>
                <label className={styles.Label}>Age</label>
                  <div style={{display: 'flex'}}>
                        <div style={{width:'45%', marginRight: '20px', display:'flex', position:'relative'}}>
                            <input
                              type="number"
                              value={age}
                              onChange={handleAgeChange}
                              className={styles.Input}
                            />
                            <span className={styles.sf}>years</span>
                        </div>
                        <div style={{width:'50%', display:'flex', position:'relative'}}>
                          <input
                            type="number"
                            value={month}
                            onChange={handleMonthChange}
                            className={styles.Input}
                          />
                          <span className={styles.sf}>months</span>
                        </div>
                  </div>
                </div>
            ):(
              <div></div>
            )}

              <div>
                <label className={styles.Label}>Height</label>
                <div>
                <label style={{marginRight:'30px'}}>
                  <input type="radio" value="false" 
                                checked={isInches === false} 
                                onChange={e => setIsInches(false)} style={{marginRight:'5px' , accentColor: '#657E79'}}/>
                  Centimetres
                </label>
                <label>
                  <input type="radio" value="true" 
                                checked={isInches === true} 
                                onChange={e => setIsInches(true)}  style={{marginRight:'5px' , accentColor: '#657E79'}}/>
                  Feet and inches
                </label>
                </div>
                <div>
                {isInches?(
                  <div>
                    <div style={{display: 'flex'}}>
                        <div style={{width:'45%', marginRight: '20px', display:'flex', position:'relative'}}>
                          <input
                            type="number"
                            value={ft}
                            onChange={handleFtChange}
                            className={styles.Input}
                          />
                          <span className={styles.sf}>ft</span>
                        </div>
                        <div style={{width:'50%', display:'flex', position:'relative'}}>
                          <input
                            type="number"
                            value={htInIn}
                            onChange={handleInChange}
                            className={styles.Input}
                          />
                        <span className={styles.sf}>in</span>
                        </div>
                    </div>
                  </div>
                    ):(
                    <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={htInCm}
                        onChange={handleHeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.sf}>cms</span>
                      </div>)}
                </div>
              </div>
              

              <div>
                <label className={styles.Label}>Weight</label>
                <div>
                <label style={{marginRight:'30px'}}>
                  <input type="radio" value="false" 
                                checked={isInches === false} 
                                onChange={e => setIsInches(false)} style={{marginRight:'5px', accentColor: '#657E79'}}/>
                  Kilograms
                </label>
                <label>
                  <input type="radio" value="true" 
                                checked={isInches === true} 
                                onChange={e => setIsInches(true)} style={{marginRight:'5px', accentColor: '#657E79'}} />
                  Pounds
                </label>
                </div>
                <div>
                {isInches?(
                  <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.sf}>lbs</span>
                      </div>
                    ):(
                    <div style={{display:'flex', position:'relative'}}>
                      <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className={styles.Input}
                      />
                      <span className={styles.sf}>Kg</span>
                      </div>)}
                </div>
              </div>
              
              {sCategory==="Child (Age 5-19)"?(

                <div>
                  <label className={styles.Label}>Gender</label>
                  <div>
                    <label style={{marginRight:'30px'}}>
                      <input type="radio" value="male" 
                                    checked={sGender === 'male'} 
                                    onChange={e => handleGenderChange('male')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
                      Male
                    </label>
                    <label>
                      <input type="radio" value="female" 
                                    checked={sGender === 'female'} 
                                    onChange={e =>handleGenderChange('female')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
                      Female
                    </label>
                  </div>
                </div>
              ):(<div></div>)}
              
                <div className={styles.ButtonContainer}>
                  {bmiResult==='NaN'?(
                  <button onClick={handleCalculate} className={styles.CalculateButton}>
                    Calculate &gt;
                  </button>
                  ):(
                  <button onClick={handleCalculate} className={styles.CalculateButton}>
                    Recalculate &#10227;
                  </button>)}
                </div>
              </div>
            

             <div className={styles.stylesRightGrid}> {/*Right side division */}
              {bmiResult==='NaN'?(
                <div style={{textAlign:'center', fontWeight:'500'}}>
                  <p>Use this calculator to check your body mass index (BMI), </p>
                  <p>which can be a helpful tool in determining your weight category. </p>
                  <p>Or, use it to calculate your child’s BMI.</p>
                </div>
              ):(
              <div className={styles.RightContent}>
                <h1 style={{fontWeight:'bold'}}>Your Body Mass Index (BMI) is <span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{bmiResult}</span></h1><br /><hr /><br />
                <h1 style={{fontWeight:'bold'}}>According to your inputs, your weight is in the<span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{hCategory}</span>category</h1><br />
                <br /><br />
                <svg width="100%" height="300" style={{position:'absolute', zIndex:'2'}}>
                  <circle cx={xAxis} cy="25" r="18" stroke="white" stroke-width="4" fill="#657E79" />
                </svg> 
                <br />
                <div style={{display:'flex', position:'relative', zIndex:'1'}}>
                  <div style={{backgroundColor:'green', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'lightgreen', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'orange', width:'200px', height:'5px'}}></div>
                  <div style={{backgroundColor:'red', width:'200px', height:'5px'}}></div>
                </div>
                <br />
                <div style={{display:'flex', marginBottom:'20px'}}>
                  <div style={{width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Underweight</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Healthy</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Overweight</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', fontWeight:'bold'}}>Obese</div>
                </div>
                <div style={{display:'flex'}}>
                  <div style={{width:'200px', height:'5px', textAlign:'center',  color:'grey'}}>(Below 18.5)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(18.5 - 25.0)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(25.0 - 30.0)</div>
                  <div style={{ width:'200px', height:'5px', textAlign:'center', color:'grey'}}>(30.0 & Above)</div>
                </div>
                <br /><br /><hr /><br />
                <h1 style={{fontWeight:'bold'}}>For your height, a healthy weight would be between <span style={{fontSize:'40px', color:'#657E79', fontWeight:'bold', marginLeft:'10px', marginRight:'10px'}}>{hwt1} & {hwt2}</span>{isInches?("pounds"):("kilograms")}</h1>
              </div>)}
            </div>
          </div>
          </div>
        </div>
    </>
  );
}