const options = document.querySelectorAll('.option');
        const resultDiv = document.getElementById('result');
      
        options.forEach(option => {
          option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            // resultDiv.textContent = `Selected Option: ${option.textContent}`;
          });
        });

let web = 0;
let mobile = 0; 
let data = 0;
let cyper = 0;
