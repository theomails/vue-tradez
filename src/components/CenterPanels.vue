<template>
    <div class="my-center-panels">
        <div class="my-center-left">
            <PlayersDisplay :gameState="gameState"></PlayersDisplay>
            <MainBagsDisplay :gameState="gameState"></MainBagsDisplay>
            <TransferDisplay :gameState="gameState"></TransferDisplay>
        </div>
        <div class="my-center-right">
            <TileDisplay :gameState="gameState"></TileDisplay>
            <ChanceDisplay :gameState="gameState"></ChanceDisplay>
            <MessagesDisplay class="func-flex-grow" :gameState="gameState"></MessagesDisplay>
        </div>
    </div>
</template>
<script>
import PlayersDisplay from './PlayersDisplay.vue';
import TileDisplay from './TileDisplay.vue';
import ChanceDisplay from './ChanceDisplay.vue';
import MainBagsDisplay from './MainBagsDisplay.vue';
import TransferDisplay from './TransferDisplay.vue';
import MessagesDisplay from './MessagesDisplay.vue';

export default{
    props: ["gameState"],
    components: {
        PlayersDisplay, 
        TileDisplay,
        ChanceDisplay,
        MainBagsDisplay,
        TransferDisplay,
        MessagesDisplay
    }
}
</script>
<style>
.my-center-panels{
    display: flex;
    height: calc(100% - 15px);
    margin: 0px;
    padding: 5px;
}
.my-center-panels > div{
    flex:1;
    height: 100%;
}
.my-center-right{
    display: flex;
    flex-direction: column;
}
</style>