let showAllButton = document.getElementById("showall_id");
showAllButton.addEventListener("click", (e) => {
  e.preventDefault();
  showall();
});

//show all
function showall() {
  fetch("http://localhost:2000/api/product/")
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById("table_id");
      let tableCount = document.getElementById("tablebody_ids");
      let trcount = document.querySelectorAll("tr");
      if (trcount.length >= 2) {
        tableCount.remove();
      }

      data.forEach((cur) => {
        row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = `${cur.id}`;
        cell2.innerHTML = `${cur.name}`;
        cell3.innerHTML = `${cur.discription}`;
        cell4.innerHTML = `${cur.price}`;
        let tostring = cur.id.toString();
        let buttonTemplate = `<button class="bi bi-trash"  id="deletetemplate_id" onclick="delete_post('${tostring}');return false;" style="border:none;  background-color:white;"></button>
        <button class="bi bi-pen" type='button' id="edit_button" onclick="editSpecific('${tostring}');">edit</button>`;
        cell5.innerHTML = `${buttonTemplate}`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
//get id
function get_id() {
  let value = document.getElementById("getspecific_id").value;
  console.log(value);
  let ul = document.getElementById("user_list");
  fetch(`http://localhost:2000/api/product/${value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let li = document.createElement("li");
      for (i in data) {
        li.appendChild(document.createTextNode(`${i} : ${data[i]}, `));
        ul.appendChild(li);
      }
    });
}

//post
//notification
let notification = document.getElementById("notification_innerdiv_id");
//create one
function post_data() {
  let name = document.getElementById("name-label-id");
  let names = document.getElementById("name_id").value;
  let discription = document.getElementById("discription_id").value;
  let price = document.getElementById("price_id").value;
  if (
    names !== "" &&
    names !== undefined &&
    discription !== "" &&
    discription !== undefined &&
    price !== "" &&
    price !== undefined
  ) {
    let data = {
      name: names,
      discription: discription,
      price: price,
    };
    fetch("http://localhost:2000/api/product/", {
      method: "POST",
      headers: {
        "Contetn-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          alert("something went wrong");
        } else if (response.ok) {
          notification.innerHTML = "added";
          notification.style.color = "green";
          setTimeout(() => {
            notification.innerHTML = "";
          }, 2000);
        }
      })
      .then((data) => {
        var newtablerow = document.createElement("th");
        newtablerow.append;
      })
      .catch((error) => {
        console.error("Error", error);
      });
    name.innerHTML = "";
  } else {
    name.innerHTML = "enter all fields";
  }
}
let post = document.getElementById("postdata_id");
post.addEventListener("click", (e) => {
  e.preventDefault();
  post_data();
  showall();
});

//delete specific post
function delete_post(id) {
  console.log(id);
  fetch(`http://localhost:2000/api/product/${id}`, {
    method: "DELETE",
  });
  showall();
}

//get specific id
let searchButton = document.getElementById("serach_button_id");
let searchInput = "";

function get_id(id) {
  let tbody = document.getElementById("specific_id_tbody");
  fetch(`http://localhost:2000/api/product/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      let searchedId = `
            <tr>
                <td>${data.name}</td>
                <td>${data.discription}</td>
                <td>${data.price}</td>
            </tr>
            `;
      tbody.innerHTML = searchedId;
    });
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput = document.getElementById("getspecific_ids").value.toString();
  if (searchInput !== "" && searchInput !== undefined) {
    get_id(`${searchInput}`);
  } else {
    console.log("empty is not allowed");
  }
});

//edit specific  id

function editSpecific(id) {
  let newname = prompt("Enter new name", "");
  let newdis = prompt("enter new discription", "");
  let newprice = prompt("enter new price", "");

  fetch(`http://localhost:2000/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newname,
      discription: newdis,
      price: newprice,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Edited successfully");
        showall(); // Update the table after editing
      } else {
        console.error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

showall();
