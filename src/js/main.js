
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const submenu = menu.querySelector(".submenu");

    menu.addEventListener("mouseover", function () {
        submenu.style.display = "block";
    });

    menu.addEventListener("mouseout", function () {
        submenu.style.display = "none";
    });
    const sendButton = document.getElementById("btn");
    sendButton.addEventListener('click', addComment);
});

function addComment(){
    const messageInput = document.getElementById("messageInput");
    const commentContainer = document.querySelector(".commnet-body__container");
    
    if(messageInput.value.trim() === ""){
        return;
    }

    const newComment = createCommentElement("Ваше имя", getCurrentDate(), messageInput.value);
    commentContainer.appendChild(newComment);

    messageInput.value = "";
    updateMainText("По дате");
}

function createCommentElement(username,date,text){
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    // Создание блока с иформацией о пользователе и дате
    const commentUser = document.createElement("div");
    commentUser.classList.add('comment-user');

    const userAvatar = document.createElement("img");
    userAvatar.classList.add('user-avatar');
    userAvatar.src = '/src/img/12.jpg';
    userAvatar.alt = 'User Avatar';

    const userName = document.createElement('p');
    userName.classList.add("user-name3");
    userName.textContent = username;

    const commentDate = document.createElement("p");
    commentDate.classList.add("comment-date");
    commentDate.textContent = date;

   
    commentUser.appendChild(userAvatar);
    commentUser.appendChild(userName);
    commentUser.appendChild(commentDate);

    // Создание блока с текстом комментраии
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = text;

    commentContent.appendChild(commentText);

    commentElement.appendChild(commentUser);
    commentElement.appendChild(commentContent);

    return commentElement;
}

// Функция для получения текущей даты
function getCurrentDate(){
    const now = new Date();
    const day = String(now.getDate()).padStart(2,"0");
    const month = String(now.getMonth() + 1).padStart(2,"0");
    const hours = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2,"0");
    return `${day}.${month} ${hours}:${minutes}`;
}

const jackdaw = document.querySelectorAll('.jackdaw');

function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('active');
}

jackdaw.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        toggleCheckbox(checkbox);
        updateMainText(checkbox.nextElementSibling.textContent.trim());
    });
});

function updateMainText(text) {
    const mainText = document.querySelector('.text-second');
    mainText.textContent = text;
}

const menuItems = document.querySelectorAll('.submenu-item');

menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => {
        toggleMenuItem(index);
    });
});

function toggleMenuItem(menuIndex) {
    const menuItemImages = document.querySelectorAll(".jackdaw");
    const mainText = document.querySelector('.text-second')

    for (let i = 0; i < menuItemImages.length; i++) {
        if (i === menuIndex) {
            menuItemImages[i].classList.add('active');
        } else {
            menuItemImages[i].classList.remove('active')
        }
    }

    switch (menuIndex) {
        case 0:
            mainText.textContent = "По дате";
            break;
        case 1:
            mainText.textContent = "По количеству оценок";
            break;
        case 2:
            mainText.textContent = "По актуальности";
            break;
        case 3:
            mainText.textContent = "По количеству ответов";
            break;
        default:
            break;
    }
}

// Kнопка избранное

const favorites = [
    {btnId: 'favourites', grayIconId: "heart-gray", whiteIconId: "heart-white"},
    {btnId: 'favourites1', grayIconId: "heart-gray1", whiteIconId: "heart-white1"},
    {btnId: 'favourites2', grayIconId: "heart-gray2", whiteIconId: "heart-white2"},
    {btnId: "favourites3", grayIconId: "heart-gray3", whiteIconId: "heart-white3"},
];

const favoriteStates = favorites.map(() => false);

