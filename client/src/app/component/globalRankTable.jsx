import React from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';

const pad = (str, maxLen) => {
    if(maxLen >= str.length) return str; 
    return str.substr(0, maxLen) + '...';
}

const GlobalRankTable = ({ users }) => {
  return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left"> Global Rank </TableCell>
                    <TableCell align="left"> Rating </TableCell>
                    <TableCell align="left"> Username </TableCell>
                    <TableCell align="left"> School </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left" width={12}> {user.currentGlobalRanking} </TableCell>
                        <TableCell align="left" width={12}>{parseInt(user.currentRating)}</TableCell>
                        <TableCell align="left" width={12}>
                            <Stack justifyContent={"start"} alignItems={"center"} gap={2} direction={"row"}>
                                <Stack alignItems={"start"}>
                                    <span> {pad(user.username, 16)} </span>
                                    <Typography sx={{color : "grey", fontSize : 12 }}> {pad(user.realName, 16)} </Typography>
                                </Stack>
                                <span> 
                                    {user.countryCode && 
                                     <img  src={`${BASE_URL_COUNTRY}/${user.countryCode.toLowerCase()}.svg`} alt={`${user.countryName}`} height={24} width={24}/>} 
                                </span>
                            </Stack>
                        </TableCell>
                        <TableCell align="left" width={12}>{user.school}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default GlobalRankTable