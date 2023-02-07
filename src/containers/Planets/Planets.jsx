import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPlanets, markAsConquered, markAsDeleted, sortPlanets, setError, planetsSelector } from "./planetsSlice"
import { SwapiService } from '../../services/swapiService'

import './Planets.scss'

export const Planets = () => {
  
  return (

    <div className="Planets">
    
    </div>


  )

}