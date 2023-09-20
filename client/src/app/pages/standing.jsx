import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ApplyPagination from "../component/applyPagination";
import StandingTable from "../component/standingTable";

const BASE_URL = "http://localhost:8080";

const processUsers = (users) => {
  for(let i = 0;i < users.length;i++){
    users[i].solved = users[i].solved.split(":");
    users[i].timestamp = users[i].timestamp.split(":");
  }

  return users;
}

function Standing() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1000);
  const [isCommonStanding, setIsCommnonStanding] = useState(true);
  const [isFriendsStanding, setIsFriendsStanding] = useState(false);

  const changePage = (page) => {
    setPage(page);
  };

  const getStanding = async () => {
    try {
      const response = await fetch(`${BASE_URL}/standing/page/${page}`);
      const { data } = await response.json();
      setUsers(processUsers(data.users));
    } catch (err) {
      console.log(err);
    }
  };

  const getFriendsStanding = async () => {
    try {
      const response = await fetch(`${BASE_URL}/standing/page/${page}`);
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStanding();
  }, [page]);

  return (
    <Box
      py={6}
      mb={8}
      px={4}
      width={{ xs: "100%", sm: "600px", md: "900px", lg: "1000px" }}
      margin={"16px auto"}
    >
      <Stack justifyContent={"center"} gap={2} direction={"row"} mb={4}>
        <Button
          variant="contained"
          onClick={() => {
            setIsCommnonStanding(true);
            setIsFriendsStanding(false);
          }}
        >
          COMMON STANDINGS
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsCommnonStanding(false);
            setIsFriendsStanding(true);
          }}
        >
          FRIENDS STANDINGS
        </Button>
      </Stack>

      <Box mb={8}>
        <StandingTable users={users} />
      </Box>

      {isCommonStanding && (
        <ApplyPagination
          page={page}
          totalPages={totalPages}
          changePage={changePage}
          CHANGE_LIMIT_ALLOWED={false}
        />
      )}
    </Box>
  );
}

export default Standing;
