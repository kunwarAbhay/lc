<script>
    // import {onMount} from 'svelte';
    import { Router, Link, Route } from "svelte-navigator";

    export let page = 1;

    const prev = Math.max(page - 1, 1); 
    const start = Math.max(page - 5, 1);
    const end = start + (10 - 1);
    const next = page + 1;

    const numbers = [];

    for(let i = start;i <= end;i++){
        numbers.push(i);
    }

    export let url = "/";

    // onMount(() => url = window.location.href);
</script>
  
<main>
    <nav>
        <ul class="flex items-center -space-x-px h-10 text-base text-gray-500">
            <Route>
                <li>
                    <Link to="/{prev}" class="flex items-center justify-center px-4 h-10 ml-0 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-900">
                        <span class="sr-only">Previous</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </Link>
                </li>
                
                {#each numbers as num}
                    <li>
                        <Link to="/{num}" class="flex items-center  justify-center px-3 h-10 border border-gray-300 hover:bg-gray-100 hover:text-gray-900">{num}</Link>
                    </li>
                {/each}

                <li>
                    <Link to="/{next}" class="flex items-center justify-center px-4 h-10 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-900">
                        <span class="sr-only">Next</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </Link>
                </li>
            </Route>
        </ul>
    </nav>
</main>