import {calcScroll} from './modals';

const images = () => {

    const imgPopup = document.createElement('div');
    const bigImg = document.createElement('img');
    const workSection = document.querySelector('.works');
    scroll = calcScroll();

    
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
    imgPopup.appendChild(bigImg);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;
        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.marginRight = `${scroll}px`;
            document.body.style.overflow = "hidden";
            const path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);
        }
        // if(target && (target.matches('div.popup') || target.src.match('big_img'))) {
        //     imgPopup.style.display = 'none';
        //     document.body.style.overflow = "";
        // }
        if(target && target == imgPopup || target == imgPopup.firstChild) {
            imgPopup.style.display = 'none';
            document.body.style.marginRight = `0px`;
            document.body.style.overflow = "";
        }
    });

};

export default images;
