let showAllButton = document.getElementById('showall_id');
showAllButton.addEventListener('click',(e)=> {
    e.preventDefault();
    showall();
})
function showall() {
  fetch("http://localhost:2000/api/product/")
    .then((response) => response.json())
    .then((data) => {
        let table = document.getElementById("table_id");
        let tableCount = document.getElementById("tablebody_id")
        tableCount.remove();
    
      data.forEach((cur) => {
        row= table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
    
        cell1.innerHTML = `${cur.id}`;
        cell2.innerHTML = `${cur.name}`;
        cell3.innerHTML = `${cur.discription}`;
        cell4.innerHTML = `${cur.price}`;
      });
      
    });
}

function get_id() {
  let value = document.getElementById("getspecific_id").value;
  console.log(value);
  let ul = document.getElementById("user_list");
  fetch(`http://localhost:2000/api/product/${value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let li = document.createElement("li");
      for (i in data) {
        li.appendChild(document.createTextNode(`${i} : ${data[i]}, `));
        ul.appendChild(li);
      }
    });
}

//post
let post = document.getElementById('postdata_id')
post.addEventListener('click',(e)=> {
    e.preventDefault();
    post_data();
    
})
function post_data() {
  let name = document.getElementById("name_id").value;
  let discription = document.getElementById("discription_id").value;
  let price = document.getElementById("price_id").value;
  let data = {
    name: name,
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
      window.alert("something went wrong");
    }
    else if(response.ok) {
      window.alert("added successfully");
    }
  });
  
}

//delete specific post

function delete_post() {
  let delete_id = document.getElementById("delete_id").value;
  fetch(`http://localhost:2000/api/product/${delete_id}`, {
    method: "DELETE",
  });
}
