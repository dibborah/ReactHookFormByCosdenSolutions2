// Create a Simple Form in React

import { useState } from "react"


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email: string, password: string}>({
    email: "",
    password: ""
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({email: '', password: ''});

    if(!email.includes('@')) {
      setErrors({...errors, email: 'The email must include @'});
      return;
    }
    if(password.length < 8){
      setErrors({...errors, password: "The length of password must be greater than 8"});
      return;
    }
    // Form Submited
    console.log("Form is submitted");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errors.email && (
        <div style={{color: "red"}}> {errors.email}</div>
      )}
      <div>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors.password && (
        <div style={{color: "red"}}> {errors.password}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}

export default App