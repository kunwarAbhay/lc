import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'https://lc.anurags.tech/';

const SearchUsername = () => {
    const [usernameList, setUsernameList] = useState([]);
    const [username, setUsername] = useState("");
    
    const getUsernames = async () => {
        try{
            const response = await fetch(`${BASE_URL}/users/autocomplete?q=${username}`);
            let { data } = await response.json();
            
            data = data.map(user => ({"label" : user, "value" : user}));

            console.log(data);

            // setUsernameList(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUsernames();
    }, []);

    return (
        <Autocomplete
        disablePortal
        value={username}
        onChange={(e, value) => {
            if(value) setUsername(value);
            else setUsername("");
        }}
        options={usernameList}
        onInputChange={getUsernames}
        getOptionLabel={(option) => option.username || ''}
        renderInput={(params) => <TextField {...params} label="Search Username" />}
        />
    );
}

export default SearchUsername