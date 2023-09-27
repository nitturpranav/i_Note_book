import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const navigate = useNavigate();
  
  const [credential, setCredentials] = useState({name:'', email: '', password: '' });


  const handleSubmit = async (e) => {
    e.preventDefault();
  const {name,email,password}=credential; 
    // todo api call 
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email,password}),
    });

    if (response.ok) {
      const json = await response.json();
      // Save auth token and navigate
      localStorage.setItem('token', json.authtoken);
      navigate('/home');
      props.showalert("Account Created Successfully","success") 
    } else {
      // Handle invalid credentials
      props.showalert("Invalid Credentials","danger") 
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mt-3'>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' id="name" value={credential.name} onChange={onChange} aria-describedby="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  name='email' value={credential.email}  id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
