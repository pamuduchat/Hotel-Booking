import "./featured.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const Featured = () => {
  const cities = ["Matale", "Galle", "Colombo"];
  const { data, loading, error } = useFetch(
    `hotels/countByCity?cities=${cities[0]},${cities[1]},${cities[2]}`
  );

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleClick = (city) => {
    navigate("/hotels", { state: { destination: city, dates, options } });
  };
  return (
    <div className="featured">
      {loading ? (
        "Loading...."
      ) : (
        <>
          <div className="featured-item" onClick={() => handleClick(cities[0])}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featured-img"
            />
            <div className="featured-titles">
              <h1>{cities[0]}</h1>
              <h2>
                {data[0]} {data[0] === 1 ? "property" : "properties"}
              </h2>
            </div>
          </div>

          <div className="featured-item" onClick={() => handleClick("Galle")}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/GALLE_FORT_SRI_LANKA_JAN_2013_%288580286004%29.jpg/800px-GALLE_FORT_SRI_LANKA_JAN_2013_%288580286004%29.jpg"
              className="featured-img"
            />
            <div className="featured-titles">
              <h1>{cities[1]}</h1>
              <h2>
                {data[1]} {data[1] === 1 ? "property" : "properties"}
              </h2>
            </div>
          </div>
          <div className="featured-item" onClick={() => handleClick("Colombo")}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featured-titles">
              <h1>{cities[2]}</h1>
              <h2>
                {data[2]} {data[2] === 1 ? "property" : "properties"}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
