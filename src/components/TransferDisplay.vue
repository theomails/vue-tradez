<template>
    <div class="my-transfer-display">
        <div class="my-transfer-header">
            
        </div>
        <div class="my-transfer-ops">
            
        </div>
        <div class="my-transfer-footer">
            
        </div>
    </div>
</template>
<script>
import money from '@/money.js'

export default {
    props: [gameState],
    data(){
        return {
            fromBag: {type: 'player', player: null},
            toBag: {type: 'bank', bag: null},
            fromOps: {},
            toOps: {}
        };
    },
    methods:{
        nameOfBagWrapper(bagWrapper){
            if(bagWrapper.type == 'player'){
                return bagWrapper.player?.name || '';
            }else if(bagWrapper.type == 'bank'){
                return 'BANK';
            }else if(bagWrapper.type == 'uncle'){
                return "Uncle Penny Bag's Loose Change";
            }else{
                throw new Error("Unknown bag wrapper");
            }
        },
        changeOpsBag(denom, incOrDec, opsFromOrTo){
            ops = (opsFromOrTo=='from'?this.fromOps:this.toOps) || {};
            ops[denom] = (ops[denom] || 0) + (incOrDec=='inc'?1:-1);
            if(opsFromOrTo=='from'){
                this.fromOps = ops;
            }else if(opsFromOrTo=='to'){
                this.toOps = ops;
            }
        }
    }
}
</script>
<style>
.my-transfer-display{
    display: flex;
    flex-direction: column;
}
</style>