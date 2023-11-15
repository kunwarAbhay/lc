<script>
    const BASE_URL_COUNTRY = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3';
    
    export let users = [];
</script>

<table class="table-auto border-2 border-slate-600 mb-8">
    <thead>
        <tr>
            <th class="text-left border-y border-y-slate-600 p-2">Global Rank</th>
            <th class="text-left border-y border-y-slate-600 p-2">Rating</th>
            <th class="text-left border-y border-y-slate-600 p-2">Username</th>
            <th class="text-left border-y border-y-slate-600 p-2">School</th>
        </tr>
    </thead>
    <tbody>
        {#each  users as user}
        <tr>
            <td class="border-y border-y-slate-400 p-2">{user.currentGlobalRanking}</td>
            <td class="border-y border-y-slate-400 p-2">{user.currentRating}</td>
            <td class="border-y border-y-slate-400 p-2">
                <div class="flex gap-2">
                    <div class="flex flex-col gap-2">
                        <span>{user.username}</span>
                        <span class="text-sm text-gray-800 ">{user.realName}</span>
                    </div>
                    
                    {#if user.countryCode != ""}
                        <img  src={`${BASE_URL_COUNTRY}/${user.countryCode}.svg`} alt={`${user.countryName}`} height={16} width={16}/>
                    {/if}
                </div>
            </td>

            <td class="border-y border-y-slate-400 p-2">{user.school}</td>  
        </tr>
        {/each} 
    </tbody>
</table>