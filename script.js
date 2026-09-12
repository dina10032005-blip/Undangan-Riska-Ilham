/* =================================
   NAMA TAMU
================================= */

const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get("to");

const guestName = document.getElementById("guestName");

if (guest) {
    guestName.textContent = guest;
} else {
    guestName.textContent = "Tamu Undangan";
}


/* =================================
   ELEMEN
================================= */

const openInvitation = document.getElementById("openInvitation");
const opening = document.getElementById("opening");
const photoSection = document.getElementById("photoSection");

const weddingMusic = document.getElementById("weddingMusic");


/* =================================
   PLAYLIST MUSIK
================================= */

const playlist = [
    "assets/musik1.mp3",
    "assets/musik2.mp3"
];

let currentSong = 0;


/* =================================
   MEMUTAR MUSIK
================================= */

function playMusic() {

    weddingMusic.src = playlist[currentSong];

    weddingMusic.volume = 1;

    weddingMusic.play()
        .then(function () {
            console.log("Musik berhasil diputar");
        })
        .catch(function (error) {
            console.log("Musik gagal diputar:", error);
        });
}


/* =================================
   OTOMATIS GANTI LAGU
================================= */

weddingMusic.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    playMusic();

});


/* =================================
   BUKA UNDANGAN
================================= */

openInvitation.addEventListener("click", function () {

    // Mulai musik
    currentSong = 0;
    playMusic();

    // Hilangkan halaman pembuka
    opening.style.display = "none";

    // Tampilkan foto
    photoSection.style.display = "flex";

    // Scroll ke foto
    photoSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =================================
   COUNTDOWN
================================= */

const weddingDate =
    new Date("November 8, 2026 09:00:00").getTime();


const countdown = setInterval(function () {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    if (distance <= 0) {

        clearInterval(countdown);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance % (1000 * 60)) /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}, 1000);


/* =================================
   GOOGLE CALENDAR
================================= */

const calendarTitle =
    encodeURIComponent(
        "Pernikahan Riska & Ilham"
    );


const calendarDetails =
    encodeURIComponent(
        "Menghadiri pernikahan Riska & Ilham"
    );


const calendarLocation =
    encodeURIComponent(
        "................................"
    );


const calendarUrl =
    "https://calendar.google.com/calendar/render" +
    "?action=TEMPLATE" +
    "&text=" + calendarTitle +
    "&dates=20261108T090000/20261108T140000" +
    "&details=" + calendarDetails +
    "&location=" + calendarLocation;


document.getElementById("saveDate").href =
    calendarUrl;


/* =================================
   SALIN NOMOR REKENING
================================= */

const copyAccount =
    document.getElementById("copyAccount");

const accountNumber =
    document.getElementById("accountNumber");

const copyMessage =
    document.getElementById("copyMessage");


copyAccount.addEventListener("click", function () {

    const number =
        accountNumber.textContent.trim();


    navigator.clipboard.writeText(number)

        .then(function () {

            copyMessage.textContent =
                "Nomor rekening berhasil disalin ✓";

        })

        .catch(function () {

            copyMessage.textContent =
                "Silakan salin nomor rekening secara manual.";

        });

});