import "./CSS/editprofile.css";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditProfile({ currentId, setCurrentId }) {

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, celebs: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const params = useParams();
  const { slug } = params;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState("");
  // save image
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  // updatedCeleb Image
  const [updateImage, setUpdateImage] = useState("");


  const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
    // celebs: [],
    loading: true,
    error: "",
  });
  //-------------Open ----- 
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // -----------------Close
  const [celeb, setCeleb] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        // get data of every individual celeb by slug
        const result = await axios
          .get(`http://localhost:5000/api/celebs/indi/${slug}`)
          .then((resp) => {
            setCeleb(resp.data.celebrities);
            setName(resp.data.celebrities.name);
            setBio(resp.data.celebrities.bio);
            setCategory(resp.data.celebrities.category);
            setImage(resp.data.celebrities.image);
            setId(resp.data.celebrities._id);

          });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, [slug]);

  const submitForm = e => {
    e.preventDefault();

  }
  const updateUser = async (e) => {
    // formData for image
    axios.put(`http://localhost:5000/api/celebs/editProfile/${id}`, {
      name: name,
      bio: bio,
      category: category
    });
    // image only
    try {
      const formData = new FormData();
      formData.append('image', updateImage);
      const response = await axios.put(`http://localhost:5000/api/celebs/${id}`, formData, {
        image: updateImage,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setImage(response.data.image);
      setOpen(false);
    } catch (error) {
      console.error(error.message, "ERROR OCCURED");
    }
  };


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={submitForm}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label style={{ color: "black" }}>Id</label>
                <input
                  type="text"
                  placeholder={id}
                  className="userUpdateInput"
                // value={id}
                />
              </div>
              <div className="userUpdateItem">
                <h1>{currentId}</h1>
                <label style={{ color: "black" }}>Full Name</label>

                <input
                  type="text"
                  placeholder={celeb.name}
                  className="userUpdateInput"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label style={{ color: "black" }}>Bio</label>
                <input
                  type="text"
                  size="50"
                  placeholder={celeb.bio}
                  className="userUpdateInput"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label style={{ color: "black" }}>Category</label>
                <input
                  type="text"
                  size="50"
                  placeholder={celeb.category}
                  className="userUpdateInput"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={celeb.image} alt='' />
                <input type="file" name="image"
                  onChange={(e) => {
                    setUpdateImage(e.target.files[0])
                  }}
                />
              </div>
              <Button className="userUpdateButton" onClick={handleOpen} color="error" variant="contained">
                Update
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"UPDATE PROFILE?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are You sure you want to update your profile???
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="error" variant="contained">Disagree</Button>
                  <Button onClick={updateUser} autoFocus color="success" variant="contained">
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;