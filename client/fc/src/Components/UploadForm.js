import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";
import { Grid } from "@mui/material";



export default function UploadForm(getAllMedias) {
  // const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent form refresh

    // convert json data to form data
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    axios.post(`${BACKEND_URI}/api/media/create`, formdata, {
      onUploadProgress: (data) => {
      },
    }).then(success => {
      getAllMedias()
      console.log(success)
      alert("Submitted successfully")
    }).catch(error => {
      console.log(error)
      alert("Uploaded successfully")
    });
  };
  return (
    <div style={{marginLeft:"40px"}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
          <Grid >
          {/* mx={'auto'} width={"auto"} p="1" m="1" */}
            <input
              type="file"
              name="videos"
              id="videos"
              multiple
              className="form-control"
              accept=".mp4, .mkv"
              // target.value stores text
              // target.files stores files
              onChange={(e) => {
                setVideos(e.target.files)
              }} style={{width:"auto", marginLeft:"50px"}} />
          </Grid>
        </div>

        <button type="submit" className="btn btn-primary mt-2"
        style={{width:"auto", marginLeft:"50px", marginTop:"10px"}}
        >
          Upload
        </button>
      </form>
    </div>
  );
}