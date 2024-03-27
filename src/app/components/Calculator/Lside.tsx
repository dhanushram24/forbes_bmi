import React from "react";
import Btn from './Btn';
import styles from './calculator.module.css';
import Input from '../Input/Input';
import { useForm } from "react-hook-form";

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
	bmiResult,
}) {

	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async (data) => {

	}



	return (
		<div className={styles.stylesLside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label className={styles.Label}>Select</label>
					<select value={selCat} onChange={e => setSelCat(e.target.value)} style={{ padding: '15px', width: '100%', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '5px', marginRight: '10px' }}>
						<option value="Child (Age 5-19)">Child (Age 5-19)</option>
						<option value="Adult (Age 20+)">Adult (Age 20+)</option>
					</select>
				</div>
				{selCat === "Child (Age 5-19)" ? (
					<div>
						<label className={styles.Label}>Age</label>
						<div style={{ display: 'flex' }}>
							<div style={{ width: '45%', marginRight: '20px' }}>
								<Input
									label="Years"
									name="years"
									onChange={handleAgeChange}
									value={age}
									control={control}
									rules={{ required: true, min: 5, max: 19 }}
									errorMessage="Please enter an age between 5 and 19 years."
									errors={errors}
								/>
							</div>
							<div style={{ width: '50%', position: 'relative' }}>
								<Input
									label="Months"
									name="months"
									onChange={handleMonthChange}
									value={month}
									control={control}
									rules={{ required: true, min: 0, max: 11 }}
									errorMessage="Please enter an age between 0 and 11 months."
									errors={errors}
								/>
							</div>
						</div>
					</div>
				) : (
					<div></div>
				)}

				<div>
					<label className={styles.Label}>Height</label>
					<div>
						<label style={{ marginRight: '30px' }}>
							<input type="radio" value="false"
								checked={inc === false}
								onChange={e => setInc(false)} style={{ marginRight: '5px', accentColor: '#657E79' }} />
							Centimetres
						</label>
						<label>
							<input type="radio" value="true"
								checked={inc === true}
								onChange={e => setInc(true)} style={{ marginRight: '5px', accentColor: '#657E79' }} />
							Feet and inches
						</label>
					</div>
					<div>
						{inc ? (
							<div>
								<div>
									<div style={{ display: 'flex' }}>
										<div style={{ width: '45%', marginRight: '20px', position: 'relative' }}>
											<Input
												label="Feet"
												name="feet"
												onChange={handleFtChange}
												value={ft}
												control={control}
												rules={{ required: true, min: 0, max: 8 }}
												errorMessage="Height value must be between 0 and 8 feet."
												errors={errors}

											/>
										</div>
										<div style={{ width: '50%', position: 'relative' }}>
											<Input
												label="Inches"
												name="inches"
												onChange={handleIncChange}
												value={htInInc}
												control={control}
												rules={{ required: true, min: 0, max: 11 }}
												errorMessage="Please enter a value between 0 and 11 inches."
												errors={errors}
											/>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div>
								<div style={{ width: '100%', marginRight: '20px', position: 'relative' }}>
									<Input
										label="Centimeter"
										name="cm"
										onChange={handleHtChange}
										value={htInCm}
										control={control}
										rules={{ required: true, min: 100, max: 244 }}
										errorMessage="Please enter a height between 100 and 244 Kilograms."
										errors={errors}
									/>
								</div>
							</div>
						)}
					</div>
				</div>


				<div>
					<label className={styles.Label}>Weight</label>
					<div >
						<label style={{ marginRight: '30px' }}>
							<input type="radio" value="false"
								checked={inc === false}
								onChange={e => setInc(false)} style={{ marginRight: '5px', accentColor: '#657E79' }} />
							Kilograms
						</label>
						<label>
							<input type="radio" value="true"
								checked={inc === true}
								onChange={e => setInc(true)} style={{ marginRight: '5px', accentColor: '#657E79' }} />
							Pounds
						</label>
					</div>
					<div>
						{inc ? (
							<div>
								<div style={{ position: 'relative' }}>
									<Input
										label="lbs"
										name="lbs"
										onChange={handleWtChange}
										value={wt}
										control={control}
										rules={{ required: true, min: 40, max: 600 }}
										errorMessage="Please enter a weight between 40 and 600 Pounds."
										errors={errors}

									/>
								</div>

							</div>
						) : (
							<div>
								<div style={{ width: '100%', marginRight: '20px', position: 'relative' }}>
									<Input
										label="Kilograms"
										name="kilograms"
										onChange={handleWtChange}
										value={wt}
										control={control}
										rules={{ required: true, min: 15, max: 272 }}
										errorMessage="Please enter a weight between 15 and 272 Kilograms."
										errors={errors}
									/>
								</div>

							</div>

						)}
					</div>
				</div>

				{selCat === "Child (Age 5-19)" ? (

					<div>
						<label className={styles.Label}>Gender</label>
						<div>
							<label style={{ marginRight: '30px' }}>
								<input type="radio" value="male"
									checked={selGen === 'male'}
									onChange={e => handleGenChange('male')} style={{ marginRight: '5px', accentColor: '#657E79' }} />
								Male
							</label>
							<label>
								<input type="radio" value="female"
									checked={selGen === 'female'}
									onChange={e => handleGenChange('female')} style={{ marginRight: '5px', accentColor: '#657E79' }} />
								Female
							</label>
						</div>
					</div>
				) : (<div></div>)}
				<Btn bmiResult={bmiResult} />
			</form>
		</div>
	)
}