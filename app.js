const newNote = document.querySelector(".newNote");
const popupBox = document.querySelector(".popupBox");
const titleNote = document.querySelector(".titleNote");
const descNote = document.querySelector(".descNote");
const submitNote = document.querySelector(".submitNote");
const iconClose = popupBox.querySelector(".iconClose");

const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const weekDays = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]" ); //1

newNote.addEventListener("click", () => {
  console.log("agregar nueva nota")
  popupBox.classList.remove('invisible')
  popupBox.classList.add('visible');
});

submitNote.addEventListener("click", e => {
  e.preventDefault();
  let title = titleNote.value;
  let desc = descNote.value;
  console.log(title, desc);

  if (title || desc) {

    //Set curr date
    let dateObj = new Date();
    let month = months[ dateObj.getMonth() ];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let note = {
      title: title,
      desc: desc,
      date: `${month} ${day} ${year}`
    }

    notes.push(note)

    localStorage.setItem("notes", JSON.stringify(notes));

    console.log(notes)
  }

  iconClose.click();
});

iconClose.addEventListener("click", () => {
  console.log("Cerrado")
  popupBox.classList.add("invisible")
});


// 1. obtiene las notas del LocalStorage...
// si existen, las parsea en un objeto,...
// sino, devuelve una matriz vacía.