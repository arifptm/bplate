<template>
  <v-container fluid class="pa-0" style="background-color: #efefef;height:100vh;">
    <v-layout row wrap>
      
      <v-flex xs12 >
        <v-layout row wrap class="box-top">
          <v-flex>

            <v-container fluid fill-height class="pa-0">
              <v-layout wrap justify-center align-center>
                <v-flex class="cpl-2 text-xs-left app-name purple--text text--darken-3">
                  Papindi <span class="slogan grey--text text--darken-2">Papan Informasi Digital <span class="grey--text">by Jasma Digital</span></span>
                </v-flex>
              </v-layout>
            </v-container>

            
          </v-flex>

          <v-flex xs4>
            <v-container fluid fill-height class="pa-0">
              <v-layout wrap justify-center align-center>
                <v-flex class="clock text-xs-right cpr-2">
                  {{ $store.state.clock.format('hh:mm:ss') }} 
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>

        </v-layout>
          
        
      </v-flex>

      
      <v-flex xs12 >
        <div class="box-center" :style="'height: ' + centerHeight + 'vh'">
          
          <v-container fluid fill-height>
            <v-layout wrap justify-center align-center>
              <v-layout row wrap>
                
                <v-flex style="text-align: center;" >     
                  <div style="float:left;">
                      <v-img :max-height="(centerHeight-8)+'vh'" contain :aspect-ratio="16/9"  src="https://via.placeholder.com/1920x1080">
                      </v-img>
                  </div>                               
                  <transition name="jb-slide-left">

                  
                    <div v-if="shows === true && jumbotrons[jumbotronIndex].image" >
                      <v-img :max-height="(centerHeight-8)+'vh'" contain :aspect-ratio="16/9"  :src="apiUrl + '/static/jumbotrons/'+ '5d240f21868d1a447414d1f7/'+jumbotrons[jumbotronIndex].image" >
                      </v-img>
                    </div>

                    <div v-if="shows === true && jumbotrons[jumbotronIndex].video">
                    <video-player 
                      style="background-color: blue;"
                      class="vjs-custom-skin video"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true"                      
                    >
                    </video-player>                     
                  </div>



<!--                     <video-player
                      class="vjs-custom-skin video"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true"
                      @ended="onPlayerEnded($event)"
                      @ready="playerReadied"
                    >
                    </video-player>  -->

                  
                  
                  </transition>

                </v-flex>

                <v-flex xs3 style="text-align: center;" class="pl-2 blue">
                  <div class="white--text" :style="'font-size:5vh;overflow:hidden; max-height:' + (centerHeight-8)+'vh'"> Aku hanya ingin tenang, aku tidak ingin menang Aku hanya ingin tenangn tenang, aku tidak ingin menang</div>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-container>
        
        </div>
      </v-flex>
      
      <v-flex xs12>
        <div class="box-bottom purple lighten-5" :style="'height: ' + bottomHeight + 'vh'">
          Metalika bottom
        </div>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    components:{ videoPlayer },
    data: () => ({
      displayed: 0,
      apiUrl: process.env.VUE_APP_API_URL,
      sidebarRight: true,
      header: true,
      footer: true,
      jumbotrons: [],
      jumbotron:{},
      jumbotronIndex:0,
      jumbotronDuration: 0,
      sh: true,
      centerHeight: 70,
      bottomHeight: 20,
      shows:false,
      playerOptions: {},

    }),

    created(){
      this.init()
      this.startClock()
      this.bottomHeight= 0
      this.centerHeight = 90- this.bottomHeight      

    },

    methods:{
      tik(){
        // console.log(this.jumbotron.duration)
      },


      startClock(){
        setInterval(()=>{                   
          this.checkJumbotronDuration()
          this.$store.commit('mutate', {
            property: "clock",
            with: moment()
          })
        }, 1000)
        
      },
      init(){        
        this.getJumbotrons()
      },

      getJumbotrons(){
        this.axios.get('jumbotrons')
        .then(res=>{
          this.jumbotrons = res.data
          this.selectJumbotron()
        })
      },

      selectJumbotron(){        
        this.jumbotronIndex++
        if(this.jumbotronIndex == this.jumbotrons.length) this.jumbotronIndex = 0
        this.jumbotron = this.jumbotrons[this.jumbotronIndex]        
        this.jumbotronDuration = this.jumbotron.duration      
        
        if(this.jumbotron.video){
          this.playerOptions = { autoplay: true, muted: true, fluid:true, language: 'en', 
          sources: [{
            type: "video/mp4",
            src: process.env.VUE_APP_API_URL +'/static/jumbotrons/5d240f21868d1a447414d1f7/' + this.jumbotron.video
            }]
          }
        }
      },

      checkJumbotronDuration(){
        this.shows = true
        if(this.jumbotronDuration == 0 ) {
          setTimeout(()=>{            
            this.shows = false
            this.selectJumbotron()
          }, 1)
            
            
        } 
        this.jumbotronDuration--
          // setTimeout(()=>{
          //   this.sh = true
          //   this.selectJumbotron()
          // },10)
          
       
      },


    },

    computed:{     
    },

    beforeDestroyed(){
      removeInterval(this.setTik)
    }


  }
</script>

<style>
.absolute-top{position: absolute; top:0;left: 0;}
.box-top{ height:10vh; overflow:hidden;}
.box-center{ height:70vh; overflow:hidden; background-color: #333;}

.box-bottom { height:20vh; overflow:hidden; }


.cma-1 { margin: 1vh; }
.cma-2 { margin: 2vh; }
.cpa-1 { padding: 1vh; }
.cpa-2 { padding: 2vh; }
.cpl-2 { padding-left: 2vh; }
.cpr-2 { padding-right: 2vh; }

.clock { font-size: 6vh; font-family: "Bebas Neue";}
.app-name { font-size: 6vh; font-family: "Bebas Neue";}
.slogan { font-size: 4vh;  }

  @font-face {
    font-family: 'Bebas Neue';
    font-style: normal;
    font-weight: 400;
    src: url(../assets/fonts/bebas/BebasNeue-Regular.woff2) format('woff2');    
  }

  /* TRANSITION */
  .jb-fade-enter-active, .jb-fade-leave-active{transition: 1s;}
  .jb-fade-enter, .jb-fade-leave-to{opacity: 0;}

  .jb-slide-right-enter-active, .jb-slide-right-leave-active{transition: 2s ;}
  .jb-slide-right-enter { transform: translate(-100%, 0); }
  .jb-slide-right-leave-to{ transform: translate(100%, 0); }
  .jb-slide-right-leave{ opacity:1; }

  .jb-slide-left-enter-active, .jb-slide-left-leave-active{transition: 0.5s ;}
  .jb-slide-left-enter { transform: translate(100%, 0); }
  .jb-slide-left-leave-to{ transform: translate(-100%, 0); }  

</style>
