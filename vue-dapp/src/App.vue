<script setup lang="ts">
import { ref, onActivated, onUpdated, onUnmounted, onMounted, onBeforeMount, watch } from 'vue'
import { toast } from "vue3-toastify";

import HelloWorld from './components/HelloWorld.vue'
import { requestAccount, depositFund, withdrawFund, getContractBalanceInETH } from "./utils/contractService";


// const props = defineProps({
//   balance: {
//     type: String,
//     default: '0'
//   },
//   account: {
//     type: Object,
//     default: {}
//   }
// });

const balance = ref("");
const account = ref({});
const depositValue = ref();

watch(account,  async(account, prevAccount) => {
  
  account = await requestAccount();
  console.info('Set account: ', account, '| Previous account: ', prevAccount)

});

watch(balance,  async(balance, prevBalance) => {
  
  balance = await getContractBalanceInETH();
  console.info('Set balance: ', balance, '| Previous balance: ', prevBalance)

});

const connectWallet = async () => {
  console.log('click')
    try {
      account.value = await requestAccount();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDeposit = async () => {
    try {
      await depositFund(depositValue.value);
    } catch (error) {
      toast.error(error);
    }
    depositValue.value = "";
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFund();
    } catch (error) {
      toast.error(error);
    }
  };
</script>

<template>
  <button @click="connectWallet">Connect Web3 Wallet</button>
  <div>
    <div>
      
      <h2>Contract Balance: {{ balance }} ETH</h2>
      <p>Connected Account: {{ account }}</p>
    </div>
    <div>
      <h2>Contract Actions</h2>
      <div>
        <input
          type="text"
          v-model="depositValue"
          placeholder="Amount in ETH"
        />
        <button @click="handleDeposit">Deposit Funds</button>
      </div>
      <br />
      <div>
        <button @click="handleWithdraw">Withdraw Funds</button>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
