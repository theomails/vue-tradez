<template>
    <div class="my-transfer-display">
        <div class="my-transfer-header">
            <select class="my-transfer-from" v-model="fromBagId">
                <option v-for="bagOption in bagOptions" :key="bagOption.id" :value="bagOption.id">{{ bagOption.name }}</option>
            </select>
            &nbsp;to&nbsp;
            <select class="my-transfer-to" v-model="toBagId">
                <option v-for="bagOption in bagOptions" :key="bagOption.id" :value="bagOption.id">{{ bagOption.name }}</option>
            </select>
        </div>
        <div class="my-transfer-ops">
            <OpsEditor :bagWrapper="getWrapperForBagId(fromBagId)" :neatOps="getNeatOps(fromOps)"></OpsEditor>
            <OpsEditor :bagWrapper="getWrapperForBagId(toBagId)" :neatOps="getNeatOps(toOps)"></OpsEditor>
        </div>
        <div class="my-transfer-footer">
            {{ transferSummaryText }}
            <button>Trasnfer</button>
        </div>
    </div>
</template>
<script>
import money from '@/money.js'
import OpsEditor from './OpsEditor.vue';

export default {
    props: ["gameState"],
    data(){
        return {
            fromBagId: null,
            toBagId: null,
            fromOps: {},
            toOps: {}
        };
    },
    mounted(){
        this.fromBagId = this.bagOptions[0].id;
        this.toBagId = 'bank';
    },
    methods:{
        changeOpsBag(denom, incOrDec, opsFromOrTo){
            var ops = (opsFromOrTo=='from'?this.fromOps:this.toOps) || {};
            ops[denom] = (ops[denom] || 0) + (incOrDec=='inc'?1:-1);
            if(opsFromOrTo=='from'){
                this.fromOps = ops;
            }else if(opsFromOrTo=='to'){
                this.toOps = ops;
            }
        },
        getWrapperForBagId(bagId){
            if(bagId){
                return this.bagOptions.filter(bagOption => (bagOption.id == bagId))[0];
            }
            return null;
        },
        getNeatOps(ops){
            return money.neatViewOfBag(ops);
        },
        getTotal(ops){
            var sum = 0;
            Object.keys(ops).forEach(denom => {
                sum += denom * ops[denom];
            });
            return sum;
        }
    },
    computed:{
        transferSummaryText(){
            var fromAmt = this.getTotal(this.fromOps);
            var toAmt = this.getTotal(this.toOps);
            var netAmount = fromAmt = toAmt;
            var fromName = this.getWrapperForBagId(this.fromBagId)?.name;
            var toName = this.getWrapperForBagId(this.toBagId)?.name;
            if(fromAmt > toAmt){
                var tmpAmount = fromAmt;
                fromAmt = toAmt;
                toAmt = tmpAmount;
                netAmount = fromAmt = toAmt;
                var tmpName = fromName;
                fromName = toName;
                toName = tmpName;
            }
            return `Transfering $${netAmount} from ${fromName} to ${toName}`;
        },
        bagOptions(){
            var bagOptions = [];
            this.gameState.players.forEach(player => {
                bagOptions.push({type: 'player', bag: player.moneyBag, id: `player-${player.id}`, name: `${player.name} [Player]`});
            });
            bagOptions.push({type: 'bank', bag: this.gameState.bankMoneyBag, id: 'bank', name: "BANK"});
            bagOptions.push({type: 'uncle', bag: this.gameState.uncleMoneyBag, id: 'uncle', name: "Uncle Penny Bag's Loose Change"});
            return bagOptions;
        }
    },
    components:{
        OpsEditor
    }
}
</script>
<style>
.my-transfer-display{
    display: flex;
    flex-direction: column;

    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    background-color: rgb(241, 136, 107);    
}
.my-transfer-ops{
    display: flex;
}
.my-transfer-ops > * {
    flex: 1;
    
}
.my-transfer-footer{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.35);
}
</style>