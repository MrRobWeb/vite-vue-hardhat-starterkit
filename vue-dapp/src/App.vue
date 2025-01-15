<script setup lang="ts">
import { ref, onActivated, onUpdated, onUnmounted, onMounted, onBeforeMount, watch } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { requestAccount } from "./utils/contractService";

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

const balance = ref(null);
const account = ref({});

watch(account,  async(account, prevAccount) => {
  
  account = await requestAccount();
  console.info('Set account: ', account, '| Previous account: ', prevAccount)

});

const connectWallet = async () => {
  console.log('click')
    try {
      account.value = await requestAccount();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
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
  </div>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
