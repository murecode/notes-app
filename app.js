const newNote    = document.querySelector(".newNote");
const popupBox   = document.querySelector(".popupBox");
const titleNote  = document.querySelector(".titleNote");
const descNote   = document.querySelector(".descNote");
const submitNote = document.querySelector(".submitNote");
const iconClose  = popupBox.querySelector(".iconClose");

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]"); //1

newNote.addEventListener("click", () => {
  console.log("agregar nueva nota")
  popupBox.classList.remove('invisible')
  popupBox.classList.add('visible');
});

submitNote.addEventListener("click", e => {
  e.preventDefault();
  location.reload(); // actualiza el navegador automaticamente
  let title = titleNote.value;
  let desc = descNote.value;
  console.log(title, desc);

  if (title || desc) {

    //Set curr date
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let note = {
      title: title,
      desc: desc,
      date: `${month} ${day} ${year}`
    }

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));

    console.log(notes)
  }

  iconClose.click();
});

function showNotes() {
  notes.forEach((note) => {
    let noteTag =
                `
      <li class="note flex flex-col bg-blue-50 h-64 h-full px-5 pt-4 rounded">
      <div class="details">
        <p class="font-medium text-slate-600">${ note.title }</p>
        <span class="text-sm">${ note.desc }</span>
      </div>
      <!-- footer Nota -->
      <div class="buttom-content flex justify-between my-3 pt-2.5 border-t-2">
        <span class="text-sm">${ note.date }</span>
        <!-- opciones de Nota -->
        <div class="settings group">
          <i class="fa-solid fa-ellipsis text-xl"></i>

          <ul class="menu absolute justify-between items-center
                     bottom-0 bg-blue-50 px-1 py-1 right-0 bottom-6
                     rounded shadow-md scale-0 group-hover:scale-100
                     transition-transform origin-bottom-right">

            <li class="border-none flex items-center justify-star
                       h-8 px-3.5 py-4 rounded text-slate-600 cursor-pointer 
                       bg-blue-50 hover:bg-blue-200 ">
              <i class="fa-solid fa-pen pr-2 text-sm"></i>Editar
            </li>

            <li class="border-none flex items-center justify-star
                       h-8 px-3.5 py-4 rounded text-slate-600 cursor-pointer 
                       bg-blue-50 hover:bg-blue-200">
              <i class="fa-solid fa-trash pr-2 text-sm"></i>Eliminar
            </li>
          </ul>
        </div>
      </div>
    </li>
                `;
            newNote.insertAdjacentHTML("afterend", noteTag)
    });
}
showNotes();



iconClose.addEventListener("click", () => {
  console.log("Cerrado")
  popupBox.classList.add("invisible")
});




// 1. obtiene las notas del LocalStorage...
// si existen, las parsea en un objeto,...
// sino, devuelve una matriz vacía.