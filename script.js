let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;
console.log("Contact Book App Initialized Successfully");

displayContacts();

function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (name === "" || phone === "") {
    alert("Name and phone are required!");
    return;
  }

  if (editIndex === -1) {
    // Add new contact
    contacts.push({ name, phone, email });
  } else {
    // Update existing contact
    console.log("Updating contact:", contacts[editIndex]);
    contacts[editIndex] = { name, phone, email };
    editIndex = -1;
  }

  const contact = { name, phone, email };
  console.log("Adding contact:", contact);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts();
  clearInputs();
}

function displayContacts() {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${contact.name} - ${contact.phone} - ${contact.email}
      <button onclick="editContact(${index})">Edit</button>
      <button onclick="deleteContact(${index})">Delete</button>
    `;
    console.log("Contact added successfully");
    list.appendChild(li);
  });
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
  }
  console.log("Deleting contact:", contacts[index]);
}

function editContact(index) {
  const contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  console.log("Editing contact:", contacts[index]);

  editIndex = index;
}

function searchContact() {
  const search = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("contactList");
  list.innerHTML = "";
  console.log("Searching for:", search);

  contacts.forEach((contact, index) => {
    if (contact.name.toLowerCase().includes(search)) {
      const li = document.createElement("li");

      li.innerHTML = `${contact.name} - ${contact.phone} - ${contact.email}
        <button onclick="editContact(${index})">Edit</button>
        <button onclick="deleteContact(${index})">Delete</button>
      `;

      list.appendChild(li);
    }
  });
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}