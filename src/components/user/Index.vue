<template>
	<v-container fluid fill-height class="primary">
		<v-layout row wrap>
			<v-flex xs12 text-xs-center class="white--text">
				<v-list v-for="user in users" :key="user.id">
					<v-list-tile avatar>
						<v-list-tile-avatar>
							{{ user.id }}
						</v-list-tile-avatar>
						<v-list-tile-content>					    
						<v-list-tile-title>{{ user.name }}</v-list-tile-title>
							<v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
							<v-list-tile-sub-title>
								<div v-for="role in user.roles" :key="role.id">
									{{ role.name }}
								</div>
							</v-list-tile-sub-title>

						</v-list-tile-content>
					</v-list-tile>

				</v-list>				
			</v-flex>
		</v-layout>	
	</v-container>
</template>

<script>
	export default{
		data(){
			return {
				users: [],
			}
		},

		created(){
			this.getUsers()
		},

		methods:{
			getUsers(){
				this.$axios.get('/users')
				.then(res=>{
					this.users = res.data
				})
			},

		}
	}
</script>