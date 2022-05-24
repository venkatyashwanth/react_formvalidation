import {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const initialValues = {username: '',email: '',password: ''};
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }
  useEffect(()=>{
    if(Object.keys(formErrors).length===0 && isSubmit){
      console.log("No Errors");
    }
  },[formErrors]);

  const validate = (values) =>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.username){
      errors.username = 'Username is required';
    }
    
    if(!values.email){
      errors.email = "Email is required";
    }else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format"
    }

    if(!values.password){
      errors.password = "Password is required";
    }else if(values.password.length <= 4){
      errors.password = "Password must be greater than 4 and less than 10 words"
    }else if(values.password.length >= 10){
      errors.password = "Password must be greater than 4 and less than 10 words"
    }

    return errors;
  }



  return (
    <>
      <div className="container">
        {Object.keys(formErrors).length===0 && isSubmit?
        (<p className='text-light'>Form Validated</p>):
        (<p className='text-light'>Not Validated</p>)}
        <form onSubmit={handleSubmit}>
          <h3 className='text-center'>Login Form Validation</h3>
            <div className="form-group mt-2">
              <label>Username </label>
              <input type="text" name="username" className='form-control'onChange={handleChange}/>
            </div>
            <p className='text-danger'>{formErrors.username}</p>
            <div className="form-group mt-2">
              <label>Email </label>
              <input type="text" name="email" className='form-control' onChange={handleChange}/>
            </div>
            <p className='text-danger'>{formErrors.email}</p>
            <div className="form-group mt-2">
              <label>Password </label>
              <input type="password" name="password" className='form-control' onChange={handleChange}/>
            </div>
            <p className='text-danger'>{formErrors.password}</p>
            <input type="submit" value="Add" className='btn btn-success mt-3'/>
        </form>
      </div>
    </>
  );
}

export default App;
