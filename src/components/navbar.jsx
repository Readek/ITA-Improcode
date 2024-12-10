import { Link } from "react-router-dom"
import "../assets/navbar.css"

export default function NavBar() {

    return (

    <div id="topNavBarDiv">

        <Link to={"/"} className="topNavBarLink">Home</Link>
        <Link to={"/Map"} className="topNavBarLink">Map</Link>
        <Link to={"/Calendar"} className="topNavBarLink">Calendar</Link>
        <Link to={"/Charts"} className="topNavBarLink">Charts</Link>

    </div>

    )

}