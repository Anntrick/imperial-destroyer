import './Starships.scss'

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addStarships, markAsConquered, markAsDeleted, sortStarships, setError, starshipsData } from "./starshipsSlice"
import { SwapiService } from '../../services/swapiService'

import { Loading } from "../../components/Loading/Loading"
import { ItemCard } from "../../components/ItemCard/ItemCard"
import { Pagination } from "../../components/Pagination/Pagination"

export const Starships = () => {
  const dispatch = useDispatch()
  const starships = useSelector(starshipsData)
  const sPerPage = 6

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)


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

  const indexOfLastS = currentPage * sPerPage;
	const indexOfFirstS = indexOfLastS - sPerPage;
  const pagStarships = filteredStarships?.slice(indexOfFirstS, indexOfLastS)

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
        {pagStarships?.map((starship) => (
          <ItemCard data={starship} key={starship.name} errorImg="/starships/default.jpeg"/>
        ))}
      </ul>


      {filteredStarships.length > sPerPage && 
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredStarships.length} itemsPerPage={sPerPage}/>
      }
    </div>
  )
}