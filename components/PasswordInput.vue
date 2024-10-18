<template>
  <div>
    <div class="flex space-x-2 my-6 opacity-70">
      <input 
        type="text" 
        maxlength="1" 
        :class="inputClass()"
        placeholder="D"
        ref="input1"
        v-model="inputValues[0]"
        @input="moveFocus($event, input2, null)"
        @keydown="handleKeydown($event, input2)"
      />
      <input 
        type="text" 
        maxlength="1" 
        :class="inputClass()"
        placeholder="D"
        ref="input2"
        v-model="inputValues[1]"
        @input="moveFocus($event, input3, input1)"
        @keydown="handleKeydown($event, input3, input1)"
      />
      <input 
        type="text" 
        maxlength="1" 
        :class="inputClass()"
        placeholder="M"
        ref="input3"
        v-model="inputValues[2]"
        @input="moveFocus($event, input4, input2)"
        @keydown="handleKeydown($event, input4, input2)"
      />
      <input 
        type="text" 
        maxlength="1" 
        :class="inputClass()"
        placeholder="M"
        ref="input4"
        v-model="inputValues[3]"
        @input="moveFocus($event, null, input3)"
        @keydown="handleKeydown($event, null, input3)"
      />
    </div>

    <!-- Warning text for incorrect password -->
    <div v-if="showWarning" class="text-red-500 text-sm absolute">Incorrect passcode, please try again.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app'; // Assuming you're using Nuxt

const correctPassword = '1290';

const inputValues = ref(['', '', '', '']);
const showWarning = ref(false); // To show warning for incorrect passcode
const inputError = ref(false);  // To change input border color when password is wrong

const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);
const input4 = ref(null);
const router = useRouter();
const filledpasscode = useCookie('filledpasscode', {maxAge: 60*15});

// Check if all inputs are filled and if the password is correct
const checkPassword = () => {
  const enteredPassword = inputValues.value.join('');
  if (enteredPassword === correctPassword) {
    filledpasscode.value = true;
    router.push('/envelope_animation');
  } else {
    // Show incorrect password warning and reset input fields
    showWarning.value = true;
    inputError.value = true;  // Trigger red border
    inputValues.value = ['', '', '', ''];

    // Reset focus to the first input
    setTimeout(() => {
      input1.value.focus();
    }, 100);
  }
};

// Dynamically set the class based on the error status
const inputClass = () => {
  return `w-12 h-16 border-2 ${inputError.value ? 'border-red-500' : 'border-lovestory-500'} rounded-md text-center text-2xl`;
};

// Move focus to the next input or back to the previous input
const moveFocus = (event, nextInput, prevInput) => {
  const value = event.target.value;

  const currentIndex = [input1.value, input2.value, input3.value, input4.value].indexOf(event.target);
  inputValues.value[currentIndex] = value;

  // Reset error state when user starts typing again
  if (inputError.value) {
    inputError.value = false;
    showWarning.value = false;
  }

  if (value && nextInput) {
    nextInput.focus();
  }

  if (inputValues.value.every(val => val !== '')) {
    checkPassword();
  }
};

// Handle backspace key to move focus back
const handleKeydown = (event, nextInput, prevInput) => {
  if (event.key === 'Backspace' && event.target.value === '') {
    if (prevInput) {
      prevInput.focus();
    }
  }
};
</script>

<style scoped>
/*  */
</style>
