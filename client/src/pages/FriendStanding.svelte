<script>
    import { onMount } from 'svelte';
    import { Route, Link } from 'svelte-navigator';
    import Pagination from '../components/Pagination.svelte';
    import StandingTable from '../components/StandingTable.svelte';

    const BASE_URL = "http://localhost:8000";
    const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';

    let friends = [];
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

        return users;
    }

    const getFreindsStanding = async () => {
        try{
            const response = await fetch(`${BASE_URL}/standing/friends`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    friends : ['0abhay0', 'rz_kaushal', 'ashubeast4262']
                }),
            });

            console.log(response); 
            
            const { data } = await response.json();
            console.log(data);

            friends = formatUsersData(data.friends);
        }catch(err){
            console.log(err);
        }
    }

    onMount(async () => {
        getFreindsStanding();
    });

</script>


<main class="max-w-screen-lg mx-auto flex flex-col justify-center p-8 text-[rgb(43,46,74)]"> 

  <h1 class="text-4xl font-bold text-center mb-12"> WEEKLY CONTESTS 370</h1>

  <div class="flex gap-4 justify-end mb-6">
    <Route>
        <Link to="/standing/{contest}/1" class="p-2 border-2 border-red-600 tracking-wider text-sm text-black hover:text-white hover:bg-red-700"> Common Standing </Link>
        <Link to="/standing/{contest}/friends" class="p-2 bg-red-600 border-none tracking-wider text-sm text-white outline-none hover:bg-red-700"> Friends Standing </Link>
    </Route>
  </div>

  <StandingTable users={friends} />
</main>
