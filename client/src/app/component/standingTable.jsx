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

// Convert time in miliseconds to time elapsed in minutes and seconds
const processTimes = (date) => {
    // contestants haven't solved this question
    if(date === "") return "";

    date = +date; // convert the date string into number

    date = date * 1000;

    const hours = new Date(date).getHours();
    const minutes = String(new Date(date).getMinutes()).padStart(2, '0');
    const seconds = String(new Date(date).getSeconds()).padStart(2, '0');

    if(hours >= 20){ 
        // This contest held on Saturday 8 PM
        return `${hours - 20}:${minutes}:${seconds}`;
    }else{
        // This contest held on Sunday 8 AM
        return `${hours - 8}:${minutes}:${seconds}`;
    }
}

const GlobalRankTable = ({ users }) => {
  console.log(users);  
  return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left"> Rank </TableCell>
                    <TableCell align="left"> Username </TableCell>
                    <TableCell align="left"> Score </TableCell>
                    <TableCell align="left"> Finish Time </TableCell>
                    <TableCell align="left"> Q1 </TableCell>
                    <TableCell align="left"> Q2 </TableCell>
                    <TableCell align="left"> Q3 </TableCell>
                    <TableCell align="left"> Q4 </TableCell>
                    <TableCell align="left"> Delta </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left" width={12}> {user.rank} </TableCell>
                        <TableCell align="left" width={12}>
                            <Stack justifyContent={"start"} alignItems={"center"} gap={2} direction={"row"}>
                                <Stack alignItems={"start"}>
                                    <span> {pad(user.username, 16)} </span>
                                </Stack>
                                <span> 
                                    {user.country_code && 
                                     <img  src={`${BASE_URL_COUNTRY}/${user.country_code.toLowerCase()}.svg`} alt={`${user.countryName}`} height={24} width={24}/>} 
                                </span>
                            </Stack>
                        </TableCell>
                        <TableCell align="left" width={12}>{parseInt(user.score)}</TableCell>
                        <TableCell align="left" width={12}>{processTimes(user.finish_time)}</TableCell>
                        
                        {/* REPLACE BELOW ONES WITH QUESTION SUBMISSION */}
                        <TableCell align="left" width={12}>{processTimes(user.timestamp[0])}</TableCell>
                        <TableCell align="left" width={12}>{processTimes(user.timestamp[1])}</TableCell>
                        <TableCell align="left" width={12}>{processTimes(user.timestamp[2])}</TableCell>
                        <TableCell align="left" width={12}>{processTimes(user.timestamp[3])}</TableCell>
                        <TableCell align="left" width={12}>{"?"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default GlobalRankTable