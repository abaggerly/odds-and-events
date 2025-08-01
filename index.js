// Requirements
// For this workshop, you'll be starting from scratch! You are highly encouraged to reference previous solutions. Write JS to build an application that meets the following requirements:

// index.html is not modified. All elements are generated via JS.
// The application contains a form that allows users to input a number.
// When the user clicks the "Add number" button, the number they entered into the input field should be added to the number bank.
// The number bank should display all of the numbers that the user has entered.
// When the "Sort 1" button is clicked, the first number in the number bank is removed and placed into either the odd or even category.
// When the "Sort All" button is clicked, all numbers in the number bank are moved into either the odd or even category.
// Numbers are moved into the correct category based on whether they are odd or even.
// The numbers in the bank, odd category, and even category are stored as state variables.
// Functions are used to organize logic involving state changes.
// The application is rerendered whenever state changes.
// UI elements are organized into component functions.
// Event listeners modify state. They do not directly modify the document.
const numberBank = [];
const oddNumbers = [];
const evenNumbers = [];

// check if a number is even
const isEven = (num) => num % 2 === 0;

// Render function
function render() {
    // Clear any existing info
    document.body.innerHTML = ''; 

   
    const appDiv = document.createElement('div');
    appDiv.classList.add('app');

   
    function renderInputForm() {
        const form = document.createElement('form');
        form.classList.add("form-inline");
        form.innerHTML = `
        <div class="form-group mx-sm-3 mb-2">
            <input type="number" id="numberInput" class="form-control-sm" placeholder="Enter a number" required>
        
            <button type="submit" class="btn btn-outline-secondary btn-sm  mb-2">Add number</button>
            <button type="button" id="sortOneBtn" class="btn btn-outline-primary btn-sm mb-2">Sort 1</button>
            <button type="button" class="btn btn-outline-success btn-sm mb-2"id="sortAllBtn">Sort All</button>
            <button type="button" id="generateRandomBtn" class="btn btn-outline-danger btn-sm mb-2">Generate Random</button> <!-- Extension: Generate Random --> 
  </div>
        `;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputField = document.getElementById('numberInput');
            const number = parseInt(inputField.value);
                numberBank.push(number);
                inputField.value = ''; 
                render(); 
            
        });

        const sortOneBtn = form.querySelector('#sortOneBtn');
        sortOneBtn.addEventListener('click', () => {
            if (numberBank.length > 0) {
                const number = numberBank.shift(); 
                if (isEven(number)) {
                    evenNumbers.push(number);
                } else {
                    oddNumbers.push(number);
                }
                render();
            }
        });

        const sortAllBtn = form.querySelector('#sortAllBtn');
        sortAllBtn.addEventListener('click', () => {
            while (numberBank.length > 0) {
                const number = numberBank.shift();
                if (isEven(number)) {
                    evenNumbers.push(number);
                } else {
                    oddNumbers.push(number);
                }
            }
            render();
        });

        // Generate Random Number
        const generateRandomBtn = form.querySelector('#generateRandomBtn');
        generateRandomBtn.addEventListener('click', () => {
            const randomNumber = Math.floor(Math.random() * 100) + 1;  
            numberBank.push(randomNumber);
            render();
        });

        return form;
    }


    function renderNumberDisplay(title, numbers) {
        const div = document.createElement('div');
        div.classList.add('number-display');
        div.innerHTML = `<h2 class="text-secondary"><b><u>${title}</u></b></h2>`;
        const ul = document.createElement('ul');
        ul.classList.add("list-group");
        numbers.forEach((num) => {
            const li = document.createElement('li');
            li.classList.add("list-group-item");
            li.textContent = num;
            ul.appendChild(li);
        });
        div.appendChild(ul);
        return div;
    }

 
    appDiv.appendChild(renderInputForm());
    appDiv.appendChild(renderNumberDisplay('Number Bank', numberBank));
    appDiv.appendChild(renderNumberDisplay('Odd Numbers', oddNumbers));
    appDiv.appendChild(renderNumberDisplay('Even Numbers', evenNumbers));


    document.body.appendChild(appDiv);
}


render();
