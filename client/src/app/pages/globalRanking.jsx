import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ApplyPagination from "../component/applyPagination";
import GlobalRankTable from "../component/globalRankTable";
import SelectCountry from "../component/selectCountry";
import SearchUsername from "../component/searchUsername";

const BASE_URL = "http://localhost:8080";

function Rating() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1000);
  const [searchByText, setSearchByText] = useState("");
  const [searchBySchool, setSearchBySchool] = useState("");
  const [searchByCountry, setSearchByCountry] = useState("");

  const changePage = (page) => {
    setPage(page);
  };

  const changeLimit = (limit) => {
    setLimit(limit);
    changePage(1);
  };

  const changeSearchByText = (text) => {
    setSearchByText(text);
    changePage(1);
  };

  const changeSearchBySchool = (school) => {
    console.log(school);
    setSearchBySchool(school);
    changePage(1);
  };

  const changeSearchByCountry = (country) => {
    setSearchByCountry(country);
    changePage(1);
  };

  const createSearchQueryString = () => {
    let query = [];
    query.push(`page=${page}`);
    query.push(`limit=${limit}`);
    query.push(`text=${searchByText}`);
    query.push(`school=${searchBySchool}`);
    query.push(`country=${searchByCountry}`);

    query = query.join("&");

    return query;
  };

  const getUsers = async () => {
    const query = createSearchQueryString();

    try {
      const response = await fetch(`${BASE_URL}/users/search?${query}`);
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, limit, searchByText, searchBySchool, searchByCountry]);

  return (
    <Box
      py={6}
      mb={8}
      px={4}
      width={{ xs: "100%", sm: "600px", md: "900px", lg: "1000px" }}
      margin={"16px auto"}
    >
      <Grid container spacing={2} mb={8}>
        <Grid item xs={12} sm={6}>
          {/* <SearchUsername /> */}
          <TextField
            id="search-by-text"
            onChange={(e) => changeSearchByText(e.target.value)}
            label="Search Text"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
           {/* SEARCH BY TEXT */}
          <TextField
            id="search-by-text"
            onChange={(e) => changeSearchByText(e.target.value)}
            label="Search Text"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* SEARCH BY SCHOOL */}
          <TextField
            id="search-by-school"
            onChange={(e) => changeSearchBySchool(e.target.value)}
            label="Search School"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* SORT BY COUNTRY */}
          <SelectCountry
            country={searchByCountry}
            changeCountry={changeSearchByCountry}
          />
        </Grid>
      </Grid>

      <Box mb={8}>
        <GlobalRankTable users={users} />
      </Box>

      <ApplyPagination
        limit={limit}
        page={page}
        totalPages={totalPages}
        changeLimit={changeLimit}
        changePage={changePage}
        CHANGE_LIMIT_ALLOWED={true}
      />
    </Box>
  );
}

export default Rating;
