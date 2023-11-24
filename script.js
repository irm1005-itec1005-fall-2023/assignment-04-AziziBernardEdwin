/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
let items = getItems();


// Constants

// Fetching elements using IDs for TASK_CONTAINER, TASK_TEMPLATE, and BUTTON_ADDITION
const TASK_CONTAINER = document.getElementById("Tasks");
const TASK_TEMPLATE = document.getElementById("TaskTemplate");
const BUTTON_ADDITION = document.getElementById("start");
const MAX_DISPLAY_ITEMS = 15;
const DELETE_COMPLETED_BUTTON = document.getElementById("deleteCompleted");


// DOM Elements
document.addEventListener("DOMContentLoaded", onPageLoad);


//
// Functions

// Fetch items from local storage or initialize an empty array

// Function to get items from local storage
function getItems() {
  const value = localStorage.getItem("todo") || "[]";
  return JSON.parse(value);
}

// Function to set items in local storage
function setItems(items) {
  const itemsJson = JSON.stringify(items);
  localStorage.setItem("todo", itemsJson);
}

function updateItem(item, key, value){
  item[key] = value;  

  setItems(items);
  refreshList();
  
}
// Function to add a new item
function addItem(){
  // Add a new item object to the beginning of the items array
  items.unshift({
    description: "",
    completed: false 
  });

  // Update local storage and refresh the displayed list
  setItems(items);
  refreshList();
}

function updateCompletedStatus(item, completed) {
  item.completed = completed;
  setItems(items);
  refreshList();
}


// Function to refresh the displayed list
function refreshList(){
  items.sort((a,b) => {
      if (a.completed){
        return 1;
        
      }

      if (b.completed){
        return -1;
        
      }
      
      return a.description < b.description ? -1: 1;

  });

  function deleteCompletedItems() {
    items = items.filter((item) => !item.completed);
    setItems(items);
    refreshList();
  }

  
  // Clear the existing content inside TASK_CONTAINER
  TASK_CONTAINER.innerHTML = "";

  for (let i = 0; i < items.length && i < MAX_DISPLAY_ITEMS; i++) {
    const item = items[i];
  }

  // Loop through items array and create elements based on the template
  for (const item of items) {
    // Clone the content of the template for each item
    const itemElement = TASK_TEMPLATE.content.cloneNode(true);

    // Select individual elements within the cloned template
    const descriptionInput = itemElement.querySelector(".description");
    const completedInput = itemElement.querySelector(".task-complete");

    // Assign values from item to the cloned elements
    descriptionInput.value = item.description; 
    completedInput.checked = item.completed; 

    descriptionInput.addEventListener("change", () =>{
      updateItem(item, "description", descriptionInput.value);
    });

    completedInput.addEventListener("change", () => {
      updateCompletedStatus(item, completedInput.checked);
    });

    // Append the cloned itemElement to the TASK_CONTAINER
    TASK_CONTAINER.appendChild(itemElement);
  }
}

TASK_CONTAINER.addEventListener("click", (event) => {
  if (event.target.matches("#edit")) {
    const selectedItem = event.target.closest(".Task");
    const itemIndex = Array.from(selectedItem.parentNode.children).indexOf(selectedItem);
    const selectedItemData = items[itemIndex];
    editTask(selectedItemData);
  }

  if (event.target.matches("#delete")) {
    const selectedItem = event.target.closest(".Task");
    const itemIndex = Array.from(selectedItem.parentNode.children).indexOf(selectedItem);
    items.splice(itemIndex, 1);
    setItems(items);
    refreshList();
  }
});
// Event listener for the button click to add a new item
BUTTON_ADDITION.addEventListener("click", () => {
  addItem();
})

DELETE_COMPLETED_BUTTON.addEventListener("click", () => {
  deleteCompletedItems();
});

// Initial refresh of the list on page load
refreshList();

// Function to refresh the list on page load
function onPageLoad() {
  refreshList();
}



// Logging the items array to console
console.log(items);

