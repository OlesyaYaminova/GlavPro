import {useState, useEffect, useCallback} from "react";
// Modules
import getReviews from "./modules/getReviews";

// Components
import CreateReviewBlock from "./components/CreateReviewBlock";

import './App.css';
import RowReviewContent from "./components/RowReviewContent";

function App() {
  // State
  const [data, setData] = useState([]);

  // Handler
  const getDataReviews = useCallback(async () => {
    try {
      const result = await getReviews();

      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Effects
  useEffect(() => {
    getDataReviews();
  }, []);

  // Render
  return (
      <div className="App">
        <header className="App-header">
          Отзывы
        </header>
        <CreateReviewBlock setData={setData} />
        <div className="content">
          <div className="row header">
            <span>№</span>
            <span>Комментарий</span>
            <span>Оценка</span>
            <span>Дата создания</span>
          </div>
          {data.map((row, index) => {
            return (
                <RowReviewContent
                  rowContent={row}
                  key={index}
                  getDataReviews={getDataReviews}
                  data={data}
                  setData={setData}
                />
            );
          })}
        </div>
      </div>
  );
}

export default App;
