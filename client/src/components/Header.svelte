<script>
	import { Router, Link, Route } from "svelte-navigator";

  let open = false;
</script>

<header class="py-2">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-2 md:px-8" aria-label="Global">
      <!-- LOGO -->
      <div class="flex md:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Leetcode Companion</span>
          <span class="text-4xl">⚡</span>
        </a>
      </div>
      
      <!-- HAMNURGER MENU -->
      <div class="flex md:hidden" class:hidden={open}>
        <button type="button" on:click={() => open = true} class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <!-- MAIN LINKS -->
      <div class="hidden md:flex md:gap-x-12">  
        <Router>
          <Link to="/" class="text-sm font-semibold leading-6 text-gray-900">Home</Link>
          <Link to="/global-ranking" class="text-sm font-semibold leading-6 text-gray-900">Global Ranking</Link>
          <Link to="/standing" class="text-sm font-semibold leading-6 text-gray-900">Contest Leaderboard</Link>
        </Router>
      </div>

      <div class="hidden md:flex md:flex-1 md:justify-end">
        <div class="flex gap-4">
            <Router>
                <Link to="/signup" class="text-sm font-semibold leading-6 text-gray-900">Signup</Link>
                <Link to="/login" class="text-sm font-semibold leading-6 text-gray-900">Login</Link>
            </Router>
        </div>
      </div>
    </nav>

    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="md:hidden" class:hidden={!open} role="dialog" aria-modal="true">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-10"></div>
      <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          
          <!-- LOGO -->
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Leetcode Companion</span>
            <span class="text-4xl">⚡</span>
          </a>

          <!-- HAMBURGER MENU -->
          <button type="button" on:click={() => open = false} class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
                <!-- MAIN LINKS -->
                <div class="space-y-2 py-6">
                  <Router>    
                    <Link to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
                    <Link to="/global-ranking" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Global Ranking</Link>
                    <Link to="/standing" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contest Leaderboard</Link>
                  </Router>
                </div>
                
                <div class="py-6">
                  <Router>
                    <Link to="/signup" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Signup</Link>
                    <Link to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Login</Link>
                  </Router>
                </div>
          </div>
        </div>

      </div>
    </div>
  </header>
  