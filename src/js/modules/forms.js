import checkNumInputs from './checkNumInputs';
import {closeModal} from './modals';

const forms = (state) => {

    const form = document.querySelectorAll('form');
    checkNumInputs('input[name=user_phone]');

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text() 
    };

    const clearInputs = () => {
        const selectOpts = document.querySelectorAll('#view_type option');
        const inputs = document.querySelectorAll('input');

        selectOpts.forEach(option => {
            if(option.value == "") {
                option.selected = true;
            }
        });
        inputs.forEach(input => {
            if(input.type == 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    addStatusMessage (item, 'success');
                })
                .catch(() => {
                    addStatusMessage (item, 'failure');
                })
                .finally(() => {
                    clearInputs();
                    formData = new FormData();
                    setTimeout(() => {
                       closeModal();
                    }, 5000);
                });
        });
    });

};

export function addStatusMessage (elemOrSelector, status) {
    let el, mess, flag = false;

    if(typeof elemOrSelector == 'string') {
        el = document.querySelector(elemOrSelector);
    } else {el = elemOrSelector;}

    el.children.forEach(child => {
        flag = child.classList.contains('status');
    });

    if(flag) {return;}
    
    const message = {
        info: 'Не выбраны необходимые поля или не указаны значения',
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    switch(status) {
        case 'info': mess = message.info; break;
        case 'loading': mess = message.iloadingnfo; break;
        case 'success': mess = message.success; break;
        case 'failure': mess = message.failure; break;
    }

    let statusMessage = document.createElement('div');
        statusMessage.textContent = mess;
        statusMessage.classList.add('status');
        el.append(statusMessage);

    setTimeout(() => {
        statusMessage.remove();
    }, 5000);
}

export default forms;