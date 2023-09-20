import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'http://localhost:8080';

const SelectCountry = ({country, changeCountry}) => {    
    const [countryList, setCountryList] = useState([]);
    
    const getAllCountryList = async () => {
        try{
            const response = await fetch(`${BASE_URL}/countries.json`);
            const data = await response.json();
            data.push({label : "Select A Country", ccountryCode : ""});
            setCountryList(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAllCountryList();
    }, []);

    return (
        <Autocomplete
        disablePortal
        value={country.country}
        onChange={(e, option) => {
            if(option) changeCountry(option.countryCode);
            else changeCountry("");
        }}
        options={countryList}
        getOptionLabel={(option) => option.country || ''}
        renderInput={(params) => <TextField {...params} label="Select a country" />}
        />
    );
}

export default SelectCountry;