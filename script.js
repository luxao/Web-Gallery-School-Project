let myGallery, currentIndex, positionIndex, stop, galleryItem;
let order = ["0","1","2","3","4","5","6"];
document.addEventListener('DOMContentLoaded',() => {
    const galleryWrapper = document.getElementById('gallery-wrapper');

    const searchInput = document.getElementById("picture-input");
    const fadeGallery = document.getElementById('gallery');

    let searchTerm = getCookie("search");
    if(searchTerm)
        searchInput.value = searchTerm;

    searchInput.addEventListener("input", (e) => {
        setCookie("search", e.target.value, 1);
    })

    fetch("resource/images.json")
    .then(response => response.json())
    .then(json => {
        // let cookies = getCookie('order');
        // let cookieArray = [];
        // if(getCookie){
        //     cookieArray = cookies;
        //     order = JSON.parse(cookieArray);
        // }
        order.filter(item => (json.photos[item].title.includes(searchTerm))).forEach((item) => {
            galleryItem = document.createElement("img");
            galleryItem.setAttribute("src", "resource/images/" + json.photos[item].src);
            galleryItem.setAttribute("id", json.photos[item].id);
            galleryItem.classList = "thumbnail";
            galleryWrapper.appendChild(galleryItem);

            galleryItem.addEventListener("click", function () {
                document.getElementById('fade').style.display = 'flex';
                myGallery = document.createElement('img');
                myGallery.setAttribute('src', 'resource/images/' + json.photos[item].src);
                currentIndex = json.photos[item].id;
                for (let i = 0; i < order.length; i++) {
                    if (order[i] === currentIndex)
                        positionIndex = i;
                }
                myGallery.setAttribute('id', json.photos[item].id);
                document.getElementById('title').innerText = json.photos[item].title;
                document.getElementById('description').innerText = json.photos[item].description;
                fadeGallery.appendChild(myGallery)
            })

            document.getElementById('hide-picture').addEventListener('click', () => {
                document.getElementById('fade').style.display = "none";
                myGallery.remove();
            })

            document.getElementById('play-show').addEventListener('click', function () {
                slideShow();
            })
            document.getElementById('stop-show').addEventListener('click', function () {
                stopShow();
            })

            function clickShow(c) {
                myGallery.setAttribute('src', 'resource/images/' + json.photos[order[c]].src);
                myGallery.setAttribute('id', +json.photos[order[c]].id);
                fadeGallery.appendChild(myGallery);
            }

            function slideShow() {
                ++positionIndex;
                if (positionIndex === 7)
                    positionIndex = 0;
                clickShow(positionIndex);
                stop = setTimeout(slideShow, 2000);
            }

            function stopShow() {
                clearTimeout(stop);
            }

        })
    })

    $(galleryWrapper).sortable({
        update: function (event,ui) {
            order = $(this).sortable('toArray')
            setCookie('order', JSON.stringify(order), 2);
        }
    })

});
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
















































//
// json.photos.forEach((item) => {
//     let galleryItem = document.createElement("img");
//     galleryItem.setAttribute("src", "resource/images/" + item.src);
//     galleryItem.classList = "thumbnail";
//     galleryWrapper.appendChild(galleryItem);
//
//     galleryItem.addEventListener("click", function (){
//         document.getElementById('fade').style.display = 'flex';
//         myGallery = document.createElement('img');
//         myGallery.setAttribute('src', 'resource/images/' + item.src);
//         currentIndex = item.id;
//         for(let i=0; i<order.length;i++){
//             if(order[i] === currentIndex)
//                 positionIndex = i;
//         }
//         myGallery.setAttribute('id', item.id);
//         document.getElementById('title').innerText = item.title;
//         document.getElementById('description').innerText = item.description;
//         fadeGallery.appendChild(myGallery)
//     })
//
//     document.getElementById('hide-picture').addEventListener('click', ()=>{
//         document.getElementById('fade').style.display = "none";
//         myGallery.remove();
//     })
//
//     document.getElementById('play-show').addEventListener('click',function (){
//         slideShow();
//     })
//     document.getElementById('stop-show').addEventListener('click',function (){
//         stopShow();
//     })
//
//     function  clickShow(c){
//         myGallery.setAttribute('src', 'resource/images/' + json.photos[order[c]].src);
//         myGallery.setAttribute('id', + json.photos[order[c]].id);
//         fadeGallery.appendChild(myGallery);
//     }
//
//     function slideShow() {
//         ++positionIndex;
//         if(positionIndex === 7)
//             positionIndex =0;
//         clickShow(positionIndex);
//         stop = setTimeout(slideShow, 2000);
//     }
//     function stopShow(){
//         clearTimeout(stop);
//     }
//
// })
// })

