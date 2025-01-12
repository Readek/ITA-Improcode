import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import NavBar from "../components/navbar";
import "../assets/calendar.css"
import { DataContext } from "../contexts/dataContext";
import { useContext, useEffect } from "react";

export default function CalendarPage() {

    const { eventData, askForEvents, areWeConnected } = useContext(DataContext);

    useEffect( () => {
        if (!eventData.length) askForEvents();
    }, []);

    return(<>
    
    <NavBar></NavBar>

    <div className="crudDiv">
      
    {!areWeConnected && <div>Couldn't connect with database! Using placeholder data.</div>}
    <div className="crudTitle">Reading Club Events</div>

    </div>

    <div id="calendarContent">
        <div id="calendarCalendar">
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={eventData}
            firstDay={1}
            />
        </div>
    </div>

    </>)
    
}