document.addEventListener('DOMContentLoaded', () => {
    // Parse JSON data
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate the user list on load
    generateUserList(userData, stocksData);
  
    // Register the delete button event listener
    const deleteButton = document.querySelector('#deleteUser');
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
    });
  
    // Register the save button event listener to update user details
    const saveButton = document.querySelector('#saveUser');
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const user = userData.find(user => user.id == userId);
      user.user.firstname = document.querySelector('#firstname').value;
      user.user.lastname = document.querySelector('#lastname').value;
      user.user.address = document.querySelector('#address').value;
      user.user.city = document.querySelector('#city').value;
      user.user.email = document.querySelector('#email').value;
      generateUserList(userData, stocksData);
    });
  });
  
  // Function to generate the user list
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear existing list to avoid stacking
    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Register the event listener for user selection
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  // Handle the user list click
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);
  }
  
  // Populate the form with user data
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  // Render the portfolio list for the selected user
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous list
  
    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Register the event listener for viewing stock details
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  // View stock information
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    const stock = stocks.find(s => s.symbol == symbol);
  
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }
  

