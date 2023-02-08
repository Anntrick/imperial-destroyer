import './ItemCard.scss'

export const ItemCard = (props) => {
  const img = props.data.terrain ? `/planets/${props.data.name.split(" ").join("").toLowerCase()}.png` : `/starships/${props.data.name.split(" ").join("").toLowerCase()}.png`

  const imgError = (error) => {
    console.log(error)
    error.target.src = props.errorImg; 

  }

  return (
    <div className="ItemCard">
      <img src={img} alt={props.data.name} onError={imgError}/>
      <h2>{props.data.name}</h2>

      {props.data.terrain &&
        <>
          <p>{props.data.terrain}</p>
          <p>{props.data.population == "unknown" ? "Unknown population" : `Population of ${props.data.population}`} </p>
        </>
      }

      {props.data.crew &&
        <>
          <p>Crew: {props.data.crew}</p>
          <p>Cargo capacity: {props.data.cargo_capacity}</p>
          <p>Cost: {props.data.cost_in_credits} Credits</p>
          <p>Passengers: {props.data.passengers} People</p>

        </>
      }

    </div>

  )

}