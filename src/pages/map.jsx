import NavBar from "../components/navbar";
import "../assets/map.css"
import "mapbox-gl/dist/mapbox-gl.css"
import { useContext, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { DataContext } from "../contexts/dataContext";

export default function MapPage() {

    const { libraryData, askForLibraries, areWeConnected } = useContext(DataContext);

    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(() => {        
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_APIKEY;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [2.16649, 41.39704],
            zoom: 12.79
        });

        if (!libraryData.length) askForLibraries();
    
        return () => {
          mapRef.current.remove()
        }
    }, [])

    useEffect(() => {
        libraryData.forEach(library => {
            new mapboxgl.Marker()
                .setLngLat([library.longitude, library.latitude])
                .setPopup(new mapboxgl.Popup().setHTML("<h3>"+library.name+"</h3>"))
                .addTo(mapRef.current);
        });
    }, [libraryData])

    return(<>
    
    <NavBar></NavBar>

    <div className="crudDiv">
      
        {!areWeConnected && <div>Couldn't connect with database! Using placeholder data.</div>}
        <div className="crudTitle">Book Store Locations</div>
  
    </div>

    <div id="mapContent">
        <div id="mapMap" ref={mapContainerRef}></div>
    </div>

    </>)
    
}