import './AboutComp.css'
import groupImg from '../../assets/group-image.jpeg'
import teams from '../../assets/all_products'
const Aboutcomp = () => {
  return (
    <div className="about">
      <div className="col1">
        <h1>About us</h1>
        <img src={groupImg} alt="pic of group of models"/>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam deleniti dolor vitae quae optio modi reprehenderit, itaque quibusdam perspiciatis magni excepturi suscipit odit aliquam, consectetur officiis nihil maxime quas dolores.</p>
      </div>
      <div className='meet-team'>
        <h1>Meet our team</h1>
        <p>Lorem ipsum dolor, sit amet consectetur inventore repellat sit?</p>
        <ul>
          {
            teams.map((team) => <li key={team.id}>
              <div className='team'>
                <img src={team.img} alt="" />
                <h3>{team.name}</h3>
                <p>{team.profession}</p>
              </div>
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default Aboutcomp
