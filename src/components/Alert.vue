<template>
  <div :class="['alert', type]">
    <span>{{ message }}</span>
    <button class="close-btn" @click="$emit('close')">&times;</button>
  </div>
</template>

<script setup>
defineProps({ type: String, message: String })
</script>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); 
}

.alert.success {
  background: #ffc9db; 
  color: #880E4F; 
}

.alert.info {
  background: #F48FB1; 
  color: white; 
}

.alert.warning {
  background: #EC407A; 
  color: white; 
}

.close-btn {
  background: none;
  border: none;
  color: inherit; 
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
}

.close-btn:hover {
  opacity: 0.7;
}
</style>