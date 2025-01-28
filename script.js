// sélectionne la liste ul avec l'id maliste
var mainlist = document.getElementById("maListe");

// gère le clic sur la liste pour cocher! les tâches
mainlist.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
});

// crée la fonction newelement pour ajouter une nouvelle tâche
function newelement() {
  // crée un nouvel élément li
  var li = document.createElement("li");

  // attribue un id unique et je le rends draggable
  var uniqueid = "task_" + Date.now();
  li.setAttribute("id", uniqueid);
  li.setAttribute("draggable", "true");

  // mémorise son id au début du glisser
  li.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  });

  // récupère le texte saisi par l'utilisateur
  var inputvalue = document.getElementById("entreeUt").value;

  // créer un span pour le texte
  var textspan = document.createElement("span");
  textspan.className = "task-text";

  // met le texte saisi dans le span
  var t = document.createTextNode(inputvalue);
  textspan.appendChild(t);
  li.appendChild(textspan);

  // vérifie si l'input est vide
  if (inputvalue === "") {
    alert("écris quelque chose");
  } else {
    mainlist.appendChild(li);
  }

  // vide l'input
  document.getElementById("entreeUt").value = "";

  // ajoute la croix pour supprimer la tâche
  var spanclose = document.createElement("span");
  var txtclose = document.createTextNode("\u00D7");
  spanclose.className = "close";
  spanclose.appendChild(txtclose);
  li.appendChild(spanclose);

  // gère le clic sur la croix
  var closebuttons = document.getElementsByClassName("close");
  for (var i = 0; i < closebuttons.length; i++) {
    closebuttons[i].onclick = function () {
      var liparent = this.parentElement;
      liparent.style.display = "none";
    };
  }

  // ajoute un bouton pour modifier la tâche
  var editbtn = document.createElement("span");
  var edittxt = document.createTextNode("✎");
  editbtn.className = "edit";
  editbtn.appendChild(edittxt);
  li.appendChild(editbtn);

  // gère le clic sur le bouton edit
  var editbuttons = document.getElementsByClassName("edit");
  for (var j = 0; j < editbuttons.length; j++) {
    editbuttons[j].onclick = function () {
      var liparent2 = this.parentElement;
      var spantexte = liparent2.querySelector(".task-text");

      if (this.textContent === "✎") {
        var oldtext = spantexte.textContent;
        var inputedit = document.createElement("input");
        inputedit.type = "text";
        inputedit.value = oldtext;

        spantexte.textContent = "";
        spantexte.appendChild(inputedit);

        this.textContent = "✔";
      } else if (this.textContent === "✔") {
        var inputfield = spantexte.querySelector("input");
        var newtext = inputfield.value.trim();

        if (newtext) {
          spantexte.textContent = newtext;
        } else {
          spantexte.textContent = "tache vide";
        }

        this.textContent = "✎";
      }
    };
  }
}

// détecte la touche enter dans l'input
var inputfield = document.getElementById("entreeUt");
inputfield.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newelement();
  }
});

// détecte la touche enter sur le bouton
var addbutton = document.querySelector(".addBtn");
addbutton.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newelement();
  }
});

// configure le drag & drop sur les dropzones
var dropzones = document.getElementsByClassName("dropzone");
for (var k = 0; k < dropzones.length; k++) {
  dropzones[k].addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("dragover");
  });

  dropzones[k].addEventListener("dragleave", function () {
    this.classList.remove("dragover");
  });

  dropzones[k].addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");

    var data = e.dataTransfer.getData("text/plain");
    var draggeditem = document.getElementById(data);

    if (draggeditem) {
      var tasktext = draggeditem.querySelector(".task-text").textContent;
      this.textContent = tasktext;
      draggeditem.remove();
    }
  });
}
