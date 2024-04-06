<template>
    <div class="my-game-board">
        <div class="my-gb-top">
            <TileStrip direction="horizontal" :gameData="gameData" :gameState="gameState" 
                :fromTileIdx="16" :toTileIdx="26"></TileStrip>
        </div>
        <div class="my-gb-middle">
            <div class="my-gb-left">
                <TileStrip direction="vertical" :gameData="gameData" :gameState="gameState" 
                    :fromTileIdx="15" :toTileIdx="11"></TileStrip>
            </div>
            <div class="my-gb-center">
                <CenterPanels :gameState="gameState"></CenterPanels>
            </div>
            <div class="my-gb-right">
                <TileStrip direction="vertical" :gameData="gameData" :gameState="gameState" 
                    :fromTileIdx="27" :toTileIdx="31"></TileStrip>
            </div>
        </div>
        <div class="my-gb-bottom">
            <TileStrip direction="horizontal" :gameData="gameData" :gameState="gameState" 
                :fromTileIdx="10" :toTileIdx="0"></TileStrip>
        </div>
    </div>
</template>
<script>
import TileStrip from './TileStrip.vue';
import CenterPanels from './CenterPanels.vue';
import data from "@/data.js";
import money from "@/money.js";
import {eventBus} from '@/main.js';

export default {
    data(){
        return {
            gameData: {
                allTiles: data.getAllTiles()
            },
            gameState: {
                availableChanceCards: data.getChoiceOptions(),
                selectedChanceCard: null,
                players: [
                    {id:101, name: "Daddy", color: "#da8"},
                    {id:102, name: "Rene", color: "#fca"},
                    {id:103, name: "Ryan", color: "#ebf"}
                ],
                selectedPlayer: {id:101, name: "Theo", color: "red"},
                currentRolledDice: null,
                selectedTile: data.getAllTiles()[0],
                playerToTileMap: {},
                tileToBoothMap: {},
                bankMoneyBag: money.getDefaultBankMoneyBag(),
                uncleMoneyBag: {},
                messages: [ 'Text1', 'Text2' ]
            }
        };
    },
    methods:{
        onPlayerClicked(player){
            this.gameState.selectedPlayer = player;
        },
        onPlayerRollClicked(){
            this.gameState.currentRolledDice = (Math.floor(Math.random() * 6) + 1);
        },
        onPlayerMoveClicked(){
            //Grab
            var rolledVal = this.gameState.currentRolledDice;
            this.gameState.currentRolledDice = null;
            //Find player id
            var selPlayerId = this.gameState.selectedPlayer.id;
            //Find tile
            var tileIdOfPlayer = this.gameState.playerToTileMap[this.gameState.selectedPlayer.id];
            var tile = this.gameData.allTiles.find(thisTile => { return thisTile.id == tileIdOfPlayer });
            var tileIdx = this.gameData.allTiles.indexOf(tile);
            //Calc next tile idx
            var nextTileIdx = (tileIdx + rolledVal) % this.gameData.allTiles.length;
            //Assign values
            this.gameState.selectedTile = this.gameData.allTiles[nextTileIdx];
            console.log(this.gameState.selectedTile);
            var playerToTileMap = JSON.parse(JSON.stringify(this.gameState.playerToTileMap));
            playerToTileMap[selPlayerId] = this.gameState.selectedTile.id;
            this.gameState.playerToTileMap = playerToTileMap;
            console.log(this.gameState.playerToTileMap);
        }
    },
    mounted(){
        eventBus.$on('playerClicked', this.onPlayerClicked);
        eventBus.$on('playerRollClicked', this.onPlayerRollClicked);
        eventBus.$on('playerMoveClicked', this.onPlayerMoveClicked);

        this.gameState.playerToTileMap = {};
        this.gameState.players.forEach(player => {
            this.gameState.playerToTileMap[player.id] = this.gameData.allTiles[0].id;
        });
        this.gameState.selectedPlayer = this.gameState.players[0];
    },
    components:{
        TileStrip,
        CenterPanels
    }
}
</script>
<style>
.my-game-board{
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 5px;

    display:flex;
    flex-direction: column;
}
.my-gb-middle{
    flex: 1;
    display: flex;
    margin: 7px 0px;
}
.my-gb-center{
    flex: 1;
}
.my-gb-left, .my-gb-right{
    width: calc(100vw/11);
}
</style>