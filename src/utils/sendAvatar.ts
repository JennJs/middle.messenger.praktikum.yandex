import  UsersController  from "../controllers/UsersController";

export default function sendAvatar(e) {
    e.preventDefault();
    let target = e.target;
    // console.log(target.files[0]);

    // const file = input.files?.[0]
    let div = document.getElementsByClassName('avatar')[0];
    div.setAttribute('src', target.files[0].name)
    let formData = new FormData();
     
    formData.append("avatar", target.files[0]);
    // console.log( formData instanceof FormData );
    UsersController.changeAvatar(formData);



























    // const input = document.getElementById('avatar');
    // const form = document.getElementsByClassName('avatar_conteiner')[0];
    // fetch('/upload/image', {method: "POST", body: formData});
    // console.log(form);

    // if (file) {
        // const formData = new FormData(form);
        // console.log(formData);

        // formData.set('avatar', file)


    // }
    // // if (file) {
    //   const formData = new FormData(form)
    //   // formData.set('avatar', target.files[0])
    //   console.log(formData);
    // const avatar = document.getElementById('avatar') as HTMLInputElement
    // const file = avatar.files?.[0]
  
    // if (file) {
    //   const formData = new FormData()
    //   formData.set('avatar', file)
  
    //   userApi.update_avatar(formData).then((res: HTTPResponse) => {
    //     store.set('user', res.data)
    //   })
    // }

    // let fileReader = new FileReader();
    // fileReader.readAsDataURL(target.files);

    // fileReader.onload = function(e) {
        // div.setAttribute('src', target.files )
    // }
  }

