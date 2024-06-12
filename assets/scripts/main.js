
window.addEventListener("load", () => {
    // let video = document.querySelector("video");
    // video.addEventListener('DOMContentLoaded', () => {
    //     video.style.opacity = '.4';
    //     video.playbackRate = .8
    //     document.querySelector('.bg').remove();
    //     console.log(document.querySelector('.bg'));
    // })

    let bg = document.querySelector(".bg");
    let video = document.createElement('video');
    video.src = './assets/videos/bg_3.mp4';
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.playbackRate = .8;
    video.addEventListener('loadeddata', () => {
        bg.replaceWith(video);
    })

    let e = document.querySelectorAll(".animItems");
    if (e.length > 0) {
        function t() {
            for (let t = 0; t < e.length; t++) {
                let l = e[t], n = l.offsetHeight, s = i(l).top, o = window.innerHeight - n / 4;
                n > window.innerHeight && (o = window.innerHeight - window.innerHeight / 4), pageYOffset > s - o && pageYOffset < s + n ? l.classList.add("active") : l.classList.contains("animStop") || l.classList.remove("active")
            }
        }

        function i(e) {
            let t = e.getBoundingClientRect(), i = window.pageXOffset || document.documentElement.scrollLeft,
                l = window.pageYOffset || document.documentElement.scrollTop;
            return {top: t.top + l, left: t.left + i}
        }

        window.addEventListener("scroll", t), setTimeout(() => {
            t()
        }, 500)
    }
    setTimeout(() => {
        document.querySelector(".preloader").remove(), document.body.style.overflowY = "visible"
    }, 1500)
});
const links = ["#Home", "#Service", "#IndustryOne", "#Stage", "#Technologies", "#Building", "#Contacts"],
    pageWrapper = document.querySelector(".page__wrapper"), moveToLink = e => {
        if (pageWrapper.classList.contains("slider-locked")) return !1;
        let t = window.location.hash;
        pageWrapper.classList.add("slider-locked"), e > 0 ? -1 !== links.indexOf(t) ? ("" === t && (window.location.hash = links[1]), links.indexOf(t) + 1 !== void 0 && (window.location.hash = links.at(links.indexOf(t) + 1))) : window.location.hash = links.at(0) : -1 !== links.indexOf(t) ? window.location.hash = links.at(links.indexOf(t) - 1) : window.location.hash = links.at(0), setTimeout(() => {
            onTransitionEnd()
        }, 1e3)
    }, onTransitionEnd = () => {
        pageWrapper.classList.remove("slider-locked")
    };
if (window.innerWidth > 1024) {
    let e = 0;
    document.addEventListener("scroll", t => {
        t.preventDefault(), "" === window.location.hash && (window.location.hash = links[0]);
        let i = document.documentElement.clientHeight, l = document.querySelector(window.location.hash).offsetTop,
            n = document.querySelector(window.location.hash).offsetHeight, s = l + n;
        if (i < n) {
            window.pageYOffset + i >= s ? moveToLink(1) : window.pageYOffset <= l && moveToLink(-1);
            return
        }
        e < window.pageYOffset ? moveToLink(1) : moveToLink(-1), e = window.pageYOffset
    }, {passive: !1})
}
const industryBtn = document.querySelectorAll("button.btn");
industryBtn.forEach(e => {
    e.addEventListener("click", () => {
        e.previousElementSibling.classList.contains("active") ? (e.previousElementSibling.classList.remove("active"), e.textContent = "Узнать больше") : (e.previousElementSibling.classList.add("active"), e.textContent = "Скрыть")
    })
});
const order = [], buildingItem = document.querySelectorAll(".building_item"),
    titleFinal = document.querySelector(".title_final");
buildingItem.forEach(e => {
    e.addEventListener("click", () => {
        let t = document.querySelector(".build_active_title"), i = t.nextElementSibling,
            l = document.querySelector(".build_active_item"), n = l.nextElementSibling;
        order.push(e.innerText);
        let s = document.createElement("span");
        s.textContent = e.innerText, titleFinal.appendChild(s), null !== i && (t.classList.remove("build_active_title"), i.classList.add("build_active_title")), null !== n && (l.classList.remove("build_active_item"), n.classList.add("build_active_item")), 4 === order.length && document.querySelector(".title_final").classList.add("active")
    })
});
const userFile = document.querySelector("#user_file");
userFile.addEventListener("change", () => userFile.files[0].size > 5242880 ? (userFile.value = "", alert("Файл слишком большой!"), !1) : (document.querySelector(".file_title").textContent = userFile.files[0].name, document.querySelector(".file_desc").textContent = `${userFile.files[0].size / 1024 / 1024}`.slice(0, 4) + " мб", !0));
const userPhone = document.querySelector(".input[name='user_phone']");
userPhone.addEventListener("input", () => {
    userPhone.value = userPhone.value.replace(/\D/, "")
});
const feedbackForm = document.getElementById("feedback-form"), loaderElem = document.querySelector(".loader");
feedbackForm.onsubmit = async e => {
    e.preventDefault(), loaderElem.classList.add("active"), feedbackForm.disabled = !0;
    try {
        order.forEach((e, t) => {
            order[t] = e.toLowerCase().replace("\n", " ")
        });
        let t = new FormData(feedbackForm);
        t.append("user_choice_type", order[0]), t.append("user_choice_platform", order[1]), t.append("user_choice_work_stage", order[2]), t.append("user_choice_start_work", order[3]);
        let i = await (await fetch("/feedback", {method: "POST", body: t})).json();
        alert(i?.data?.message || i.message || i.error_text)
    } catch (l) {
        alert("Не удалось отправить Вашу заявку. Пожалуйста, свяжитесь с нами по телефону или по почте")
    } finally {
        loaderElem.classList.remove("active"), feedbackForm.disabled = !1
    }
};