import React from 'react'
//import { useState, useEffect } from 'react'

const ErrorChecker = ({errorMessage, completionStatus, completionChecker}) => {

  const message = () =>
    {
      return completionStatus
      ? (<div style={{color: 'green'}}>Completed!</div>)
      : errorMessage.map((error) => (<div style={{color: 'red'}}>{error}</div>))
    }

  return (
    <div>
      <button onClick={() =>completionChecker()}>Check Answers</button>
      {
        message()
      }
    </div>
      
    
  )

  
}

export default ErrorChecker
