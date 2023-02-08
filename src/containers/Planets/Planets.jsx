import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPlanets, markAsConquered, markAsDeleted, sortPlanets, setError, planetsData } from "./planetsSlice"
import { SwapiService } from '../../services/swapiService'

import './Planets.scss'
import { Loading } from "../../components/Loading/Loading"
import { ItemCard } from "../../components/ItemCard/ItemCard"

export const Planets = () => {
  const dispatch = useDispatch()
  const planets = useSelector(planetsData)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    getPlanets()

  }, [])

  const getPlanets = async () => {
    try {
      const data = await SwapiService.getPlanets()
      dispatch(addPlanets(data))
    } catch (error) {
      dispatch(setError(error))
    }

  }

  const handleSort = (field) => {
    setSortBy(field)
    dispatch(sortPlanets({ field }))
  }

  const filteredPlanets = planets?.items?.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="Planets">
      <h2>Planets</h2>
      {planets?.length === 0 &&
        <Loading />
      }


      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by planet name" />
      <button onClick={() => handleSort("name")}>Sort by Name</button>
      <ul>
        {filteredPlanets?.map((planet) => (
          <ItemCard data={planet} key={planet.name} />
        ))}


      </ul>
    </div>


  )

}