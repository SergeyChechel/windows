import {addStatusMessage} from "./forms";

const modals = (state) => {
 
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            scroll = calcScroll();
        
        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }
                if(triggerSelector === '.popup_calc_btn') {
                    for (let key in state) {
                        delete state[key];
                    } 
                }
                if(triggerSelector === '.popup_calc_button') {
                    if(!validate(state, '.popup_calc')) {
                        addStatusMessage('.popup_calc_content', 'info');
                        return;
                    };
                }
                if(triggerSelector === '.popup_calc_profile_button') {
                    if(!validate(state, '.popup_calc_profile')) {
                        addStatusMessage('.popup_calc_profile_content', 'info');
                        return;
                    };
                }
                closeModal();
                modal.style.display = "block";
                document.body.style.marginRight = `${scroll}px`;
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
            });
        });

        modal.addEventListener('click', (e) => {
            if(e.target == modal && closeClickOverlay) {
                closeModal();
            }
        });

        close.addEventListener('click', () => {
            closeModal();
        });
    }

    function validate(state, modalSelector) {
        let flag = true;
        const st = JSON.stringify(state);
        if(st == '{}') {flag = false;}
        if(modalSelector == '.popup_calc') {
            const keys = Object.keys(state);
            if(!keys.includes('form') || !keys.includes('width') || !keys.includes('height')) {
                flag = false;
            }
        }
        if(modalSelector == '.popup_calc_profile') {
            const keys = Object.keys(state);
            if(!keys.includes('type') || !keys.includes('profile')) {
                flag = false;
            }
        }
        return flag;
    }

    function showModalByTime(triggerSelector, delay) {
        setTimeout(() => {
            const event = new Event('click');
            document.querySelector(triggerSelector).dispatchEvent(event);
        }, delay);
    }

    

    showModalByTime('.popup_engineer_btn', 60000);
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

};

export function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;

}

export function closeModal(modalWindowSelector = "[data-modal]") {
    const windows = document.querySelectorAll(modalWindowSelector);
    windows.forEach(item => item.style.display = 'none');
    document.body.style.marginRight = `0px`;
    document.body.style.overflow = "";
}

export default modals;