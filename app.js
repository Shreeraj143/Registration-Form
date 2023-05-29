let submit = document.getElementById("submit");

const info = {
  name: "",
  email: "",
  website: "",
  gender: "",
  LangArr: [],
  profile: "",
};

const getData = () => {
  info.name = document.getElementById("name").value;
  info.email = document.getElementById("email").value;
  info.website = document.getElementById("website").value;
  info.profile = document.getElementById("profile").value;
  info.gender = document.querySelector(
    'input[name = "male-female"]:checked'
  ).value;

  let Language = document.querySelectorAll(".checkbox:checked");

  info.LangArr = [];
  Language.forEach((item) => {
    info.LangArr.push(item.value);
  });

  if (localStorage.getItem("infoSection") === null) {
    infoItem = [];
  } else {
    infoItem = JSON.parse(localStorage.getItem("infoSection"));
  }
  infoItem.push(info);
  localStorage.setItem("infoSection", JSON.stringify(infoItem));
};

const showData = () => {
  let cardContainer = document.getElementById("cardContainer");

  let cards = "";

  let getLocalStorage = localStorage.getItem("infoSection");

  if (getLocalStorage === null) {
    console.log("null");
  } else {
    cardDivArr = JSON.parse(getLocalStorage);

    cardDivArr.forEach((item, index) => {
      cards += `<div class="card">
            <img src="${item.profile}" align="left">
            <div class="info">
                <p>Name : ${item.name}</p>
                <p>Email : ${item.email}</p>
                <p>Website : <a href="${item.website}">Click here</a></p>
              
                <p>Gender : ${item.gender}</p>
                <p>Language : ${item.LangArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
    });
  }
  cardContainer.innerHTML = cards;
};

const deleteData = (index) => {
  let getList = JSON.parse(localStorage.getItem("infoSection"));
  getList.splice(index, 1);

  localStorage.setItem("infoSection", JSON.stringify(getList));
  window.location.reload();
};

showData();

submit.addEventListener("click", () => {
  getData();
  //display the data;
  showData();
});
