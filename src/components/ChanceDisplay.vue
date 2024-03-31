<template>
    <div class="my-chance-display">
        <p><b>Chance</b></p>
        <div class="my-chance-base">
            <span>Available chance cards #{{ gameState.availableChanceCards.length }}</span>
            <button>Pick a Card</button>
        </div>
        <div class="my-chance-current" v-if="gameState.selectedChanceCard">
            <span>{{ gameState.selectedChanceCard }}</span>
            <button>Close</button>
        </div>
    </div>
</template>
<script>

export default{
    props: ["gameState"],
    components:{
    }
}
</script>
<style>
.my-chance-display{
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    background-color: rgb(241, 124, 190);

    display: flex;
    flex-direction: column;
}
.my-chance-base{
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
.my-chance-current{
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    background-color: rgba(255, 255, 255, 0.35);
}
</style>