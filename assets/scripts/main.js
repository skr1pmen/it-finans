const video = document.querySelector('video').playbackRate = .8;

const animItems = document.querySelectorAll('.animItems');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('active');
            } else {
                if (!animItem.classList.contains('animStop')) {
                    animItem.classList.remove('active');
                }

            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll();
    }, 500);

    setTimeout(() => {
        document.querySelector(".preloader").remove();
        document.body.style.overflowY = 'visible';
    }, 1500);

}
//
// const links = ['#Home', '#Service', "#IndustryOne", "#IndustryTwo", "#Stage", "#Technologies", "#Building", "#Contacts"];
// const pageWrapper = document.querySelector('.page__wrapper');
// const moveToLink = (swap) => {
//     if (pageWrapper.classList.contains('slider-locked')) {
//         return false;
//     }
//
//     let hash = window.location.hash;
//     pageWrapper.classList.add('slider-locked');
//
//     if (swap > 0) {
//         if (links.indexOf(hash) !== -1) {
//             if (hash === '') {
//                 window.location.hash = links[1];
//             }
//             if (links.indexOf(hash) + 1 !== undefined) {
//                 window.location.hash = links.at(links.indexOf(hash) + 1);
//             }
//         } else {
//             window.location.hash = links.at(0);
//         }
//     } else {
//         if (links.indexOf(hash) !== -1) {
//             window.location.hash = links.at(links.indexOf(hash) - 1);
//         } else {
//             window.location.hash = links.at(0);
//         }
//     }
//
//     setTimeout(() => {
//         onTransitionEnd()
//     }, 1000)
// }
//
// const onTransitionEnd = () => {
//     pageWrapper.classList.remove('slider-locked');
// }
//
//
// let lastScroll = 0;
//
// document.addEventListener('scroll', (e) => {
//     e.preventDefault();
//     if (window.location.hash === '') {window.location.hash = links[0]}
//
//     let screenHeight = document.documentElement.clientHeight,
//         blockTopPosition = document.querySelector(window.location.hash).offsetTop,
//         blockHeight = document.querySelector(window.location.hash).offsetHeight,
//         blockBottomPosition = blockTopPosition + blockHeight;
//     console.clear()
//     console.debug("Высота экрана: " + screenHeight);
//     console.debug("Верхняя позиция блока: " + blockTopPosition);
//     console.debug("Высота блока: " + blockHeight);
//     console.debug("Нижняя позиция блока: " + blockBottomPosition);
//     console.debug("Текущий скролл: " + window.pageYOffset);
//
//     if (screenHeight < blockHeight) {
//         if (window.pageYOffset + screenHeight >= blockBottomPosition) {
//             moveToLink(1)
//         } else if (window.pageYOffset <= blockTopPosition) {
//             moveToLink(-1)
//         }
//         return
//     } else {
//         if (lastScroll < window.pageYOffset) {
//             moveToLink(1);
//         } else {
//             moveToLink(-1);
//         }
//     }
//     lastScroll = window.pageYOffset;
// }, {passive: false});


const industryBtn = document.querySelectorAll('button.btn');
industryBtn.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.previousElementSibling.classList.contains('active')) {
            item.previousElementSibling.classList.remove('active');
            item.textContent = 'Узнать больше';
        } else {
            item.previousElementSibling.classList.add('active');
            item.textContent = 'Скрыть'
        }
    });
});

// const fade_right = document.querySelectorAll(`[data-animation = 'fade-right']`);
// if (!fade_right.length) {
//     window.addEventListener('scroll', animation);
//
//     function animation() {
//         for (let index = 0; index < fade_right.length; index++) {
//             const animItem = fade_right[index];
//             const animItemHeight = animItem.offsetHeight;
//             const animItemOffset = offset(animItem).top;
//             const animStart = 4;
//
//             let animItemPoint = window.innerHeight - animItemHeight / animStart;
//             if (animItemHeight > window.innerHeight) {
//                 animItemPoint = window.innerHeight - window.innerHeight / animStart;
//             }
//
//             if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
//                 animItem.style.animation = 'fade-right';
//                 animItem.style.animationDuration = '.4s';
//                 animItem.style.animationFillMode = 'forwards';
//             }
//         }
//
//         function offset(el) {
//             const rect = el.getBoundingClientRect(),
//                 scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//                 scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
//         }
//
//         setTimeout(() => {
//             animation();
//         }, 500);
//         // fade_right.forEach((el) => {
//         //     el.style.animation = 'fade-right';
//         //     el.style.animationDuration = '.4s';
//         //     el.style.animationFillMode = 'forwards';
//         // })
//     }
// }


/** Form code */

const order = [];
const buildingItem = document.querySelectorAll(".building_item");
const titleFinal = document.querySelector(".title_final");
buildingItem.forEach((item) => {
    item.addEventListener("click", () => {
        let activeTitle = document.querySelector(".build_active_title"),
            nextTitle = activeTitle.nextElementSibling,
            activeItem = document.querySelector(".build_active_item"),
            nextItem = activeItem.nextElementSibling;
        order.push(item.innerText);
        let newSpan = document.createElement("span");
        newSpan.textContent = item.innerText
        titleFinal.appendChild(newSpan);
        if (nextTitle !== null) {
            activeTitle.classList.remove("build_active_title");
            nextTitle.classList.add("build_active_title");
        }
        if (nextItem !== null) {
            activeItem.classList.remove("build_active_item");
            nextItem.classList.add("build_active_item");
        }
        if (order.length === 4) {
            document.querySelector(".title_final").classList.add("active");
        }

    });
});

const userFile = document.querySelector("#user_file");
userFile.addEventListener("change", () => {
    if (userFile.files[0].size > 5 * 1024 * 1024) {
        userFile.value = '';
        alert("Файл слишком большой!");
        return false;
    }
    document.querySelector('.file_title').textContent = userFile.files[0].name;
    document.querySelector(".file_desc").textContent = `${userFile.files[0].size / 1024 / 1024}`.slice(0, 4) + " мб";
    return true;
});

const userPhone = document.querySelector(".input[name='user_phone']");
userPhone.addEventListener("input", () => {
    userPhone.value = userPhone.value.replace(/\D/, '');
});



/** Form submission */
// const feedbackForm = document.getElementById("feedback-form");
//
// const loaderElem = document.querySelector(".loader");
//
// feedbackForm.onsubmit = async (e) => {
//     loaderElem.classList.add("active");
//     feedbackForm.disabled = true;
//
//     try {
//         e.preventDefault();
//         order.forEach((choice, i) => {
//             order[i] = choice
//                 .toLowerCase()
//                 .replace("\n", " ");
//         });
//         let data = new FormData(feedbackForm);
//         data.append("user_choice_type", order[0]);
//         data.append("user_choice_platform", order[1]);
//         data.append("user_choice_work_stage", order[2]);
//         data.append("user_choice_start_work", order[3]);
//
//         let response = await fetch('/feedback', {
//             method: 'POST',
//             body: data
//         });
//
//         let result = await response.json();
//
//         alert(result?.data?.message || result.message || result.error_text);
//     } catch (e) {
//         alert("Не удалось отправить Вашу заявку. Пожалуйста, свяжитесь с нами по телефону или по почте");
//     } finally {
//         loaderElem.classList.remove("active");
//         feedbackForm.disabled = false;
//     }
// };