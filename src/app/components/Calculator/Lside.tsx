import React from "react";
import styles from './Calculator.module.css';
import Btn from './Btn';

export default function Lside({
	selCat,
	setSelCat,
	selGen,
	handleGenChange,
	age,
	month,
	handleAgeChange,
	handleMonthChange,
	ft,
	htInInc,
	handleFtChange,
	handleIncChange,
	htInCm,
	handleHtChange,
	wt,
	handleWtChange,
	inc,
	setInc,
	handleCalculate,
	bmiResult,
  }){

	return(
		<div className={styles.stylesLside}>
			<div>
			<label className={styles.Label}>Select</label>
				<select value={selCat} onChange={e => setSelCat(e.target.value)} style={{padding:'15px'}}>
				<option value="Child (Age 5-19)">Child (Age 5-19)</option>
				<option value="Adult (Age 20+)">Adult (Age 20+)</option>
				</select>
			</div>
			{selCat==="Child (Age 5-19)"?(
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
							<span className={styles.ym}>years</span>
						</div>
						<div style={{width:'50%', display:'flex', position:'relative'}}>
						<input
							type="number"
							value={month}
							onChange={handleMonthChange}
							className={styles.Input}
						/>
						<span className={styles.ym}>months</span>
						</div>
				</div>
				<div className={styles.inInvalid}>
					{(parseInt(age)>=5  && parseInt(age)<=19) || age=="" ? (<div></div>):(<span>Please enter an age between 5 and 19 years. </span> )}
					{(parseInt(month)>=0  && parseInt(month)<=11) || month=="" ? (<div></div>):(<span>Please enter an age between 0 and 11 months.</span> )}
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
								checked={inc === false} 
								onChange={e => setInc(false)} style={{marginRight:'5px' , accentColor: '#657E79'}}/>
				Centimetres
				</label>
				<label>
				<input type="radio" value="true" 
								checked={inc === true} 
								onChange={e => setInc(true)}  style={{marginRight:'5px' , accentColor: '#657E79'}}/>
				Feet and inches
				</label>
				</div>
				<div>
				{inc?(
				<div>
					<div>
					<div style={{display: 'flex'}}>
						<div style={{width:'45%', marginRight: '20px', display:'flex', position:'relative'}}>
							<input
							type="number"
							value={ft}
							onChange={handleFtChange}
							className={styles.Input}
							/>
							<span className={styles.ym}>ft</span>
						</div>
						<div style={{width:'50%', display:'flex', position:'relative'}}>
							<input
							type="number"
							value={htInInc}
							onChange={handleIncChange}
							className={styles.Input}
							/>
						<span className={styles.ym}>in</span>
						</div>
					</div>
					</div>
					<div className={styles.inInvalid}>
						{(parseInt(ft)>=0  && parseInt(ft)<=11) || ft=="" ? (<div></div>):(<span>Height value must be between 4 and 8 feet. </span> )}
						{(parseInt(htInInc)>=4  && parseInt(htInInc)<=8) || htInInc=="" ? (<div></div>):(<span>Please enter a value between 0 and 11 inches </span> )}
					</div>
				</div>
					):(
					<div>
						<div style={{display:'flex', position:'relative'}}>
						<input
							type="number"
							value={htInCm}
							onChange={handleHtChange}
							className={styles.Input}
						/>
						<span className={styles.ym}>cms</span>
						</div>
						<div className={styles.inInvalid}>
						{(parseInt(htInCm)>=100  && parseInt(htInCm)<=244) || htInCm=="" ? (<div></div>):(<span>Please enter a value between 100 and 244 cm </span> )}
						</div>
					</div> 
					)}
				</div>
			</div>
			

			<div>
				<label className={styles.Label}>Weight</label>
				<div>
				<label style={{marginRight:'30px'}}>
				<input type="radio" value="false" 
								checked={inc === false} 
								onChange={e => setInc(false)} style={{marginRight:'5px', accentColor: '#657E79'}}/>
				Kilograms
				</label>
				<label>
				<input type="radio" value="true" 
								checked={inc === true} 
								onChange={e => setInc(true)} style={{marginRight:'5px', accentColor: '#657E79'}} />
				Pounds
				</label>
				</div>
				<div>
				{inc?(
					<div>
						<div style={{display:'flex', position:'relative'}}>
							<input
							type="number"
							value={wt}
							onChange={handleWtChange}
							className={styles.Input}
							/>
							<span className={styles.ym}>lbs</span>
						</div>
						<div className={styles.inInvalid}>
						{(parseInt(wt)>=40  && parseInt(wt)<=600) || wt=="" ? (<div></div>):(<span>Please enter a weight between 40 and 600 pounds </span> )}
						</div>
					</div>
					):(
					<div>
						<div style={{display:'flex', position:'relative'}}>
							<input
							type="number"
							value={wt}
							onChange={handleWtChange}
							className={styles.Input}
							/>
							<span className={styles.ym}>Kg</span>
						</div>
						<div className={styles.inInvalid}>
						{(parseInt(wt)>=15  && parseInt(wt)<=272) || wt=="" ? (<div></div>):(<span>Please enter a weight between 15 and 272 Kilogram </span> )}
						</div>
					</div>
					
					)}
				</div>
			</div>
			
			{selCat==="Child (Age 5-19)"?(

				<div>
				<label className={styles.Label}>Gender</label>
				<div>
					<label style={{marginRight:'30px'}}>
					<input type="radio" value="male" 
									checked={selGen === 'male'} 
									onChange={e => handleGenChange('male')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
					Male
					</label>
					<label>
					<input type="radio" value="female" 
									checked={selGen === 'female'} 
									onChange={e =>handleGenChange('female')} style={{marginRight:'5px', accentColor: '#657E79'}}/>
					Female
					</label>
				</div>
				</div>
			):(<div></div>)}
			
			<Btn
				bmiResult={bmiResult}
				handleCalculate={handleCalculate}
			/>
		  </div>
	)
}