import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Logo from "../assets/img/logo.svg";
import Search from "../assets/img/search.png";
import Swatch from "../assets/img/color-swatch.png";

const Home = ({
  data,
  changeStatus,
  setId,
  searchHandle,
  selectHandle,
  selectStatus,
  draft,
  publ,
}) => {
  const itemsPerPage = 3;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row p-2 border">
            <div className="col-2">
              <Link to="/" className="nav__link">
                <img src={Logo} alt="" width={"90"} />
              </Link>
            </div>
            <div className="col-10">
              <h4>Posts</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-2 bg-white">
              <button className="btn btn-light d-flex mt-3 form-control">
                <img src={Swatch} alt="post" className="img-fluid" />
                <h4 className="ms-3">Posts</h4>
              </button>
            </div>
            <div className="col-10 py-1 px-3">
              <div className="bg-white rounded p-2 section__page">
                <div className="row mt-3">
                  <div className="col-6 p__relative ">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      onChange={searchHandle}
                    />
                    <img src={Search} alt="" className="p__absolute" />
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <Link to="/add" className="btn btn-primary px-5">
                      Create Post
                    </Link>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col d-flex all__btn">
                    <button
                      className={`btn btn-primary ${
                        selectStatus === "" ? "btn-primary" : "btn-light"
                      } d-flex`}
                      name=""
                      onClick={() => selectHandle("")}
                    >
                      <div>All statuses</div>
                      <div className="ms-4 count__status change__btn">
                        {draft.length + publ.length}
                      </div>
                    </button>
                    <button
                      className={`btn ${
                        selectStatus === "Draft" ? "btn-primary" : "btn-light"
                      } d-flex ms-2`}
                      name="Draft"
                      onClick={() => selectHandle("Draft")}
                    >
                      <div>Draft</div>
                      <div className="ms-4 count__status change__btn">
                        {draft.length}
                      </div>
                    </button>
                    <button
                      className={`btn ${
                        selectStatus === "Published"
                          ? "btn-primary"
                          : "btn-light"
                      } d-flex ms-2`}
                      name="Published"
                      onClick={() => selectHandle("Published")}
                    >
                      <div>Published</div>
                      <div className="ms-4 count__status change__btn">
                        {publ.length}
                      </div>
                    </button>
                  </div>
                </div>

                <table className="table mt-3 table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.reverse().map((item, index) => (
                      <tr key={index} onClick={() => setId(index)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.title}</td>
                        <td>{item.time}</td>
                        <td>
                          <select
                            id="selection"
                            value={item.status}
                            onChange={(e) => changeStatus(e, index)}
                          >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length > itemsPerPage && (
                  <Pagination
                    count={pageCount}
                    color="primary"
                    onChange={handlePageChange}
                    page={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;