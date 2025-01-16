<script setup lang="ts">
import { ref, onActivated, onUpdated, onUnmounted, onMounted, onBeforeMount, watch } from 'vue'
import { toast } from "vue3-toastify";

// import HelloWorld from './components/HelloWorld.vue'
import { requestAccount, depositFund, withdrawFund, getContractBalanceInETH } from "./utils/contractService";


const balance = ref("0");
const account = ref();
const depositValue = ref();

const connectWallet = async () => {
  
    try {
      account.value = await requestAccount();
      balance.value = await getContractBalanceInETH();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDeposit = async () => {
    try {
      await depositFund(depositValue.value);
      balance.value = await getContractBalanceInETH();
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
  <h1>Vite+Vue+Hardhat+Ethers</h1>
  <button v-if="!account" @click="connectWallet">Connect Web3 Wallet</button>
  <div v-else>
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
