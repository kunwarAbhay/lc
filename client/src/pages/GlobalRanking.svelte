<script>
    import { onMount } from 'svelte';
    import { Route, Link } from 'svelte-navigator';
    import Pagination from '../components/Pagination.svelte';
    import GlobalRankTable from '../components/GlobalRankTable.svelte';

    const BASE_URL = "http://localhost:8000";
    const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';

    let users = [];
    export let page = 1;
    export let username = 1;
    export let limit = 25;
    export let text = "";
    export let school = "";
    export let country = "";

    const pad = (str, MAX_LEN_USERNAME = 16) => {
        if(MAX_LEN_USERNAME >= str.length) return str;
        return str.substr(0, MAX_LEN_USERNAME) + '...';
    }

    const formatUsersData = (users) => {
        for(let i = 0;i < users.length;i++){
            users[i].currentGlobalRanking = i + 1;
            users[i].currentRating = parseInt(users[i].currentRating);
            users[i].username = pad(users[i].username);
            users[i].realName = pad(users[i].realName);
            users[i].countryCode = users[i].countryCode.toLowerCase();
        }

        return users;
    }

    const changeUsername = (_username) => {
        username = _username;
    }

    const changePage = (_page) => {
        page = _page;
    }

    const changeLimit = (_limit) => {
        limit = _limit;
    }

    const changeText = (_text) => {
        console.log(_text);
        text = _text;
        page = 1;

        console.log(createSearchQueryString());
    }

    const changeSchool = (_school) => {
        school = _school;
        page = 1;
    }

    const changeCountry = (_country) => {
        country = _country;
        page = 1;
    }

    const createSearchQueryString = () => {
        let query = [];
        if(school == ""){
            school = "indian";
        }
        query.push(`page=${page}`);
        query.push(`limit=${limit}`);
        query.push(`text=${text}`);
        query.push(`school=${school}`);
        query.push(`country=${country}`);

        query = query.join("&");

        return query;
    };

    $: getUsers(username, page, limit, text, school, country);

    const getUsers = async () => {
        const query = createSearchQueryString();

        try {
            const response = await fetch(`${BASE_URL}/users/`);

            const { data } = await response.json();

            users = formatUsersData(data);
            console.log(formatUsersData(data));
        } catch (err) {
            console.log(err);
        }
    };

    onMount(async () => {
        getUsers();
    });

</script>


<main class="max-w-screen-lg mx-auto flex flex-col justify-center p-8 text-[rgb(43,46,74)]"> 

  <h1 class="text-4xl font-bold text-center mb-12">Leetcode Global Ranking</h1>
  
  <div class="grid grid-cols-2 gap-4 mb-12">
    <input
        on:keyup={(e) => changeUsername(e.target.value)}
        required
        type="text"
        name="Username"
        id="Username"
        placeholder="Username"
        class="p-3 border-black focus:outline-violet-900"
    />
    
    <input
        on:keyup={(e) => changeText(e.target.value)}
        required
        type="text"
        name="text"
        id="text"
        placeholder="Text"
        class="p-3 border-black focus:outline-violet-900"
    />
    
    <input
        on:keyup={(e) => changeSchool(e.target.value)}
        required
        type="text"
        name="school"
        id="school"
        placeholder="School"
        class="p-3 border-black focus:outline-violet-900"
    />
    
    <input
        
        required
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        class="p-3 border-black focus:outline-violet-900"
    />
  </div>

  <GlobalRankTable {users} />

  <div class="mx-auto">
    <Pagination {page}/>
  </div>

</main>
