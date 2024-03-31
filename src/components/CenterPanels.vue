<template>
    <div class="my-center-panels">
        <div class="my-center-left">
            <PlayersDisplay :gameState="gameState"></PlayersDisplay>
            <TileDisplay :gameState="gameState"></TileDisplay>
            <ChanceDisplay :gameState="gameState"></ChanceDisplay>
        </div>
        <div class="my-center-right">
            <MainBagsDisplay :gameState="gameState"></MainBagsDisplay>
        </div>
    </div>
</template>
<script>
import PlayersDisplay from './PlayersDisplay.vue';
import TileDisplay from './TileDisplay.vue';
import ChanceDisplay from './ChanceDisplay.vue';
import MainBagsDisplay from './MainBagsDisplay.vue';

export default{
    props: ["gameState"],
    components: {
        PlayersDisplay, 
        TileDisplay,
        ChanceDisplay,
        MainBagsDisplay
    }
}
</script>
<style>
.my-center-panels{
    display: flex;
    height: calc(100% - 15px);
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    background-image: linear-gradient(to bottom right, #f1be8099, #d4842299)
}
.my-center-panels > div{
    flex:1;
    height: 100%;
}
</style>