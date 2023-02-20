import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { TextField, InputAdornment } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./CSS/Dashboard.css";
import { Search as SearchIcon } from '@material-ui/icons';


const SearchResults = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const func = async () => {
            await axios.get("http://localhost:5000/api/celebs").then((resp) => {
                setData(resp.data.celebrities);
            });
        };
        func();
    }, []);

    useEffect(() => {
        setResults(
            data.filter((celeb) =>
                String(celeb.name).toLowerCase().startsWith(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, data]);

    return (
        <div>
            <TextField
                style={{ margin: "15px", width: "100%", alignItems: "center", justifyContent: "center", display: "flex" }}
                type="text"
                placeholder="Search celebrity"
                value={searchTerm}
                color="error" focused
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {searchTerm.length > 0 && (
                <>
                    <div className="section-header" style={{ marginTop: "30px" }}>
                        Found Results
                    </div>
                    <Row style={{ marginTop: "50px" }}>
                        {results.map((celeb) => {
                            return (
                                <>
                                    {/* slider */}

                                    <Col style={{ paddingBottom: "10px" }}>
                                        <div className="card" style={{ marginLeft: "10px" }}>
                                            <figure>
                                                <LazyLoadImage
                                                    src={celeb.image}
                                                    alt="Hotel"
                                                    style={{ width: "400px", height: "250px" }}
                                                />
                                            </figure>

                                            <div className="card-body">
                                                <Link to={`/profile/view-as/${celeb.slug}`}>
                                                    <h3 className="card-title">{celeb.name}</h3>
                                                </Link>
                                                <p className="card-text">{celeb.bio}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </>
                            );
                        })}
                    </Row>
                </>
            )}
        </div>
    );
};

export default SearchResults;
