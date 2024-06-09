<form method="POST" action="?/login">
	<label>
		Email
		<input class="input" name="email" type="email" />
	</label>
	<label>
		Password
		<input class="input" minlength="8" name="password" type="password" />
	</label>
	<button>Login</button>
	<button formaction="?/signup">Sign up</button>
</form>
