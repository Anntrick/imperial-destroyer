import './Starships.scss'

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addStarships, markAsConquered, markAsDeleted, sortStarships, setError, starshipsData } from "./starshipsSlice"
import { SwapiService } from '../../services/swapiService'

import { Loading } from "../../components/Loading/Loading"
import { ItemCard } from "../../components/ItemCard/ItemCard"

export const Starships = () => {
  const dispatch = useDispatch()
  const starships = useSelector(starshipsData)

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getStarships()

  }, [])

  const getStarships = async () => {
    try {
      const data = await SwapiService.getStarships()
      dispatch(addStarships(data))
      setLoading(false)
    } catch (error) {
      dispatch(setError(error))
    }

  }

  const handleSort = (field) => {
    dispatch(sortStarships({ field }))
  }

  const filteredStarships = starships?.items?.filter((starship) =>
    starship.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="Starships">
      <h2>Starships</h2>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by starship name" />
      <button onClick={() => handleSort("crew")}>Sort by crew</button>
      <button onClick={() => handleSort("cargo_capacity")}>Sort by cargo capacity</button>

      {loading &&
        <Loading />
      }

      <ul>
        {filteredStarships?.map((starship) => (
          <ItemCard data={starship} key={starship.name} />
        ))}
      </ul>

    </div>
  )
}