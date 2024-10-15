<template>
  <div>
    <div class="flex space-x-2 my-6 opacity-70">
      <input 
        type="text" 
        maxlength="1" 
        class="w-12 h-16 border-2 border-lovestory-500 rounded-md text-center text-2xl"
        placeholder="D"
        ref="input1"
        @input="moveFocus($event, input2, null)"
        @keydown="handleKeydown($event, input2)"
      />
      <input 
        type="text" 
        maxlength="1" 
        class="w-12 h-16 border-2 border-lovestory-500 rounded-md text-center text-2xl"
        placeholder="D"
        ref="input2"
        @input="moveFocus($event, input3, input1)"
        @keydown="handleKeydown($event, input3, input1)"
      />
      <input 
        type="text" 
        maxlength="1" 
        class="w-12 h-16 border-2 border-lovestory-500 rounded-md text-center text-2xl"
        placeholder="M"
        ref="input3"
        @input="moveFocus($event, input4, input2)"
        @keydown="handleKeydown($event, input4, input2)"
      />
      <input 
        type="text" 
        maxlength="1" 
        class="w-12 h-16 border-2 border-lovestory-500 rounded-md text-center text-2xl"
        placeholder="M"
        ref="input4"
        @input="moveFocus($event, null, input3)"
        @keydown="handleKeydown($event, null, input3)"
      />
    </div>
  </div>
  <!-- Conditionally show the story when the password is correct -->
  <StoryComponent v-if="showStory" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Correct password for comparison
const correctPassword = '1290';

// Store the input values
const inputValues = ref(['', '', '', '']);

// Create refs for each input
const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);
const input4 = ref(null);
const router = useRouter();

// Function to check if all inputs are filled and if the password is correct
const checkPassword = () => {
  const enteredPassword = inputValues.value.join('');
  if (enteredPassword === correctPassword) {
    console.log('Correct password!');
    router.push('/envelope_animation'); // Navigate to story_page on success
  } else {
    console.log('Incorrect password.');
  }
};

// Move focus to the next input or back to the previous input
const moveFocus = (event, nextInput, prevInput) => {
  const value = event.target.value;

  // Update inputValues array
  const currentIndex = [input1.value, input2.value, input3.value, input4.value].indexOf(event.target);
  inputValues.value[currentIndex] = value;

  // Move focus to the next input if the current input has a value
  if (value && nextInput) {
    nextInput.focus();
  }

  // Automatically check the password when all inputs are filled
  if (inputValues.value.every(val => val !== '')) {
    checkPassword();
  }
};

// Handle backspace key to move focus back
const handleKeydown = (event, nextInput, prevInput) => {
  if (event.key === 'Backspace' && event.target.value === '') {
    // Move focus to the previous input if the current input is empty
    if (prevInput) {
      prevInput.focus();
    }
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>