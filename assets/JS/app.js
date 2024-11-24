// Get the form and table body elements from the DOM
var productForm = document.getElementById("productForm"); // Select the form
var cartTableBody = document.querySelector("#cartTable tbody"); // Select the table body

// Function to save the table data to Local Storage
function saveToLocalStorage() {
    // Create an empty array to store rows
    var rows = [];
    
    // Get all the rows in the table
    var tableRows = document.querySelectorAll("#cartTable tbody tr");
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i];
        
        // Create an object with the row data
        var product = {
            name: row.cells[0].textContent, // First cell: product name
            price: row.cells[1].textContent, // Second cell: product price
            category: row.cells[2].textContent, // Third cell: product category
            image: row.cells[3].querySelector("img").src // Fourth cell: product image URL
        };
        
        // Add the product object to the array
        rows.push(product);
    }
    
    // Save the array to Local Storage as a string
    localStorage.setItem("cartData", JSON.stringify(rows));
}

// Function to load data from Local Storage
function loadFromLocalStorage() {
    // Get saved data from Local Storage
    var savedData = localStorage.getItem("cartData");
    
    // Check if there is data
    if (savedData) {
        // Convert the JSON string back to an array
        var rows = JSON.parse(savedData);
        
        // Loop through each product and add it to the table
        for (var i = 0; i < rows.length; i++) {
            var product = rows[i];
            addRowToTable(product.name, product.price, product.category, product.image);
        }
    }
}

// Function to add a row to the table
function addRowToTable(name, price, category, image) {
    // Create a new row element
    var newRow = document.createElement("tr");
    
    // Add HTML content to the row
    newRow.innerHTML = 
        "<td>" + name + "</td>" + // First cell: product name
        "<td>" + price + "</td>" + // Second cell: product price
        "<td>" + category + "</td>" + // Third cell: product category
        "<td><img src='" + image + "' alt='" + name + "' style='max-width: 50px; max-height: 50px;'></td>" + // Fourth cell: product image
        "<td><button class='deleteBtn'>Delete</button></td>"; // Fifth cell: delete button

    // Add the row to the table
    cartTableBody.appendChild(newRow);
    
    // Add an event listener to the delete button
    var deleteButton = newRow.querySelector(".deleteBtn");
    deleteButton.addEventListener("click", function () {
        // Remove the row from the table
        newRow.remove();
        
        // Save the updated table to Local Storage
        saveToLocalStorage();
    });
}

// Event listener for the form submission
productForm.addEventListener("submit", function (event) {
    // Prevent the page from reloading
    event.preventDefault();
    
    // Get the values from the form inputs
    var productName = document.getElementById("productName").value; // Get product name
    var productPrice = document.getElementById("productPrice").value; // Get product price
    var productCategory = document.getElementById("productCategory").value; // Get product category
    var productImage = document.getElementById("productImage").value; // Get product image URL
    
    // Add the product to the table
    addRowToTable(productName, productPrice + " $", productCategory, productImage);
    
    // Save the updated table to Local Storage
    saveToLocalStorage();
    
    // Clear the form inputs
    productForm.reset();
});

// Load the saved data when the page is loaded
window.addEventListener("DOMContentLoaded", function () {
    // Call the function to load data from Local Storage
    loadFromLocalStorage();
});
