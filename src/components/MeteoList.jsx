import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MeteoCardMini from "./MeteoCardMini";

const MeteoList = () => {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.currentCoord.content);
  const meteoWeek = useSelector((state) => state.meteoContainer.content);
  //   const currentMeteo = useSelector((state) => state.currentMeto.content);

  const fetchMeteoData = async (event) => {
    try {
      if (coordinates) {
        const meteoURl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=4464f2e1cd5047a5c458e66b7ae44113&units=metric`;
        const curentMeteoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=4464f2e1cd5047a5c458e66b7ae44113&units=metric`;

        const response1 = await fetch(meteoURl);

        const meteoDataArray = await response1.json();

        const response = await fetch(curentMeteoURL);

        const meteoData = await response.json();

        dispatch({ type: "SET_CURRENT_METEO", payload: meteoData });
        dispatch({ type: "SET_WEEK_DETAILS", payload: meteoDataArray });
        dispatch({ type: "SET_METEO_CONTAINER", payload: meteoDataArray });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeteoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return (
    <>
      {meteoWeek.list &&
        meteoWeek.list.map((meteo, i) => <MeteoCardMini key={"main" + i} meteo={meteo} meteoWeek={meteoWeek} />)}
    </>
  );
};

export default MeteoList;
