import React from "react";
import { BACKEND_URI } from "../config/constants";

export default function UploadList({ medias }) {


  return (
    <div>
      <div className="gallery">
        {medias &&
          medias.map((media) => {
            return (
              <>
                {media.videos.length !== 0 ? (
                  <div>
                    {media.videos.map((video) => {
                      return (
                        <>
                          <video
                            payload="auto"
                            width="320"
                            height="240"
                            controls
                            className="item"
                          >
                            <source src={`${BACKEND_URI}${video}`} />
                            {/* error */}
                            Your browser does not support the video
                          </video>
                          <button
                            style={{ marginLeft: "20px", height: "1px" }}
                          >
                            {/* <DeleteIcon/> */}
                          </button>

                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
