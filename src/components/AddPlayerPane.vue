<template>
    <div class="my-add-player-pane" v-show="gameState.status=='ADD_PLAYER'">
        <div class="my-add-player-popup func-popup">
            <div class="func-popup-title">
                Add Player
            </div>
            <div class="func-popup-content">
                <div style="display: inline-block">Please enter the name of the player:</div>
                <div style="display: inline-block">
                    <input ref="playerNameTxt" class="my-player-name" type="text" v-model="playerName"/>
                </div>
                <br/><br/>
                <div style="display: inline-block">Pick a color:</div>
                <div class="my-pcolor-list">
                    <div class="my-pcolor" 
                        v-for="pcolor in pastelColors" :key="pcolor" 
                        :value="pcolor" :style="{backgroundColor: pcolor}"
                        :class="{'my-pcolor-selected': pcolor==playerColor}"
                        @click="colorSelected(pcolor)"
                        >
                        &nbsp;
                    </div>
                </div>
            </div>
            <div class="func-popup-action">
                <button @click="onAddPlayer">Add Player</button>
                <button @click="onCancelAddPlayer">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import {eventBus} from '@/main.js';

export default{
    props: ['gameState'],
    data(){
        return {
            playerName: '',
            playerColor: '',
            pastelColors: [
                "#aaf0d1", // magic mint
                "#ffd3b6", // melon
                "#ffb3de", // pink lace
                "#cf9fff", // mauve
                "#99c5c4" // pastel turquoise
            ]
        };
    },
    mounted(){
        this.playerColor = this.pastelColors[0];
        this.$refs.playerNameTxt.focus();
    },
    methods:{
        colorSelected(pcolor){
            this.playerColor = pcolor;
        },
        onAddPlayer(){
            eventBus.$emit('playerAdded', this.playerName, this.playerColor);
            this.playerName = '';
            this.playerColor = this.pastelColors[0];
        },
        onCancelAddPlayer(){
            eventBus.$emit('addPlayerCancelled');
        }
    }
}
</script>
<style>
.my-add-player-pane{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    top: 0px;
    left:0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(50,50,50, 0.6);
    z-index: 100;
}
.my-player-name{
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 25vw;
    font-size: 1.4em;
}
.my-player-name:focus{
    border-bottom: 1px solid #1e0e94;
}
.my-pcolor-list{
    display: inline-flex;
    justify-content: center;
    width: 50%;
}
.my-pcolor{
    flex: 1;
    margin: 2px 10px;
    max-width: 80px;
    text-align: center;
    border: 1px solid #aaa;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.my-pcolor-selected{
    border: 2px solid #666;
}
.func-popup{
    width: 50%;
    min-height: 250px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid #aaa;
    border-radius: 5px;
    font-size: 1.2em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.func-popup > div{
    padding: 20px;
}
.func-popup-title{
    font-weight: bold;
}
.func-popup .func-popup-content{
    flex: 1;
    padding-top: 0px;
}
.func-popup-action{
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
.func-popup-action button{
    margin: 0px 10px;
    padding: 10px 15px;
}
</style>