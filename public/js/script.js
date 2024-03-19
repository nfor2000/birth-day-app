const toggleMenu = document.querySelector('.open-menu');
const menu = document.querySelector('header section nav');
const overlay = document.querySelector('.overlay');
const nameInput = document.getElementById('name')
const email = document.getElementById('email')
const wish = document.getElementById('wish')
const alert= document.getElementById('msg')
const menuLinks = document.querySelectorAll('header section nav a');

toggleMenu.onclick = () => {
     if (menu.classList.contains('translate-x-full')) {
          openMenu()
     } else {
          closeMenu()
     }
}


function openMenu(){
     menu.classList.remove('translate-x-full')
     overlay.classList.remove('hidden')
}

function closeMenu(){
     menu.classList.add('translate-x-full')
     overlay.classList.add('hidden')
}

menuLinks.forEach(link => link.addEventListener('click', closeMenu))

const form = document.getElementById('form');

form.onsubmit = async (e) => {
     e.preventDefault();
     const formData = {
          name: nameInput.value,
          email: email.value,
          wish: wish.value,
     };
     try {
          const response = await fetch("/sendmail", {
               method: 'POST',

               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(formData)
          });

          if (response.ok) {
               const data = await response.json();
               nameInput.value = '';
               email.value = '';
               wish.value = '';
               showAlert("success", data)
          } else {
               const data = await response.json();
               console.log(data);
               showAlert("error", data)
          }
     } catch (error) {
          console.error(error);
     }
}

function showAlert(class_name, msg) {
     alert.classList.remove('hidden');
     alert.classList.add(class_name);
     alert.classList.add('flex')
     alert.innerHTML = `${msg}`;

     setTimeout(()=> {
          alert.classList.add('hidden');
          alert.classList.remove(class_name);
          alert.classList.remove('flex')
     }, 5000)
}