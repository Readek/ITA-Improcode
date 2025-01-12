import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title, ArcElement } from "chart.js";
import { Bar, Pie} from "react-chartjs-2";
import NavBar from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/dataContext";
import "../assets/charts.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const chartColors = [
  "rgba(75, 192, 192, 0.7)",
  "rgba(192, 75, 192, 0.7)",
  "rgba(75, 192, 91, 0.7)",
  "rgba(83, 75, 192, 0.7)",
  "rgba(192, 155, 75, 0.7)",
]

export default function ChartsPage() {

    const { libraryData, askForLibraries, areWeConnected } = useContext(DataContext);

    const [ratingChartData, setRatingChartData] = useState({datasets:[]});
    const [bookChartData, setBookChartData] = useState({datasets:[]});

    useEffect( () => {
        if (!libraryData.length) askForLibraries();
    }, []);

    useEffect(() => {

        setRatingChartData({
            labels: libraryData.map(library => library.name),
            datasets: [{
                label: "Book Store Rating",
                data: libraryData.map(library => library.rating),
                backgroundColor: chartColors
            }]
        });

        setBookChartData({
            labels: libraryData.map(library => library.name),
            datasets: [{
                label: "Books in this store",
                data: libraryData.map(library => {
                    let books = 0;
                    for (let i = 0; i < library.books.length; i++) {
                        books += library.books[i].quantity
                    }
                    return books;
                }),
                backgroundColor: chartColors
            }]
        });

    }, [libraryData]);


    return(<>
    
    <NavBar></NavBar>

    <div className="crudDiv">
      
      {!areWeConnected && <div>Couldn't connect with database! Using placeholder data.</div>}
      
      <div className="crudTitle">Book Store Statistics</div>

    </div>

    <div id="chartsContent">

    <Bar options={{
        datasetIdKey: "barras",
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Book store ratings',
          },
        },
    }} data={ratingChartData} className="chartsChart" />

    <Pie options={{
        datasetIdKey: "tarta",
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Books quantity in each store',
          },
        },
    }} data={bookChartData} className="chartsChart" />

    </div>

    </>)
    
}