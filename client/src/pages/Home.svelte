<script>
  import { Router, Link, Route } from "svelte-navigator";
</script>


<main class="min-h-[80vh] flex flex-col justify-center p-8 text-[#2B2E4A]"> 

  <h1 class="text-4xl font-bold text-center mb-12"> CONTESTS </h1>
    <Router>
      <div class="mx-auto max-w-[860px] w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="standing/weekly-contest-371">
            <div class="border-2 border-black p-4 flex justify-between items-center cursor-pointer hover:shadow-2xl">
              <h3 class="font-semibold">Bi-Weekly Contest 371</h3>
              <span class="p-2 bg-yellow-600 text-white font-bold">UPCOMING</span>
            </div>
          </Link>
          
        <Link to="standing/weekly-contest-370">
          <div class="border-2 border-black p-4 flex justify-between items-center cursor-pointer hover:shadow-2xl">
            <h3 class="font-semibold">Weekly Contest 370</h3>
            <span class="p-2 bg-green-600 text-white font-bold">LIVE</span>
          </div>
        </Link>
        
        <Link to="standing/weekly-contest-370"> 
          <div class="border-2 border-black p-4 flex justify-between items-center cursor-pointer hover:shadow-2xl">
            <h3 class="font-semibold">Weekly Contest 370</h3>
            <span class="p-2 bg-red-600 text-white font-bold">PAST</span>
          </div>
        </Link>
          
        <Link to="standing/weekly-contest-370">
          <div class="border-2 border-black p-4 flex justify-between items-center cursor-pointer hover:shadow-2xl">
            <h3 class="font-semibold">Weekly Contest 370</h3>
            <span class="p-2 bg-red-600 text-white font-bold">PAST</span>
          </div>
        </Link>
      </div>
    </Router>
</main>