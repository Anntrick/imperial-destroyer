import axios from "axios"

export const SwapiService = {}
const apiUrl = 'https://swapi.tech/api/'

SwapiService.getPlanets = async () => {
  try {
    const response = await axios.get(`${apiUrl}planets/`)
    
    return await SwapiService.addData(response.data.results)
  } catch (error) {
    console.error(error)
    return error
  }
}

SwapiService.getStarships = async () => {
  try {
    const response = await axios.get(`${apiUrl}starships/`)
    
    return await SwapiService.addData(response.data.results)
  } catch (error) {
    console.error(error)
    return error
  }
}

SwapiService.addData = async (results) => {
  console.log(results)
  let data = []
  for (let item of results) {
      const itemData = await axios.get(item.url)
      
      data.push(itemData.data.result.properties)
  }
  return data
}