function toggleFavorite(index){
    favoriteStates[index] = !favoriteStates[index];
   
    const {btnId, grayIconId,whiteIconId} = favorites[index];
    const favouritesBtn = document.getElementById(btnId);
    const iconSvgGray = document.getElementById(grayIconId);
    const iconSvgWhite = document.getElementById(whiteIconId);



    if(favoriteStates[index]){
        favouritesBtn.textContent = "Убрать из избранного";
        favouritesBtn.classList.add('active');
        iconSvgGray.classList.add("active");
        iconSvgGray.style.display = 'block';
        iconSvgWhite.classList.add("active");
        iconSvgWhite.style.display = "none";
    }else {
        favouritesBtn.textContent = "В избранное";
        favouritesBtn.classList.remove("active");
        iconSvgGray.classList.remove("active");
        iconSvgGray.style.display = "none";
        iconSvgWhite.classList.remove('active');
        iconSvgWhite.style.display = "block"
    }

    if(iconSvgGray && iconSvgWhite){
        if(favoriteStates[index]){
            iconSvgGray.style.display = 'block';
            iconSvgWhite.style.display = "none";
        }else {
            iconSvgGray.style.display = "none";
            iconSvgWhite.style.display = "block";
        }
     
    }

    // const favouriteButton0 = document.getElementById("favourites");
    // favouriteButton0.addEventListener('click', () => toggleFavorite(0));

    // const favouriteButton1 = document.getElementById("favourites1");
    // favouriteButton1.addEventListener('click', () => toggleFavorite(1));

    // const favouriteButton2 = document.getElementById("favourites2");
    // favouriteButton2.addEventListener('click', () => toggleFavorite(2));

    // const favouriteButton3 = document.getElementById("favourites3");
    // favouriteButton3.addEventListener('click', () => toggleFavorite(3));
}



// Плейсхолдер и активация кнопки
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("btn");
const maxSimLabel = document.querySelector(".max-sim")
const limitationText = document.querySelector(".limitation")


messageInput.addEventListener("input",function(){
    const inputLength = messageInput.value.length;

    if (inputLength > 0 && inputLength <= 1000){
        maxSimLabel.textContent = `${inputLength}/1000`;
        maxSimLabel.style.color = 'gray';
        sendButton.disabled = false;
        sendButton.classList.add("active");
    }else if (inputLength > 1000){
        limitationText.style.display = "block";
        maxSimLabel.style.color = 'red';
        sendButton.disabled = true;
        sendButton.classList.remove("active");
    }else{
        maxSimLabel.textContent = 'Макс. 1000 символов';
        maxSimLabel.style.color = 'gray';
        sendButton.disabled = true;
        sendButton.classList.remove("active")
    }
})



// rotateSVG
 
const svgContainer = document.getElementById("svgContainer");

svgContainer.addEventListener("mouseover", function(){
    const rotateSvg = document.getElementById("rotateSvg");
    rotateSvg.style.transform = "rotate(180deg)"
});

svgContainer.addEventListener("mouseout",function(){
    const rotateSvg = document.getElementById('rotateSvg');
    rotateSvg.style.transform = "rotate(0deg)";
});

// rating
const ratingElements = document.querySelectorAll('.rating');

function incrementRating(ratingValueElement) {
    if (!ratingValueElement) {
        return;
    }
    let currentRating = parseInt(ratingValueElement.textContent);
    if (currentRating < 5) {
        currentRating++;
        updateRatingDisplay(ratingValueElement, currentRating);
    }
}

function decrementRating(ratingValueElement){
    if(!ratingValueElement){
        return;
    }
    let currentRating = parseInt(ratingValueElement.textContent);
    if(currentRating > -5){
        currentRating--;
        updateRatingDisplay(ratingValueElement, currentRating);
    }
}

ratingElements.forEach(ratingElement => {
    const minusButton = ratingElement.querySelector('.eclipse-minus');
    const plusButton = ratingElement.querySelector('.eclipse-pluse');
    const ratingValueElement = ratingElement.querySelector('.rating-value');

    
    let currentRating = parseInt(ratingValueElement.textContent);

    function updateRatingDisplay() {
        ratingValueElement.textContent = currentRating.toString();
        ratingValueElement.style.color = currentRating > 0 ? "#8AC540" : currentRating < 0 ? "#F00" : "black";
        
    }
    minusButton.addEventListener('click', () => {
        decrementRating(ratingValueElement);
    });

    plusButton.addEventListener('click', () => {
        incrementRating(ratingValueElement);
    });

    function decrementRating() {
        if (currentRating > -5) {
            currentRating--;
            updateRatingDisplay();
            
        }
    }

    function incrementRating() {
        if (currentRating < 5) {
            currentRating++;
            updateRatingDisplay();
        }
    }


  

    updateRatingDisplay();
});

