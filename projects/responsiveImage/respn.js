let menu = document.getElementsByClassName("burgermenu")[0];
let menuItems = document.getElementsByClassName("hide")[0];

const clickMenu = () =>{
    
    // Write a toggle statement here
    menuItems.classList.toggle("hide");
    menuItems.classList.toggle("mob-nav");

};

menu.addEventListener("click", clickMenu);