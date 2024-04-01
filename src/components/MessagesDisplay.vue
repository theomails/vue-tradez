<template>
    <div class="my-msg-display">
        <span><b>Game Activity:</b></span>
        <select size="10">
            <option v-for="(message, idx) in gameState.messages" :key="idx">{{ message }}</option>
        </select>
    </div>
</template>
<script>
export default {
    props: ['gameState'],
    data(){
        return {

        };
    },
    computed:{
        activityText(){
            var text = '';
            this.gameState.messages.forEach(message => {
                text = message + '\n' + text;
            });
            return text;
        }
    }
}
</script>
<style>
.my-msg-display{
    display: flex;
    flex-direction: column;

    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    background-color: rgb(116, 239, 214);
}
.my-msg-display select{
    flex: 1;
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #bbb;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>