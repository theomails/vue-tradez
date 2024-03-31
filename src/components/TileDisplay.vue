<template>
    <div class="my-tile-expanded">
        <Tile :tile="gameState.selectedTile" :gameState="gameState"></Tile>
        <div class="my-tile-expanded-actions">
            <button>Jump Here</button>
            <button>Buy</button>
            <button>Add Booth</button>
        </div>
    </div>
</template>
<script>
import Tile from './Tile.vue';

export default{
    props: ["gameState"],
    components:{
        Tile
    }
}
</script>
<style>
.my-tile-expanded{
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    background-color: rgb(202, 120, 245);

    display: flex;
    justify-content: space-between;
}
.my-tile-expanded-actions{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
</style>