// коменты
const comments = [
    {user: "Алексей_1994b", date: new Date, text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае."},
    {user: "Максим Авдеенко", date: new Date, text: ""},
    {user: "Джунбокс3000", date: new Date, text: 'Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство \'фанатов\' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.'},
    {user: "Мистер_душнила", date: new Date, text: 'Какую-то дичь несешь, братиш!'}

];

localStorage.setItem("comments", JSON.stringify(comments));

const storedComments = localStorage.getItem("comments");
let feedback; // Один раз объявляем переменную

if (storedComments) {
    feedback = JSON.parse(storedComments); 
} else {
    feedback = []; 
}

const newComment = {user: "Новый пользователь", text: "Новый комментарий"};

comments.push(newComment);

localStorage.setItem("comments", JSON.stringify(comments));




document.addEventListener("DOMContentLoaded", function(){
    const  commentForm = document.getElementById("commentForm");
    const commentContainer = document.querySelector(".comments-container");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("btn");
    
    
    messageInput.addEventListener("input", function () {
        sendButton.disabled = messageInput.value.trim() === "";

    });

    commentForm.addEventListener("submit", function (event){
        event.preventDefault();

        const username = "Ваше имя";
        const commentText = messageInput.value;

        if(!commentText){
            alert('Пожалуйстаб введите комментарийй');
            return;
        }

        const newCommentElement = createCommentElement("Пользователь", getCurrentDate(), "Текст комментария", "URL_аватара", 0);
        commentContainer.appendChild(newCommentElement);

        const favoritesButton = newCommentElement.querySelector(".favourites3")
        favoritesButton.addEventListener("click", () => toggleFavorite(3));

        commentContainer.appendChild(newCommentElement);

        messageInput.value = "";
        sendButton.disabled = true;
    });

});

function createCommentElement(username,date,text,avatarUrl, rating,answer){
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const userAvatar = document.createElement("img");
    userAvatar.classList.add('user-avatar');
    userAvatar.src = avatarUrl;
    userAvatar.alt = "User Avatar";

    const commentUser = document.createElement("div");
    commentUser.classList.add("comment-user");
    commentUser.appendChild(userAvatar);

    const userName = document.createElement("p");
    userName.classList.add("user-name");
    userName.textContent = username;

    const commentDate = document.createElement("p");
    commentDate.classList.add("comment-date");
    commentDate.textContent = date;
    
    commentUser.appendChild(userName);
    commentUser.appendChild(commentDate);

    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = text;

    commentContent.appendChild(commentText);

    

// answer
    const answerContainer = document.createElement('div')
    answerContainer.classList.add("comment-btn"); 
    answerContainer.textContent = answer;


     
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer");
    answerButton.textContent = "Ответить";
   
    const replyInput = document.createElement("input");
    replyInput.type = 'text';
    replyInput.classList.add("reply-input");
    replyInput.style.display = 'none';

    answerButton.addEventListener("click", () => toggleReplyInput(replyInput));
    
    answerContainer.appendChild(answerButton);
    answerContainer.appendChild(replyInput);

    function toggleReplyInput(replyInput){
        if(replyInput.style.display === 'none'){
            replyInput.style.display = 'block';
        
        } else {
            replyInput.style.display = 'none';
        }
    }

    

    const answerArrowIcon = document.createElement("img");
    answerArrowIcon.src = "/src/icon/arrow-gray.svg"
    answerArrowIcon.classList.add("arrow");
    answerArrowIcon.textContent = "Ответить";

    // favorite

    const favouriteContainer = document.createElement("div");
    favouriteContainer.classList.add("favourite-container");
    
    const favoritesButton = document.createElement("button");
    favoritesButton.classList.add("favourites3");
    favoritesButton.id = "favourites3"
    favoritesButton.innerHTML = "В избранное";
    favoritesButton.addEventListener("click", () => toggleFavorite(3));
    

    const heartWhiteIcon = document.createElement("img");
    heartWhiteIcon.src = "/src/icon/heart-white.svg";
    heartWhiteIcon.classList.add("heart3");
    heartWhiteIcon.id = "heart-white3";
    
    


    const heartGrayIcon = document.createElement("img");
    heartGrayIcon.src = "/src/icon/gray-heart.svg";
    heartGrayIcon.classList.add("heart-gray3");
    heartGrayIcon.id = "heart-gray3";
    heartGrayIcon.style.display = "none";
    
// raiting

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");

    const commentRating = document.createElement("div");
    commentRating.classList.add("rating");
    commentRating.textContent = rating;

    const minusButton = document.createElement("img");
    minusButton.src = "/src/icon/minus.svg";
    minusButton.classList.add("eclipse-minus");
    minusButton.id = "eclipse-minus"
    minusButton.addEventListener("click",() => {
        decrementRating();
    });

    const ratingValue = document.createElement("p");
    ratingValue.classList.add("number__two","rating-value");
    ratingValue.textContent = 0;
    ratingValue.style.color = 'black';

    const plusButton = document.createElement("img");

    plusButton.src = "/src/icon/plus.svg";
    plusButton.classList.add("eclipse-pluse");
    plusButton.id = "eclipse-pluse"
    plusButton.addEventListener("click",() =>  {
        incrementRating();
    
    });

  
    ratingContainer.appendChild(answerContainer)
    answerContainer.appendChild(commentRating);
    answerContainer.appendChild(answerArrowIcon);
    answerContainer.appendChild(answerButton);

    ratingContainer.appendChild(favouriteContainer)
    favouriteContainer.appendChild(heartGrayIcon);
    favouriteContainer.appendChild(heartWhiteIcon);
    favouriteContainer.appendChild(favoritesButton);

    
    
    ratingContainer.appendChild(commentRating)
    commentRating.appendChild(minusButton);
    commentRating.appendChild(ratingValue);
    commentRating.appendChild(plusButton);



  

   
    

    commentElement.appendChild(commentUser);
    commentElement.appendChild(commentContent);
    commentElement.appendChild(ratingContainer);
   
    
    

    return commentElement;

    

}

function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day}.${month} ${hours}:${minutes}`;
}

function getRandomAvatarUrl() {
    const width = 61;
    const height = 61;
    const randomImageId = Math.floor(Math.random() * 1000);
    return `https://ru.pinterest.com/ideas/${width}/${height}?image=${randomImageId}`;
}




