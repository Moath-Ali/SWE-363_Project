// const options = document.querySelectorAll('.option');
//         // const resultDiv = document.getElementById('result');
      
//         options.forEach(option => {
//           option.addEventListener('click', () => {
//             options.forEach(o => o.classList.remove('selected'));
//             option.classList.add('selected');
//             // resultDiv.textContent = `Selected Option: ${option.textContent}`;
//           });
//         });

let web = 0;
let mobile = 0; 
let data = 0;
let cyper = 0;
// function selectedOp(option,questionId){
//   console.log("hehe")
//     const options = document.querySelectorAll(`#${questionId} .option`);
//     options.forEach(o => o.classList.remove('selected', 'removed'));
//     option.classList.add('selected', 'removed');
// }
// function selectOption(option) {
//   const optionsContainer = option.parentElement;
//   const options = optionsContainer.querySelectorAll('.option');
//   // const resultDiv = document.getElementById('result');
//   const questionId = optionsContainer.getAttribute('data-options');

//   options.forEach(o => o.classList.remove('selected', 'removed'));
//   option.classList.add('selected', 'removed');
//   // resultDiv.textContent = `Selected Option for ${questionId}: ${option.textContent}`;
// }

const selectedOptions = {};

  function selectOption(option) {
    const optionsContainer = option.parentElement;
    const questionId = optionsContainer.getAttribute('data-options');
    const resultDiv = document.getElementById('result');

    if (selectedOptions[questionId]) {
      // If an option is already selected for this question, remove the selection
      selectedOptions[questionId].classList.remove('selected', 'removed');
    }

    // Set the new selected option for this question
    selectedOptions[questionId] = option;

    // Update the resultDiv with the selected option information
    // resultDiv.textContent = `Selected Option for ${questionId}: ${option.textContent}`;

    // Apply the 'selected' and 'removed' classes to the selected option
    option.classList.add('selected', 'removed');
  }