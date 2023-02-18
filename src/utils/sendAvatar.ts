import  UsersController  from "../controllers/UsersController";

export default function sendAvatar(e) {
    e.preventDefault();
    let target = e.target;

    let div = document.getElementsByClassName('avatar')[0];
    div.setAttribute('src', target.files[0].name)
    let formData = new FormData();
     
    formData.append("avatar", target.files[0]);
    UsersController.changeAvatar(formData);
}

