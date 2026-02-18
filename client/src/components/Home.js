import React from 'react'
import Notes from './Notes';



const Home = () => {
  
  return (
    <div className=" my-3">
      <h2>Create notes</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

      <h2 className='my-3'>Your Notes</h2>
      <Notes/>
      
    </div>
  )
}

export default Home
