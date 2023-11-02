function showall(){
    
    fetch('http://localhost:2000/api/product/')
    .then(response => response.json()) 
    .then(data=> {
        let liElement = document.getElementById('user_list')
        liElement.innerHTML = '';
        data.forEach((cur)=> {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${cur.id},${cur.name},${cur.discription},${cur.price}`))
            liElement.appendChild(li);
        })
    })
}

function get_id(){
   let value = document.getElementById('getspecific_id').value
   console.log(value);
   let ul = document.getElementById('user_list')
   fetch(`http://localhost:2000/api/product/${value}`)
   .then(response=> response.json())
   .then(data=> {
    console.log(data)
    let li = document.createElement('li');
   for(i in data){
    li.appendChild(document.createTextNode(`${i} : ${data[i]}, `))
    ul.appendChild(li);
   }
   })
}