import './ItemCard.scss'

export const ItemCard = (props) => {
  const img = `/planets/${props.data.name.split(" ").join("").toLowerCase()}.png`

  return (
    <div className="ItemCard">
      <img src={img} alt={props.data.name} />
      <h2>{props.data.name}</h2>
      <p>{props.data.terrain}</p>
      <p>{props.data.population == "unknown" ? "Unknown population" : `Population of ${props.data.population}`} </p>
    </div>

  )

}