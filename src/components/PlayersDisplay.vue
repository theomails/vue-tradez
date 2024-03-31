<template>
    <div class="my-players-display">
        
        <div class="my-players-list">
            <span><b>Players</b></span>
            <div class="my-player-in-list" 
                    v-for="player in gameState.players" :key="player.id"
                    :style="{backgroundColor: player.color }"
                    :class="{'my-sel-player': isSelectedPlayer(player)}"
                    @click="onPlayerClick(player)">
                {{ player.name }}
            </div>
        </div>

        <div class="my-player-roll">
            <button v-if="gameState.selectedPlayer" @click="onRollClick" >Roll dice for {{ gameState.selectedPlayer.name }}</button>
        </div>
        <br/>
        <div class="my-player-holdings">
            <span>{{ gameState.selectedPlayer.name }}'s holdings:</span>
            <BagDisplay :bag="gameState.selectedPlayer.moneyBag"></BagDisplay>
        </div>
    </div>
</template>
<script>
import {eventBus} from '@/main.js'
import BagDisplay from './BagDisplay.vue';

export default{
    props: ["gameState"],
    methods:{
        onPlayerClick(player){
            eventBus.$emit('playerClicked', player);
        },
        onRollClick(){
            eventBus.$emit('playerRollClicked');
        },
        isSelectedPlayer(aPlayer){
            return aPlayer && this.gameState.selectedPlayer && (aPlayer.id == this.gameState.selectedPlayer.id);
        }
    },
    components:{
        BagDisplay
    }
}
</script>
<style>
.my-players-display{
    padding: 10px;
    margin: 10px;
    background-color: #18eda9;
    border-radius: 4px;
}
.my-players-list{
    display: flex;
    align-items: center;
    padding: 10px;
}
.my-player-in-list{
    padding: 5px 10px;
    border: 1px solid #eee;
    margin: 0px 10px;
    cursor: pointer;
}
.my-player-in-list.my-sel-player{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: bold;
}
.my-player-holdings{
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.35);
}
</style>