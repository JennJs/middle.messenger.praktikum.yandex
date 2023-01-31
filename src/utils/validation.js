export function validate(data, form) {
    let el = form.elements;
    let inputs = [];

    const reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const reLogin = /^[\w\-]{3,20}$/;
    const reNameAndSurname = /^[A-ZА-Я][A-ZА-Яa-zа-я\-]+$/;
    const rePhone = /^(?:\+|[\+7|8])[\d]{10,15}$/;
    const rePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

    Object.entries(data).forEach(element => {
        const [key, value] = element;
        if(key === el[key].name) {
            inputs.push(el[key]);
        }
    })

    let result = true;
    // console.log(inputs);
    Object.entries(inputs).forEach( ([key , value]) => {
        if(value.name === 'email') {
            value.style.border = "";
            if (reEmail.test(value.value )) {
                let errorDiv = document.getElementById('error_'+value.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                }
                value.classList.remove('error_input');
                return true;
            }
            else {
                result = false;
                value.classList.add('error_input');
                let errorDiv = document.createElement("div");
                errorDiv.setAttribute('id', 'error_'+value.name);
                errorDiv.classList.add('error');
                errorDiv.innerHTML='email введен неверно';
                value.after(errorDiv);
                return false;
            }
        } else if(value.name === 'login') {
            value.style.border = "";
            if (reLogin.test(value.value )) {
                let errorDiv = document.getElementById('error_'+value.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                } 
                value.classList.remove('error_input');
                return true;
            }
            else {
                result = false;
                value.classList.add('error_input');
                let errorDiv = document.createElement("div");
                errorDiv.setAttribute('id', 'error_'+value.name);
                errorDiv.classList.add('error');
                errorDiv.innerHTML=`логин должен быть от 3 до 20 латинских букв, может содержать цифры, дефис, нижнее подчёркивание, без пробелов`;
                value.after(errorDiv);
                return false;
            }
        } else if(value.name === 'first_name' || value.name === 'second_name' ) {
            value.style.border = "";
            if (reNameAndSurname.test(value.value )) {
                let errorDiv = document.getElementById('error_'+value.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                } 
                value.classList.remove('error_input');
                return true;
            } else {
                result = false;
                value.classList.add('error_input');
                let errorDiv = document.createElement("div");
                errorDiv.setAttribute('id', 'error_'+value.name);
                errorDiv.classList.add('error');
                errorDiv.innerHTML=`поле ${value.placeholder} должно содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, допустим только дефис`;
                value.after(errorDiv);
                return false;
            }
        } else if(value.name === 'phone') {
            value.style.border = "";
            if (rePhone.test(value.value )) {
                let errorDiv = document.getElementById('error_'+value.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                }  
                value.classList.remove('error_input');
                return true;
            } else {
                result = false;
                value.classList.add('error_input');
                let errorDiv = document.createElement("div");
                errorDiv.setAttribute('id', 'error_'+value.name);
                errorDiv.classList.add('error');
                errorDiv.innerHTML=`поле ${value.placeholder} должно содержать от 10 до 15 символов, состоять из цифр, может начинается с плюса`;
                value.after(errorDiv);
                return false;
            }
        } else if(value.name === 'password') {
            value.style.border = "";
            if (rePassword.test(value.value )) {
                let errorDiv = document.getElementById('error_'+value.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                }
                value.classList.remove('error_input');
                return true;
            } else {
                let errorDiv = document.getElementById('error_'+value.name);
                if(!errorDiv) {
                    result = false;
                    value.classList.add('error_input');
                    let errorDiv = document.createElement("div");
                    errorDiv.setAttribute('id', 'error_'+value.name);
                    errorDiv.classList.add('error');
                    errorDiv.innerHTML=`поле ${value.placeholder} должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.`;
                    value.after(errorDiv);
                    return false;
                } else {
                    return result = false;
                }    
            }
        }
    })
    return result;
}
