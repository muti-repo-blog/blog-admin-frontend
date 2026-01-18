import { Link } from "react-router"

const InfoCard = ({ info, title, herf }) => {
  return (
    <Link to={herf} className="infoCard">
      <h3 className="infoCardTitle">{title}</h3>
      <div className="infoCardInfo">{info}</div>
    </Link>
  )
}

export default InfoCard