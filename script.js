//  JSON data
const jsonData = [
    { id: 1, paramCode: "ServerURL", paramValue: "https://example.com/api", status: "Active", documentation: "Main server URL" },
    { id: 2, paramCode: "Timeout", paramValue: "5000", status: "Inactive", documentation: "Request timeout in milliseconds" },
    { id: 3, paramCode: "MaxRetries", paramValue: "3", status: "Active", documentation: "Maximum number of retries for a request" },
    { id: 4, paramCode: "ApiKey", paramValue: "your-api-key", status: "Active", documentation: "API key for authentication" },
    { id: 5, paramCode: "LogLevel", paramValue: "debug", status: "Inactive", documentation: "Logging level for debugging" },
    { id: 6, paramCode: "PortNumber", paramValue: "8080", status: "Active", documentation: "Server port number" },
    { id: 7, paramCode: "MaxConnections", paramValue: "100", status: "Inactive", documentation: "Maximum simultaneous connections" },
    { id: 8, paramCode: "EnableFeatureX", paramValue: "true", status: "Active", documentation: "Toggle feature X" },
    { id: 9, paramCode: "DatabaseURL", paramValue: "mongodb://localhost:27017", status: "Active", documentation: "Database connection URL" },
    { id: 10, paramCode: "LogLevel", paramValue: "info", status: "Inactive", documentation: "Logging level for information" }
  ];
 
  
  // Function to generate table from JSON data
  function generateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";
  
    jsonData.forEach((row) => {
      const newRow = tableBody.insertRow();
      newRow.setAttribute("data-row-id", row.id);
  
      const paramCodeCell = newRow.insertCell(0);
      const paramValueCell = newRow.insertCell(1);
      const statusCell = newRow.insertCell(2);
  
      paramCodeCell.textContent = row.paramCode;
      paramValueCell.textContent = row.paramValue;
      statusCell.textContent = row.status;
  
      newRow.addEventListener("click", () => {
        displayFormData(row);
      });
    });
  }
  
  // Function to display form data on row click
  function displayFormData(row) {
    const form = document.getElementById("dataForm");
    form.setAttribute("data-row-id", row.id);
    document.getElementById("editId").value = row.id;
    document.getElementById("editParamCode").value = row.paramCode;
    document.getElementById("editParamValue").value = row.paramValue;
    document.getElementById("editStatus").value = row.status;
    document.getElementById("editDocumentation").value = row.documentation;
  
    enableForm();
  
    // Highlight the selected row
    const tableRows = document.querySelectorAll("#dataTable tbody tr");
    tableRows.forEach((tableRow) => {
      tableRow.classList.remove("selected");
    });
    const selectedRow = document.querySelector(`#dataTable tbody tr[data-row-id="${row.id}"]`);
    selectedRow.classList.add("selected");
  }
  
  // Function to enable the form
  function enableForm() {
    const form = document.getElementById("dataForm");
    form.removeAttribute("disabled");
  }
  

// Function to add a new row
function addRow() {
    const form = document.getElementById("dataForm");
  
    // Create a new row object
    const newRow = {
      id: jsonData.length + 1,
      paramCode: document.getElementById("editParamCode").value,
      paramValue: document.getElementById("editParamValue").value,
      status: document.getElementById("editStatus").value,
      documentation: document.getElementById("editDocumentation").value,
    };
  
    // Add the new row to the jsonData array
    jsonData.push(newRow);
  
    // Refresh the table
    generateTable();
  
    // Clear and disable the form
    clearAndDisableForm();

  
    // Highlight the selected row
    const tableRows = document.querySelectorAll("#dataTable tbody tr");
    tableRows.forEach((tableRow) => {
      tableRow.classList.remove("selected");
    });
  
    enableForm();
  }
  
  
  // Function to save data
  function saveData() {
    const form = document.getElementById("dataForm");
    const rowId = form.getAttribute("data-row-id");
  
    // Update the corresponding row in the JSON data
    const updatedRow = {
      id: parseInt(rowId) || jsonData.length + 1,
      paramCode: document.getElementById("editParamCode").value,
      paramValue: document.getElementById("editParamValue").value,
      status: document.getElementById("editStatus").value,
      documentation: document.getElementById("editDocumentation").value,
    };
  
    if (rowId) {
      // If editing an existing row, update the data
      const index = jsonData.findIndex((row) => row.id === updatedRow.id);
      if (index !== -1) {
        jsonData[index] = updatedRow;
      }
    } else {
      // If adding a new row, push it to the data array
      jsonData.push(updatedRow);
    }
  
    // Refresh the table
    generateTable();
    // Clear and disable the form
    clearAndDisableForm();
  }
  
  // Function to clear and disable the form
  function clearAndDisableForm() {
    const form = document.getElementById("dataForm");
    form.reset();
    form.setAttribute("disabled", "true");
  }
  
  // Function to cancel editing
  function cancelEdit() {
    clearAndDisableForm();
  }
  
  // Function to search the table
  function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("dataTable");
    const rows = table.querySelectorAll("tbody tr");
  
    rows.forEach((row) => {
      const cells = row.getElementsByTagName("td");
      let found = false;
  
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell) {
          const textValue = cell.textContent || cell.innerText;
          if (textValue.toUpperCase().indexOf(filter) > -1) {
            found = true;
            break;
          }
        }
      }
  
      row.style.display = found ? "" : "none";
    });
  }
  
  // Event listener to call generateTable on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Initial table generation
    generateTable();
  });
  