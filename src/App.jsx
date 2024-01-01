import { useState } from "react";

import "./App.css";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const res = await fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });

    return res;
  };

  const getCurrentData = (data) => {
    const res = data.slice((currentPage - 1) * 10, currentPage * 10);
    setCurrentData(res);
  };

  useEffect(() => {
    // (async () => {
    //   const result = await fetchData();
    //   setTotalPages(Math.ceil(result.length / 10));
    //   getCurrentData(result);
    // })();
    fetchData();
    setTotalPages(Math.ceil(data.length / 10));
    getCurrentData(data);
  }, [data]);

  useEffect(() => {
    getCurrentData(data);
  }, [currentPage]);

  const hanglePrevClick = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const hangleNextClick = () => {
    if (currentPage !== totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>naren@gmail.com</td>
                <td>Software engg</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-wrapper">
        <button onClick={hanglePrevClick}>Previous</button>
        <span className="pagination-page">{currentPage}</span>
        <button onClick={hangleNextClick}>Next</button>
      </div>
    </>
  );
}

export default App;
