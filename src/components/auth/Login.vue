<template>
	<v-container fluid fill-height class="primary">
		<v-layout wrap justify-center align-center>					
			<v-layout row wrap>
				<v-flex xs12 text-xs-center class="white--text">
					<h1>{{ appName }}</h1>							  
				</v-flex>
				<v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
					<v-card style="border-radius: 0.5em;">
						<v-card-text>
							<v-text-field
							label="Email"
							append-outer-icon="email"			
							v-model="credential.username"
							></v-text-field>

							<v-text-field
							label="Password"
							append-outer-icon="lock"
							v-model="credential.password"
							type="password"
							></v-text-field>
						</v-card-text>
						<v-card-actions class="px-3">
							<v-checkbox label="Ingat saya" v-model="rememberMe" value="value"></v-checkbox>
							<v-spacer></v-spacer>
							<v-btn 
								color="primary"
								@click="login()"
								>
								Login
							</v-btn>
						</v-card-actions>

					
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
				appName: process.env.VUE_APP_NAME,
				rememberMe: false,
				credential: {
					username: "arifin",
					password:"123456"
				}
			}
		},

		created(){
		},

		methods:{
			login(){
				this.axios.post("http://localhost:3000/users/login", this.credential)
				.then(res=>{							
					this.$store.commit('mutate', {
						property: "user",
						with: res.data
					});
					this.$axios.defaults.headers.common['Authorization'] = res.data.token
					this.$router.push('/')			
				})
				
			}
		}
	}
</script>