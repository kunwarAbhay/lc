<script>
    const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';
    export let users = [];
</script>

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