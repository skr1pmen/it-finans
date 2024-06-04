const links = ['#Home', '#Service', "#IndustryOne", "#IndustryTwo", "#Stage", "#Technologies", "#Building", "#Contacts"];
const pageWrapper = document.querySelector('.page__wrapper');
const moveToLink = (swap) => {
    if (pageWrapper.classList.contains('slider-locked')) {
        return false;
    }

    let hash = window.location.hash;
    pageWrapper.classList.add('slider-locked');

    if (swap > 0) {
        if (links.indexOf(hash) !== -1) {
            if (hash === '') {
                window.location.hash = links[1];
            }
            if (links.indexOf(hash) + 1 !== undefined) {
                window.location.hash = links.at(links.indexOf(hash) + 1);
            }
        } else {
            window.location.hash = links.at(0);
        }
    } else {
        if (links.indexOf(hash) !== -1) {
            window.location.hash = links.at(links.indexOf(hash) - 1);
        } else {
            window.location.hash = links.at(0);
        }
    }

    setTimeout(() => {
        onTransitionEnd()
    }, 1000)
}

const onTransitionEnd = () => {
    pageWrapper.classList.remove('slider-locked');
}


let lastScroll = 0;

document.addEventListener('scroll', (e) => {
    e.preventDefault();
    if (window.location.hash === '') {window.location.hash = links[0]}

    let screenHeight = document.documentElement.clientHeight,
        blockTopPosition = document.querySelector(window.location.hash).offsetTop,
        blockHeight = document.querySelector(window.location.hash).offsetHeight,
        blockBottomPosition = blockTopPosition + blockHeight;
    console.clear()
    console.debug("Высота экрана: " + screenHeight);
    console.debug("Верхняя позиция блока: " + blockTopPosition);
    console.debug("Высота блока: " + blockHeight);
    console.debug("Нижняя позиция блока: " + blockBottomPosition);
    console.debug("Текущий скролл: " + window.pageYOffset);

    if (screenHeight < blockHeight) {
        if (window.pageYOffset + screenHeight >= blockBottomPosition) {
            moveToLink(1)
        } else if (window.pageYOffset <= blockTopPosition) {
            moveToLink(-1)
        }
        return
    } else {
        if (lastScroll < window.pageYOffset) {
            moveToLink(1);
        } else {
            moveToLink(-1);
        }
    }
    lastScroll = window.pageYOffset;
}, {passive: false});


// const pageWrapper = document.querySelector('.page__wrapper');
// document.addEventListener("wheel", (e) => {
//     e.preventDefault();
//     if (!pageWrapper.classList.contains('slider-locked')) {
//         pageWrapper.classList.add('slider-locked');
//         scrolling(Math.floor(e.deltaY) > 0);
//     }
// }, {passive: false})
//
// function scrolling(dir) {
//     let hash = window.location.hash;
//     if (hash === '') {window.location.hash = links[1];pageWrapper.classList.remove('slider-locked');}
//     let screenHeight = document.documentElement.clientHeight,
//         blockTopPosition = document.querySelector(hash).offsetTop,
//         blockHeight = document.querySelector(hash).offsetHeight,
//         blockBottomPosition = blockTopPosition + blockHeight;
//     // console.log(blockBottomPosition)
//     if (dir) {
//         window.scrollTo(0, blockBottomPosition);
//         if (links.indexOf(hash) !== links.length - 1) {
//             window.location.hash = links.at(links.indexOf(hash)+1)
//         }
//     } else {
//         window.scrollTo(0, blockTopPosition);
//         if (links.indexOf(hash) !== 0) {
//             window.location.hash = links.at(links.indexOf(hash)-1)
//         }
//     }
//
//     setTimeout(() => {
//         pageWrapper.classList.remove('slider-locked');
//     },1500)
// }