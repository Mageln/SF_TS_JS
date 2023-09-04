document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu") as HTMLElement;
    const submenu = menu.querySelector(".submenu") as HTMLElement;

    menu.addEventListener("mouseover", () => {
        submenu.style.display = "block";
    });

    menu.addEventListener("mouseout", () => {
        submenu.style.display = "none";
    });

    const sendButton = document.getElementById("btn") as HTMLButtonElement;
    sendButton.addEventListener('click', addComment);
});

function addComment() {
    const messageInput = document.getElementById("messageInput") as HTMLInputElement;
    const commentContainer = document.querySelector(".commnet-body__container") as HTMLElement;

    if (messageInput.value.trim() === "") {
        return;
    }

    const newComment = createCommentElement("Ваше имя", getCurrentDate(), messageInput.value);
    commentContainer.appendChild(newComment);

    messageInput.value = "";
    updateMainText("По дате");
}

function createCommentElement(username: string, date: string, text: string): HTMLElement {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    // Создание блока с информацией о пользователе и дате
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

    // Создание блока с текстом комментария
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
function getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day}.${month} ${hours}:${minutes}`;
}

const jackdaw = document.querySelectorAll('.jackdaw');

function toggleCheckbox(checkbox: HTMLElement) {
    checkbox.classList.toggle('active');
}

jackdaw.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        toggleCheckbox(checkbox);
        updateMainText(checkbox.nextElementSibling.textContent.trim());
    });
});

function updateMainText(text: string) {
    const mainText = document.querySelector('.text-second') as HTMLElement;
    mainText.textContent = text;
}

const menuItems = document.querySelectorAll('.submenu-item');

menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => {
        toggleMenuItem(index);
    });
});

function toggleMenuItem(menuIndex: number) {
    const menuItemImages = document.querySelectorAll(".jackdaw");
    const mainText = document.querySelector('.text-second') as HTMLElement;

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

// Кнопка избранное

const favorites = [
    { btnId: 'favourites', grayIconId: "heart-gray", whiteIconId: "heart-white" },
    { btnId: 'favourites1', grayIconId: "heart-gray1", whiteIconId: "heart-white1" },
    { btnId: 'favourites2', grayIconId: "heart-gray2", whiteIconId: "heart-white2" },
    { btnId: "favourites3", grayIconId: "heart-gray3", whiteIconId: "heart-white3" },
];

const favoriteStates = favorites.map(() => false);

function toggleFavorite(index: number) {
    favoriteStates[index] = !favoriteStates[index];

    const { btnId, grayIconId, whiteIconId } = favorites[index];
    const favouritesBtn = document.getElementById(btnId) as HTMLButtonElement;
    const iconSvgGray = document.getElementById(grayIconId) as HTMLElement;
    const iconSvgWhite = document.getElementById(whiteIconId) as HTMLElement;

    if (favoriteStates[index]) {
        favouritesBtn.textContent = "Убрать из избранного";
        favouritesBtn.classList.add('active');
        iconSvgGray.classList.add("active");
        iconSvgGray.style.display = 'block';
        iconSvgWhite.classList.add("active");
        iconSvgWhite.style.display = "none";
    } else {
        favouritesBtn.textContent = "В избранное";
        favouritesBtn.classList.remove("active");
        iconSvgGray.classList.remove("active");
        iconSvgGray.style.display = "none";
        iconSvgWhite.classList.remove('active');
        iconSvgWhite.style.display = "block"
    }

    if (iconSvgGray && iconSvgWhite) {
        if (favoriteStates[index]) {
            iconSvgGray.style.display = 'block';
            iconSvgWhite.style.display = "none";
        } else {
            iconSvgGray.style.display = "none";
            iconSvgWhite.style.display = "block";
        }
    }
}

// Плейсхолдер и активация кнопки
const messageInput = document.getElementById("messageInput") as HTMLInputElement;
const sendButton = document.getElementById("btn") as HTMLButtonElement;
const maxSimLabel = document.querySelector(".max-sim") as HTMLElement;
const limitationText = document.querySelector(".limitation") as HTMLElement;

messageInput.addEventListener("input", () => {
    const inputLength = messageInput.value.length;

    if (inputLength > 0 && inputLength <= 1000) {
        maxSimLabel.textContent = `${inputLength}/1000`;
        maxSimLabel.style.color = 'gray';
        sendButton.disabled = false;
        sendButton.classList.add("active");
    } else if (inputLength > 1000) {
        limitationText.style.display = "block";
        maxSimLabel.style.color = 'red';
        sendButton.disabled = true;
        sendButton.classList.remove("active");
    } else {
        maxSimLabel.textContent = 'Макс. 1000 символов';
        maxSimLabel.style.color = 'gray';
        sendButton.disabled = true;
        sendButton.classList.remove("active")
    }
});

// rotateSVG

const svgContainer = document.getElementById("svgContainer") as HTMLElement;

svgContainer.addEventListener("mouseover", () => {
    const rotateSvg = document.getElementById("rotateSvg") as HTMLElement;
    rotateSvg.style.transform = "rotate(180deg)"
});

svgContainer.addEventListener("mouseout", () => {
    const rotateSvg = document.getElementById('rotateSvg') as HTMLElement;
    rotateSvg.style.transform = "rotate(0deg)";
});

// rating
const ratingElements = document.querySelectorAll('.rating');

function incrementRating(ratingValueElement: HTMLElement) {
    if (!ratingValueElement) {
        return;
    }
    let currentRating = parseInt(ratingValueElement.textContent!);
    if (currentRating < 5) {
        currentRating++;
        updateRatingDisplay(ratingValueElement, currentRating);
    }
}

function decrementRating(ratingValueElement: HTMLElement) {
    if (!ratingValueElement) {
        return;
    }
    let currentRating = parseInt(ratingValueElement.textContent!);
    if (currentRating > -5) {
        currentRating--;
        updateRatingDisplay(ratingValueElement, currentRating);
    }
}

ratingElements.forEach(ratingElement => {
    const minusButton = ratingElement.querySelector('.eclipse-minus') as HTMLElement;
    const plusButton = ratingElement.querySelector('.eclipse-pluse') as HTMLElement;
    const ratingValueElement = ratingElement.querySelector('.rating-value') as HTMLElement;

    let currentRating = parseInt(ratingValueElement.textContent!);

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
    { user: "Алексей_1994b", date: new Date, text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае." },
    { user: "Максим Авдеенко", date: new Date, text: "" },
    { user: "Джунбокс3000", date: new Date, text: 'Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство \'фанатов\' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.' },
    { user: "Мистер_душнила", date: new Date, text: 'Какую-то дичь несешь, братиш!' }
];

localStorage.setItem("comments", JSON.stringify(comments));

const storedComments = localStorage.getItem("comments");
let feedback; // Один раз объявляем переменную

if (storedComments) {
    feedback = JSON.parse(storedComments);
} else {
    feedback = [];
}

const newComment = { user: "Новый пользователь", text: "Новый комментарий" };

comments.push(newComment);

localStorage.setItem("comments", JSON.stringify(comments));

document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("commentForm") as HTMLFormElement;
    const commentContainer = document.querySelector(".comments-container") as HTMLElement;
    const messageInput = document.getElementById("messageInput") as HTMLInputElement;
    const sendButton = document.getElementById("btn") as HTMLButtonElement;

    messageInput.addEventListener("input", () => {
        sendButton.disabled = messageInput.value.trim() === "";
    });

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = "Ваше имя";
        const commentText = messageInput.value;

        if (!commentText) {
            alert('Пожалуйста, введите комментарий');
            return;
        }

        const newCommentElement = createCommentElement("Пользователь", getCurrentDate(), "Текст комментария", "URL_аватара", 0);
        commentContainer.appendChild(newCommentElement);

        const favoritesButton = newCommentElement.querySelector(".favourites3") as HTMLElement;
        favoritesButton.addEventListener("click", () => toggleFavorite(3));

        commentContainer.appendChild(newCommentElement);

        messageInput.value = "";
        sendButton.disabled = true;
    });

});

function createCommentElement(username: string, date: string, text: string, avatarUrl?: string, rating?: number, answer?: string): HTMLElement {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const userAvatar = document.createElement("img");
    userAvatar.classList.add('user-avatar');
    if (avatarUrl) {
        userAvatar.src = avatarUrl;
    } else {
        // Generate a random avatar URL if not provided
        userAvatar.src = getRandomAvatarUrl();
    }
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
    const answerContainer = document.createElement('div');
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

    function toggleReplyInput(replyInput: HTMLInputElement) {
        if (replyInput.style.display === 'none') {
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
    if (rating !== undefined) {
        commentRating.textContent = rating.toString();
    } else {
        commentRating.textContent = "0";
    }

    const ratingValue = document.createElement("p");
    ratingValue.classList.add("rating-value");
    ratingValue.textContent = rating.toString();

    const ratingButtons = document.createElement("div");
    ratingButtons.classList.add("rating-buttons");

    const minusButton = createRatingButton("eclipse-minus", "−");
    const plusButton = createRatingButton("eclipse-pluse", "+");

    ratingButtons.appendChild(minusButton);
    ratingButtons.appendChild(plusButton);

    commentRating.appendChild(ratingValue);
    commentRating.appendChild(ratingButtons);

    function createRatingButton(className: string, text: string): HTMLButtonElement {
        const button = document.createElement("button");
        button.classList.add(className);
        button.textContent = text;
        button.addEventListener("click", () => handleRatingButtonClick(text));
        return button;
    }

    function handleRatingButtonClick(value: string) {
        const currentValue = parseInt(ratingValue.textContent || "0");

        if (value === "+" && currentValue < 5) {
            ratingValue.textContent = (currentValue + 1).toString();
        } else if (value === "-" && currentValue > -5) {
            ratingValue.textContent = (currentValue - 1).toString();
        }
    }

    // reply

    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-button");
    replyButton.textContent = "Ответить";

    const replyContainer = document.createElement("div");
    replyContainer.classList.add("reply-container");

    replyButton.addEventListener("click", () => toggleReplyInput(replyInput));

    // Add all elements to the comment container

    commentElement.appendChild(commentUser);
    commentElement.appendChild(commentContent);

    commentContent.appendChild(answerContainer);
    answerContainer.appendChild(answerButton);
    answerContainer.appendChild(replyInput);

    commentContent.appendChild(favouriteContainer);
    favouriteContainer.appendChild(favoritesButton);
    favouriteContainer.appendChild(heartWhiteIcon);
    favouriteContainer.appendChild(heartGrayIcon);

    commentContent.appendChild(ratingContainer);
    ratingContainer.appendChild(commentRating);
    ratingContainer.appendChild(ratingValue);
    ratingContainer.appendChild(ratingButtons);

    commentContent.appendChild(replyContainer);
    replyContainer.appendChild(replyButton);

    return commentElement;
}

function getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day}.${month} ${hours}:${minutes}`;
}

function getRandomAvatarUrl(): string {
    const avatarIds = [1, 2, 3, 4, 5];
    const randomAvatarId = avatarIds[Math.floor(Math.random() * avatarIds.length)];
    return `/src/img/avatar${randomAvatarId}.jpg`;
}

const commentsContainer = document.querySelector(".comments-container") as HTMLElement;
feedback.forEach((comment: any) => {
    const newCommentElement = createCommentElement(comment.user, getCurrentDate(), comment.text);
    commentsContainer.appendChild(newCommentElement);
});
