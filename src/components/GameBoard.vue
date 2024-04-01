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

export default {
    data(){
        return {
            gameData: {
                allTiles: data.getAllTiles()
            },
            gameState: {
                availableChanceCards: data.getChoiceOptions(),
                selectedChanceCard: data.getChoiceOptions()[6],
                players: [
                    {id:101, name: "Theo", color: "red"}
                ],
                selectedPlayer: {id:101, name: "Theo", color: "red"},
                selectedTile: data.getAllTiles()[3],
                bankMoneyBag: money.getDefaultBankMoneyBag(),
                uncleMoneyBag: {},
                messages: [ 'Text1', 'Text2' ]
            }
        };
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
    padding: 10px;

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