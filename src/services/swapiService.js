import axios from "axios"

export const SwapiService = {}
const apiUrl = 'https://swapi.tech/api/'

SwapiService.getPlanets = async () => {
  try {
    const response = await axios.get(`${apiUrl}planets/`)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}

SwapiService.getStarships = async () => {
  try {
    const response = await axios.get(`${apiUrl}starships/`)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}

SwapiService.addData = async (results) => {
  let planetsData = []
  for (let character of results) {
      const charData = await axios.get(character.url)
      
      planetsData.push(charData.data.result.properties)
  }
  return planetsData
}