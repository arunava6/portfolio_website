// JavaScript for Music Player
document.addEventListener("DOMContentLoaded", () => {
    const songs = [
        {
            title: "Mahiye Jinna Sohna",
            artist: "Darshan Raval",
            src: "./assets/Mahiye Jinna Sohna Darshan Raval 128 Kbps.mp3", // Replace with actual song file paths
            cover: "./assets/card2img.jpeg",
        },
        {
            title: "Soulmate",
            artist: "Badshah,Arijit Singh",
            src: "./assets/_Soulmate_320(PagalWorld.com.sb).mp3", // Replace with actual song file paths
            cover: "./assets/soulmate.jpg",
        },
        {
            title: "O Maahi",
            artist: "Pritam, Arijit Singh",
            src: "./assets/O Maahi (Dunki)_320(PagalWorld.com.sb).mp3",
            cover: "./assets/o maahi.jpg",
        },
        {
            title: "Sajni",
            artist: "Arijit Singh, Ram Sampath,Prashant Pandey",
            src: "./assets/O Sajni Re_320(PagalWorld.com.sb).mp3",
            cover: "./assets/o sajni.jpg",
        },
        {
            title: "Soni Soni",
            artist: "Jonita Gandhi,Darshan Raval,Rochak Kohli",
            src: "./assets/Soni Soni_320(PagalWorld.com.sb).mp3",
            cover: "./assets/soni soni.jpeg",
        },
        {
            title: "Ve Kamleya",
            artist: "Shreya Ghoshal, Arijit Singh,Pritam",
            src: "./assets/Ve_Kamleya_-_Rocky_Aur_Rani_Kii_Prem_Kahaani_320_Kbps.mp3",
            cover: "./assets/ve kamleya.jpg",
        },
    ];

    let currentSongIndex = 0;
    const audio = new Audio(songs[currentSongIndex].src);
    const albumPic = document.querySelector(".album-pic img");
    const songTitle = document.querySelector(".album-song h5");
    const songArtist = document.querySelector(".album-song p");
    const playPauseIcon = document.querySelector(".player-control-icon:nth-child(3)");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeElement = document.querySelector(".current-time");
    const totalTimeElement = document.querySelector(".total-time");
    const volumeBar = document.querySelector(".volume-bar");

    // Update player UI with the current song
    function updatePlayerUI(songIndex) {
        const song = songs[songIndex];
        albumPic.src = song.cover;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audio.src = song.src;
        audio.load();
        updateTotalTime();
    }

    // Play or pause the audio
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseIcon.src = "./assets/play.png"; // Replace with pause icon
        } else {
            audio.pause();
            playPauseIcon.src = "./assets/player_icon3.png"; // Replace with play icon
        }
    }

    // Update the total duration of the song
    function updateTotalTime() {
        audio.addEventListener("loadedmetadata", () => {
            const duration = formatTime(audio.duration);
            totalTimeElement.textContent = duration;
        });
    }

    // Format time in mm:ss format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    }

    // Update the current time of the song
    audio.addEventListener("timeupdate", () => {
        currentTimeElement.textContent = formatTime(audio.currentTime);
        progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;

        // Update circular progress bar
        const progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector(".circular-progress").style.background = `conic-gradient(#4caf50 ${progress}%, #ccc 0)`;
    });

    // Seek within the song
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Change volume
    volumeBar.addEventListener("input", () => {
        audio.volume = volumeBar.value / 100;
    });
    
    // Play specific song when clicking on a card
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            currentSongIndex = index; // Set current song index
            updatePlayerUI(currentSongIndex);
            audio.play();
            playPauseIcon.src = "./assets/player_icon_pause.png"; // Update to pause icon
        });
    });

    // Next song
    document.querySelector(".player-control-icon:nth-child(4)").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayerUI(currentSongIndex);
        audio.play();
    });

    // Previous song
    document.querySelector(".player-control-icon:nth-child(2)").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayerUI(currentSongIndex);
        audio.play();
    });

    // Play/Pause Button
    playPauseIcon.addEventListener("click", togglePlayPause);

    // Initialize player with autoplay
    updatePlayerUI(currentSongIndex);
    audio.play(); // Automatically play the song on page load
    playPauseIcon.src = "./assets/play.jpeg"; // Set to pause icon to indicate playing

    audio.addEventListener("ended", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayerUI(currentSongIndex);
        audio.play();
    });
});









