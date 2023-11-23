/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables



// Constants

// Fetching elements using IDs for TASK_CONTAINER, TASK_TEMPLATE, and BUTTON_ADDITION
const TASK_CONTAINER = document.getElementById("Tasks");
const TASK_TEMPLATE = document.getElementById("TaskTemplate");
const BUTTON_ADDITION = document.getElementById("start");

// DOM Elements

//
// Functions

// Fetch items from local storage or initialize an empty array
let items = getItems();

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


  
  // Clear the existing content inside TASK_CONTAINER
  TASK_CONTAINER.innerHTML = "";

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

    completedInput.addEventListener("change", () =>{
      updateItem(item, "description", descriptionInput.value);
    });

    // Append the cloned itemElement to the TASK_CONTAINER
    TASK_CONTAINER.appendChild(itemElement);
  }
}

// Event listener for the button click to add a new item
BUTTON_ADDITION.addEventListener("click", () => {
  addItem();
})


// Initial refresh of the list on page load
refreshList();


// Logging the items array to console
console.log(items);


//

// Add a heading to the app container
// function inititialise() {
  // If anything is wrong with the app container then end
 // if (!appContainer) {
   // console.error("Error: Could not find app contianer");
    //return;
  // }


  // Create an h1 and add it to our app
 // const h1 = document.createElement("h1");
  //h1.innerText = headingText;
  //appContainer.appendChild(h1);

  // Init complete
//  console.log("App successfully initialised");
//}

//
// Inits & Event Listeners
//
// inititialise();