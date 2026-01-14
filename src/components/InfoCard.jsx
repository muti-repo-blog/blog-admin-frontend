import { Link } from "react-router"

const InfoCard = ({ info, title }) => {
  return (
    <Link to="/posts" className="infoCard">
      <h3 className="infoCardTitle">{title}</h3>
      <div className="infoCardInfo">{info}</div>
    </Link>
  )
}

export default InfoCard