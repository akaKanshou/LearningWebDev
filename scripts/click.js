
const listItems = document.querySelectorAll("ol");

function toggleDone(e) {
  if (!e.target.className) {
    e.target.className = "done";
  } else {
    e.target.className = "";
  }
}

listItems.forEach((item) => {
  item.addEventListener("click", toggleDone);
});

const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/left.jpg") {
    myImage.setAttribute("src", "images/bg.jpg");
  } else {
    myImage.setAttribute("src", "images/left.jpg");
  }
});

let heading = document.querySelector('h1');
heading.textContent = 'JS heading'

function setUser() {
  let myname = prompt('Please enter username: ');
  localStorage.setItem("name", myname);
  heading.textContent = 'JS Heading by ' + myname;
}

if (!localStorage.getItem("name")) {
  setUser();
} else {
  const storedName = localStorage.getItem("name");
  heading.textContent = 'JS Heading by ' + storedName;
}

let myButton = document.querySelector('button');

myButton.addEventListener('click', () => { setUser(); });