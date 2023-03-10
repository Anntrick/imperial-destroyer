import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPlanets, markAsConquered, markAsDeleted, sortPlanets, setError, planetsData } from "./planetsSlice"
import { SwapiService } from '../../services/swapiService'

import './Planets.scss'
import { Loading } from "../../components/Loading/Loading"
import { ItemCard } from "../../components/ItemCard/ItemCard"
import { Pagination } from "../../components/Pagination/Pagination"

export const Planets = () => {
  const dispatch = useDispatch()
  const planets = useSelector(planetsData)
  const plPerPage = 6
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getPlanets()

  }, [])

  const getPlanets = async () => {
    try {
      const data = await SwapiService.getPlanets()
      dispatch(addPlanets(data))
      setLoading(false)
    } catch (error) {
      //dispatch(setError(error))
    }

  }

  const handleSort = (field) => {
    dispatch(sortPlanets({ field }))
  }

  const filteredPlanets = planets?.items?.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPl = currentPage * plPerPage;
	const indexOfFirstPl = indexOfLastPl - plPerPage;
  const pagPlanets = filteredPlanets?.slice(indexOfFirstPl, indexOfLastPl)

  return (
    <div className="Planets">
      <h2>Planets</h2>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by planet name" />
      <button onClick={() => handleSort("name")}>Sort by Name</button>

      {loading &&
        <Loading />
      }

      <ul>
        {pagPlanets?.map((planet) => (
          <ItemCard data={planet} key={planet.name} errorImg="/planets/default.jpeg"/>
        ))}
      </ul>

      {filteredPlanets?.length > plPerPage && 
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredPlanets.length} itemsPerPage={plPerPage}/>
      }
    </div>

  )
}