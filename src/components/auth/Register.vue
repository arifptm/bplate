<template>
	<v-container fluid fill-height class="primary">
				<v-layout wrap justify-center align-center>					
						<v-layout row wrap>
							<v-flex xs12 text-xs-center class="white--text round">
								<h1>Metalika</h1>							  
							</v-flex>
							<v-flex xs12 xl4 offset-xl4>
							<v-card style="border-radius: 5px">
								<v-card-text>
									<v-text-field
										label="Email"
										append-outer-icon="email"			
										v-model="username"
									></v-text-field>

									<v-text-field
										label="Password"
										append-outer-icon="lock"
										v-model="password"
										type="password"
									></v-text-field>
									<v-text-field
										label="Ulangi Password"
										append-outer-icon="lock"
										v-model="password_confirmation"
										type="password"
									></v-text-field>

									<v-flex xs12 text-xs-center>
										<v-btn 
											color="primary"
											@click="login()"
										>
											Login
										</v-btn>
									</v-flex>
								</v-card-text>							  
							</v-card>							  
							</v-flex>
							
								

						</v-layout>
					
				</v-layout>
				
	</v-container>
</template>

<script>
	export default{
		data(){
			return {
				username: "",
				password: "",
				password_confirmation: "",

				credential: {
					grant_type: "password",
					client_id: "2",
					client_secret: "i7V1XVk6YTTJpAGKMZNuAvJTVyXfYFN6voOYuOsH",
					
				}
			}
		},

		created(){
		},

		methods:{
			login(){
				this.axios.post("http://invo.tes/oauth/token", this.credential)
				.then(res=>{
					console.log(res.data)
					this.$store.commit('token', res.data.token_type+' '+res.data.access_token)
				})
			}
		}
	}
</script>