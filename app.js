const newNote= document.querySelector(".newNote");
const submitNote= document.querySelector(".submitNote");
const popupBox = document.querySelector(".popupBox");
const iconClose = popupBox.querySelector(".iconClose");

newNote.addEventListener("click", () => {
    console.log("agregar nueva nota")
    popupBox.classList.remove('invisible')
    popupBox.classList.add('visible');
});

submitNote.addEventListener("click", e => {
    e.preventDefault();
    
    console.log("Nota creada");

    iconClose.click();
});

iconClose.addEventListener("click", ()=> {
    console.log("Cerrado")
    popupBox.classList.add("invisible")
});
