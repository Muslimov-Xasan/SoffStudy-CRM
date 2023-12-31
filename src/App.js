import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import swal from "sweetalert";
import "./App.scss";

const App = () => {
  let setDataId;

  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const [search, setSearch] = useState("");

  function onSubmit() {
    if (title && time && status) {
      data.push({ title, time, status });
      setLocalStorage();
      swal("Successfully!", "Post add", "success");
      setTitle("");
      setTime("");
      setStatus("");
    } else {
      alert("To'liq malumot kiriting 😊");
    }
  }

  function setLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function setId(id) {
    setDataId = id;
  }
  let draft = [];
  let publ = [];

  function CountData() {
    draft = data.filter((item, index) => {
      return item.status === "Draft";
    });
    publ = data.filter((item, index) => {
      return item.status === "Published";
    });
  }

  function changeStatus(evt) {
    let changeStatus = evt.target.value;

    let changeData;
    data.forEach((item, index) => {
      if (index === setDataId) {
        changeData = { ...item, status: changeStatus };
        return;
      }
    });
    CountData();
    data.splice(setDataId, 1, changeData);
    setLocalStorage();
  }

  useEffect(() => {
    setData(
      JSON.parse(localStorage.getItem("data"))
        ? JSON.parse(localStorage.getItem("data"))
        : []
    );
  }, [search]);

  function searchHandle(evt) {
    setSearch(evt.target.value);
    filteredFunc();
  }

  function selectHandle(evt) {
    setSelectStatus(evt);
    filteredFunc();
  }

  function filteredFunc() {
    const filteredData = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectStatus ? item.status === selectStatus : true)
      );
    });

    setData(filteredData);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              changeStatus={changeStatus}
              setId={setId}
              searchHandle={searchHandle}
              selectHandle={selectHandle}
              selectStatus={selectStatus}
              draft={draft}
              publ={publ}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddPost
              setTitle={setTitle}
              title={title}
              time={time}
              status={status}
              setTime={setTime}
              setStatus={setStatus}
              onSubmit={onSubmit}
            />
          }
        />
      </Routes>

    </div>
  );
}

export default App;