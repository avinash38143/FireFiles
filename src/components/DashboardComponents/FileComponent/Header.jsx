import { faArrowLeftLong, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/fileFolderActionCreator";

const Header = ({ fileName,fileId,fileData,prevFileData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg mt-2  navbar-light bg-white shadow-sm">
      <p className="navbar-brand fw-bold my-0 ms-5">{fileName}</p>
      {
        fileData !== prevFileData && (
            <h5 className="fw-bold my-0 ms-2 text-danger">*[modefied]</h5>
        ) 
      }
      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2" >
            <button className="btn btn-success" disabled={fileData === prevFileData}
            onClick={() => {
                dispatch(updateFileData(fileId, fileData));
                
            }}>
            <FontAwesomeIcon icon = {faSave} /> Save
            </button>
        </li>
        <li className="nav-item">
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon = {faArrowLeftLong} /> Go Back
            </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
