const doggo = 'http://localhost:3000/pups'

// DATA
let fetchDogs = () => {
    fetch(doggo).then(response => response.json()).then(dogs => { dogs.forEach(dog => renderDogs(dog))})
}
fetchDogs(); 

// DOM 
let renderDogs = (dog) => {
    let div = document.querySelector('#dog-bar')
    let span = document.createElement('span')
    span.innerText = dog.name
    div.appendChild(span)

    span.addEventListener('click', () => clickEvent(dog))
}

// event handler
let clickEvent = (dog) => {
    let dogInfo = document.querySelector('#dog-info')
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let status = document.createElement('button')

    img.src = dog.image
    h2.textContent = dog.name
    
    if (dog.isGoodDog == true) {
        status.textContent = "Good Dog!"
    } else {
        status.textContent = "Bad Dog!"
    }
    
    status.addEventListener('click', () => patchDog(dog))
    
    dogInfo.innerHTML = ""

    dogInfo.append(h2, img, status)
}


let patchDog = (dog) => {
    fetch(`${doggo}/${dog.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        }),
      })
      .then(response => response.json())
      .then(dog => {
        clickEvent(dog);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      debugger
}