import { useState } from 'react';
import { TextField } from '@mui/material'
import './App.css';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //jscode
  
  const [height,setHeight] = useState()
  const [weight,setWeight] = useState()
  const [IsHeight,setIsHeight] = useState(true)
  const [IsWeight,setIsWeight] = useState(true)
  const [BMI,setBMI] = useState(null)

  const validate = (e)=>{
    const {name,value}=e.target
    if(!!value.match(/^[0-9]*.?[0-9]+$/)){
      if(name==='height'){
        setHeight(value)
        setIsHeight(true)
      }
      else if(name==='weight'){
        setWeight(value)
        setIsWeight(true)
      }
    }
    else{
      if(name==='height'){
        setHeight(value)
        setIsHeight(false)
      }
      else if(name==='weight'){
        setWeight(value)
        setIsWeight(false)
      }
    }
  }
  const handleCalculate= (e)=>{
    e.preventDefault()
    if(!height || !weight){
      toast.info('Please fill the form')
    }
    else{
        console.log(`Height : ${height}cm`);
      console.log(`Weight : ${weight}kg`);
      setBMI(Math.round((weight/((height*height)/ 10000)) * 10) / 10)
      console.log(BMI);
      /* toast.success(`Your BMI is ${BMI}`)
      */
      if(BMI < 18.6){
        toast.warning(`Under Weight :${BMI}`)
        setHeight(0)
        setWeight(0)
      }
      else if(BMI >= 18.6 && BMI < 24.9){
        toast.success(`Normal :${BMI}`)
        setHeight(0)
        setWeight(0)
      }
      else{
        toast.error(`Over Weight :${BMI}`)
        setHeight(0)
        setWeight(0)
      }
    }
  }
  return (
    <div style={{height:'100vh'}} className=' d-flex justify-content-center align-items-center w-100'>
      <div className=''>
        <h1 className='text-center text-light mb-5'>BMI Calculator</h1>
        <div style={{width:'500px'}} className='calc rounded-4 p-5'>
          <div className='ps-2 text-secondary'><p>Enter your height and weight in numbers</p></div>
          <form onSubmit={handleCalculate}>
            <div className="input-box p-2">
              <TextField color={!IsHeight && 'error'} onChange={(e)=>validate(e)} fullWidth id="outlined-basic" name='height' value={height ||''} label={ !IsHeight? 'Invalid input':"Height (in cm)"} variant="outlined"/>
            </div>
            <div className="input-box p-2">
              <TextField color={!IsWeight && 'error'} onChange={(e)=>validate(e)} fullWidth id="outlined-basic" name='weight' value={weight ||''} label={ !IsWeight? 'Invalid input':"Weight (in kg)"} variant="outlined" />
            </div>
            <div className="button-grp p-2 d-flex gap-2">
            <Button type='submit' style={{height:'50px'}} variant="dark w-100">Calculate</Button>
            <Button style={{height:'50px'}} variant="danger w-100">Reset</Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" closeOnClick draggable/>
    </div>
  );
}

export default App;
