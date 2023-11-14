<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./pages/Home.svelte";
	import Standing from "./pages/Standing.svelte";
	import Header from "./components/Header.svelte";
	import Signup from "./pages/Signup.svelte";
	import Login from "./pages/Login.svelte";
	import PageNotFound from "./pages/PageNotFound.svelte";

	export let url = "/";
</script>

<body class="min-h-full">	
	<Header />

	<main>
		<Router {url}>
			<Route path="/"> <Home /> </Route>
			<Route path="login"> <Login /> </Route>
			<Route path="signup"> <Signup /> </Route>
			<Route path="global-ranking"> <Home /> </Route>
			
			<Route path="standing/:contest" let:params> 
				<Standing contest={params.contest} /> 
			</Route>
			
			<Route path="standing/:contest/:page" let:params> 
				<Standing contest={params.contest} page={params.page} /> 
			</Route>
			
			<Route path="/*" let:params> <PageNotFound /> </Route>
		</Router>
	</main>
</body>