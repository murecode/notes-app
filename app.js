const newNote    = document.querySelector(".newNote");
const popupBox   = document.querySelector(".popupBox");
const titleNote  = document.querySelector(".titleNote");
const popupBoxTitle = document.querySelector('.popupBox-title')
const submitBtn = document.querySelector('.submit-btn')
const descNote   = document.querySelector(".descNote");
const submitNote = document.querySelector(".submitNote");
const iconClose  = popupBox.querySelector(".iconClose");

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]"); //1

newNote.addEventListener("click", () => {

  popupBox.classList.remove('invisible');
  popupBox.classList.add('visible');

});

submitNote.addEventListener("click", e => {
  e.preventDefault();
  location.reload(); // actualiza el navegador automaticamente

  let title = titleNote.value;
  let description = descNote.value;
  // console.log(title, description);

  if (title || description) {

    //Set curr date
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let note = {
      title: title,
      description: description,
      date: `${month} ${day} ${year}`
    }

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));

  }

  iconClose.click();
});


iconClose.addEventListener("click", () => {
  popupBox.classList.add("invisible")
});


function showNotes() {
  notes.forEach((note, id) => {
    let noteTag =
                `
    <div class="note flex flex-col bg-blue-50 w-auto h-64 px-5 pt-4 rounded-lg">

      <div>
        <p class="font-medium text-slate-600">${ note.title }</p>
        <div class="h-32 overflow-hidden bg-orange-400">
          <span class="inline-block text-sm">${ note.description }</span>
        </div>
      </div>

      <!-- footer Nota -->
      <div class="flex justify-between pt-2">
        <span class="text-sm">${ note.date }</span>

        <!-- opciones de Nota -->
        <div class="settings group">
          <i class="fa-solid fa-ellipsis text-xl"></i>

          <ul class="menu relative items-center bottom-0 bg-blue-50 px-1 py-1 right-0 bottom-6
                     rounded shadow-md scale-0 group-hover:scale-100 transition-transform origin-bottom-right">

            <li onclick="editNote(${id}, '${note.title}', '${note.description}')" class="border-none flex items-center justify-star
                       h-8 px-3.5 py-4 rounded text-slate-600 cursor-pointer bg-blue-50 hover:bg-blue-200 ">
              <i class="fa-solid fa-pen pr-2 text-sm"></i>Editar
            </li>

            <li onclick="deleteNote(${id})" class="border-none flex items-center justify-star
                       h-8 px-3.5 py-4 rounded text-slate-600 cursor-pointer 
                       bg-blue-50 hover:bg-blue-200">
              <i class="fa-solid fa-trash pr-2 text-sm"></i>Eliminar
            </li>
            
          </ul>

        </div>
      </div>

    </div>
                `;
            newNote.insertAdjacentHTML('beforebegin', noteTag)
    });
}
showNotes();


//edit notes
function editNote(noteId, noteTitle, noteDescription) {

  newNote.click(); // se llama al popup 
  // console.log( noteId, noteTitle, noteDescription );

  titleNote.value = noteTitle;
  descNote.value = noteDescription;
  popupBoxTitle.innerText = "Editar Nota"
  submitBtn.innerText = "Actualizar"
  
}


//delete notes
function deleteNote(noteId) {
  notes.splice(noteId, 1)
  localStorage.setItem("notes", JSON.stringify(notes));
  location.reload(); // actualiza el navegador automaticamente
  // console.log("Note was deleted" );
}






/* 1. obtiene las notas del LocalStorage...
  si existen, las parsea en un objeto,...
  sino, devuelve una matriz vacía. */ 