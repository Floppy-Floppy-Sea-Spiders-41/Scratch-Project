import React from 'react'
import {useNavigate} from 'react-router-dom'

const HomepageContainer = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/search')
    }


  return (
    <>
    <div>HomepageContainer!!!</div>
    <button onClick={handleClick}>Search Page</button>
    </>
  )
}

export default HomepageContainer