<script>
    import { onMount } from 'svelte';
    import Pagination from '../components/Pagination.svelte';

    const BASE_URL = "http://localhost:8000";
    const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';

    let users = [];
    export let page = 1;
    export let contest = '/';

    const pad = (str, MAX_LEN_USERNAME = 16) => {
        if(MAX_LEN_USERNAME >= str.length) return str;
        return str.substr(0, MAX_LEN_USERNAME) + '...';
    }

    const milisecondToHourMinute = (date) => {
        if(date === "") return "";

        const d = new Date(Number(date)*1000);
        const hours = String(d.getHours());
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        if(hours >= 20){
            // This contest held on Saturday 8 PM
            return `${hours - 20}:${minutes}:${seconds}`
        }else{
            // This contest held on Sunday 8 AM
            return `${hours - 8}:${minutes}:${seconds}`;
        }
    }

    const formatUsersData = (users) => {
        for(let i = 0;i < users.length;i++){
            users[i].rank = Number(users[i].rank);
            users[i].username = pad(users[i].username);
            users[i].score = Number(users[i].score);
            users[i].country_code = users[i].country_code.toLowerCase();
            users[i].finish_time = milisecondToHourMinute(users[i].finish_time);
            users[i].solved = users[i].solved.split(':').map(val => Number(val));
            users[i].timestamp = users[i].timestamp.split(':').map(time => milisecondToHourMinute(time));
            users[i].fail_count = users[i].fail_count.split(':').map(val => Number(val));
        }

        console.log(users);

        return users;
    }

    const getStanding = async () => {
        try{
            const response = await fetch(`${BASE_URL}/standing/page/${page}`);
            const { data } = await response.json();

            users = formatUsersData(data.users);
        }catch(err){
            console.log(err);
        }
    }

    const getFreindsStanding = async () => {
        try{
            const response = await fetch(`${BASE_URL}/standing/friends`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({

                }),
            });

            const { data } = await response.json();

            users = formatUsersData(data.users);
        }catch(err){
            console.log(err);
        }
    }

    onMount(async () => {
        getStanding();
    });

</script>


<main class="max-w-screen-lg mx-auto flex flex-col justify-center p-8 text-[rgb(43,46,74)]"> 

  <h1 class="text-4xl font-bold text-center mb-12"> WEEKLY CONTESTS 370</h1>

  <div class="flex gap-4 justify-end mb-6">
    <button class="p-2 bg-red-600 border-none tracking-wider text-sm text-white outline-none hover:bg-red-700"> Common Standing </button>
    <button class="p-2 bg-red-600 border-none tracking-wider text-sm text-white outline-none hover:bg-red-700"> Friends Standing </button>
  </div>

  <table class="table-auto border-2 border-slate-600 mb-8">
    <thead>
      <tr>
        <th class="text-left border-y border-y-slate-600 p-2">Rank</th>
        <th class="text-left border-y border-y-slate-600 p-2">username</th>
        <th class="text-left border-y border-y-slate-600 p-2">Score</th>
        <th class="text-left border-y border-y-slate-600 p-2">Finish Time</th>
        <th class="text-left border-y border-y-slate-600 p-2">Q1</th>
        <th class="text-left border-y border-y-slate-600 p-2">Q2</th>
        <th class="text-left border-y border-y-slate-600 p-2">Q3</th>
        <th class="text-left border-y border-y-slate-600 p-2">Q4</th>
        <th class="text-center border-y border-y-slate-600 p-2">Delta</th>
      </tr>
    </thead>
    <tbody>
      {#each  users as user}
        <tr>
            <td class="border-y border-y-slate-400 p-2">{user.rank}</td>
            <td class="border-y border-y-slate-400 p-2">
                <div class="flex gap-2">
                    <span>{user.username}</span>

                    {#if user.country_code != ""}
                        <img  src={`${BASE_URL_COUNTRY}/${user.country_code}.svg`} alt={`${user.countryName}`} height={16} width={16}/>
                    {/if}
                </div>
            </td>
            
            <td class="border-y border-y-slate-400 p-2">{user.score}</td>
            <td class="border-y border-y-slate-400 p-2">{user.finish_time}</td>
            
            {#each Array(4) as _, i}
            <td class="border-y border-y-slate-400 p-2">
                <div class="flex gap-1 items-center">
                        {#if user.solved[i] > 0}
                            <span>{user.timestamp[i]}</span>
                        {/if}

                        {#if user.fail_count[i] > 0}
                            <!-- BUG ICON -->
                            <span>
                                <svg class="w-3 h-3 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6"/>
                                </svg>
                            </span>
                            <span>
                                {user.fail_count[i]}
                            </span>
                        {/if}
                    </div>
                </td>
            {/each}

            <td class="text-center border-y border-y-slate-400 p-2"> ? </td>
        </tr>
      {/each} 
    </tbody>
  </table>

  <div class="mx-auto">
    <Pagination {page}/>
  </div>

</main>
