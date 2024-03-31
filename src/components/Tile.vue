<template>
    <div class="my-tile" :class="{'my-tile-selected':isThisTileSelected}" @click="onTileClick()">
        <div class="my-tile-title" 
            :style="{backgroundColor: getBgColor(tile.color), color: getTextColor(tile.color)}"
            :title="tile.color">{{ tile.name }}</div>
        <div v-if="tile.buyable">
            Cost: ${{ parseInt(tile.priceOrCharge) }}
        </div>
        <div class="func-flex-grow my-tile-players" >
            <span v-for="player in playersOnThisTile" :key="player.id">{{ player.name }}</span>
        </div>
        <div v-if="tile.buyable">
            Base Rent: ${{ parseInt(tile.baseRent) }}
            {{ (thisTileBoothsCount>0)?(thisTileBoothsCount + ' Booths'):'' }}
        </div>
    </div>
</template>
<script>
import {eventBus} from "@/main.js";

export default {
    props:[ "tile", "gameState" ],
    data(){
        return {
            darkColors: ["BLUE", "RED", "GREEN"],
            cssColor:{
                "SUBTLE_BLUE": "#00e4ff",
                "DARK_BLUE": "#d600ff"
            }
        };
    },
    methods:{
        onTileClick(){
            eventBus.$emit('tileClicked', this.tile.id);
        },
        getTextColor(bgColor){
            if(this.darkColors.includes(bgColor)){
                return "white";
            }
            return "black";
        },
        getBgColor(colorName){
            return this.cssColor[colorName] || colorName;
        }
    },
    computed:{
        isThisTileSelected(){
            var selectedTileId = this.gameState.selectedTile?.id;
            return selectedTileId && (selectedTileId==this.tile.id);
        },
        playersOnThisTile(){
            var playerIdToTileIdMap = this.gameState.playerToTileMap || {};
            var playersOnThisTile = [];
            Object.keys(playerIdToTileIdMap).forEach(playerId => {
                var tileIdOfThisPlayer = playerIdToTileIdMap[playerId] || -1;
                if(tileIdOfThisPlayer == this.tile.id){
                    playersOnThisTile.push(this.gameState.players[playerId]);
                }
            });
            return playersOnThisTile;
        },
        thisTileBoothsCount(){
            var tileIdToBoothCountMap = this.gameState?.tileToBoothMap;
            return tileIdToBoothCountMap?tileIdToBoothCountMap[this.tile.id] || 0 : 0;
        }
    }
}
</script>
<style>
.my-tile{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    padding: 7px;
    margin: 3px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.my-tile.my-tile-selected{
    border: 2px solid blue;
}
.func-flex-grow{
    flex: 1;
}
.my-tile-title{
    font-weight: bold; 
    margin:-7px; 
    margin-bottom: 10px; 
    padding: 5px;
    text-align: center;
}
.my-tile-players{
    align-items: center;
    font-weight: bold;
}
</style>