// Функция для отображения/скрытия поля ввода ответа
function toggleReplyInput(button){
    const replyInput = button.nextElementSibling;
    if(replyInput.style.display === "none" || replyInput.style.display === ""){
        replyInput.style.display = "block";
    }else {
        replyInput.style.display = "none";
    }
}

// Функция для отправки ответа 
function addReply(button) {
    // Получить replyInput
    const replyInput = button.previousElementSibling.querySelector(".reply-input");

    // Проверить, существует ли replyInput
    if (!replyInput) {
        return;
    }

    // Получить значение replyText
    const replyText = replyInput.value;

    // Проверить, не пуст ли replyText
    if (replyText.trim() === "") {
        return;
    }

    // Создать новый ответ
    const newReply = createCommentElement("Пользователь", getCurrentDate(), replyText);

    // Найти контейнер комментариев и добавить новый ответ
    const commentContainer = button.closest(".answer").querySelector(".replies");
    commentContainer.appendChild(newReply);
    // commentContainer.appendChild(newCommentElement);

    // Очистить поле ввода и скрыть его
    replyInput.value = "";
    replyInput.style.display = "none";

    // Обновить текст
    updateMainText("По дате");
}


// Фаворит избранного
function filterFavoriteComments(){
    const favoriteComments = comments.filter((comment,index) => favoriteStates[index]);
    return favoriteComments;
}

function showFavoriteComments(){
    const favoriteComments = filterFavoriteComments();

    favoriteComments.forEach((comment) => {
        const newCommentElement = createCommentElement(comment.user, comment.date, comment.text);
        commentContainer.appendChild(newCommentElement);
    })
}

const favouriteButton = document.getElementById("favourites");
favouriteButton.addEventListener('click', () => {
    showFavoriteComments()
})

function showFavoriteComments(){
    commentContainer.innerHTML = "";

    const favoriteComments = filterFavoriteComments();
    favoriteComments.forEach((comment) => {
        const newCommentElement = createCommentElement(comment.user, comment.date, comment.text);
        commentContainer.appendChild(newCommentElement);
    });
}