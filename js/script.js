console.log("Welcome to our Spotify");
let audio = new Audio();
let playing_music = true;
let gif, inText;
let play_btn = document.querySelector("#Play");
let liElements = document.querySelector(".SongList").getElementsByTagName("li");
let songs;
let lis;
let CurrentFolder;

let getSongs = async (folder) => {
    CurrentFolder = folder;
    
    // Fetch the list of files from the GitHub repository
    let a = await fetch(`https://api.github.com/repos/Rishabh-749/Spotify/contents/Songs/${folder}`);
    let response = await a.json();

    songs = [];
    for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if (element.name.endsWith(".mp3")) {
            songs.push(element.name);
        }
    }

    let Song_UL = document.querySelector(".SongList").getElementsByTagName("ul")[0];
    Song_UL.innerHTML = "";
    for (const song of songs) {
        Song_UL.innerHTML = Song_UL.innerHTML + `
        <li class="flex align-i">
            <img src="Assets/Images/CD.svg" alt="music" width="30px" height="30px">
            <div class="info">
                <div>${song.replace(".mp3", "").replaceAll("%20", " ")}</div> 
            </div>  
            <div class="playnow flex align-i">
                <div>Play Now</div>
                <img class="invert" src="Assets/Images/Play-btn-2.svg" alt="play-btn">
            </div>
        </li>`  
    }

    lis = Song_UL.getElementsByTagName("li");
    gif = lis[0].getElementsByTagName("img")[0];
    inText = lis[0].querySelector(".playnow").getElementsByTagName("div")[0];
    PlayMusic(songs[0], gif, inText, true);

    Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            gif = e.getElementsByTagName("img")[0];
            inText = e.querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML + ".mp3", gif, inText);
        });
    });
};

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return formattedMinutes + ':' + formattedSeconds;
}

let RestoreImage = () => {
    Array.from(liElements).forEach((li) => {
        li.querySelector("img").src = "Assets/Images/CD.svg";
        li.querySelector(".playnow").getElementsByTagName("div")[0].innerHTML = "Play Now";
    });
};

const PlayMusic = (track, gif, inText, pause = false) => {
    audio.src = `/Spotify/Songs/${CurrentFolder}/` + track;
    gif.src = "Assets/Images/Gifs/music-play.gif";
    inText.innerHTML = "Playing";

    if (!pause) {
        audio.play();
        RestoreImage();
        gif.src = "Assets/Images/Gifs/music-play.gif";
        inText.innerHTML = "Playing";
        play_btn.src = "Assets/Images/Play-Bar/Pause-btn.svg";
    }

    document.querySelector(".mar").innerHTML = decodeURI(track);
};

async function DisplayAlbums() {
    let a = await fetch(`https://api.github.com/repos/Rishabh-749/Spotify/contents/Songs/`);
    let response = await a.json();
    let Card_Con_2 = document.querySelector(".card_container-2");

    for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if (element.type === "dir") {
            let folder = element.name;
            let albumInfo = await fetch(`https://raw.githubusercontent.com/Rishabh-749/Spotify/main/Songs/${folder}/info.json`);
            let albumData = await albumInfo.json();

            Card_Con_2.innerHTML = Card_Con_2.innerHTML + `<div data-folder="${folder}" class="card card-2 flex-d-c curve card-p-m justify-c">
                                    <img src="Songs/${folder}/Cover.jpeg" height="152px" width="152px" alt="Arjit Sing">
                                    <h2>${albumData.title}</h2>
                                    <p>${albumData.Description}</p>
                                    <div class="play-button">
                                        <button class="p-b flex justify-c align-i">
                                            <img src="Assets/Images/Play-btn.svg" alt="" srcset="">
                                        </button>
                                    </div>
                            </div>`;
        }
    }
}

let main = async () => {
    await getSongs("2_Mahabharata");
    await DisplayAlbums();

    play_btn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            play_btn.src = "Assets/Images/Play-Bar/Pause-btn.svg";
        } else {
            audio.pause();
            play_btn.src = "Assets/Images/Play-Bar/Play-btn.svg";
        }
    });

    Previous.addEventListener("click", () => {
        let index = songs.indexOf(audio.src.split(`/songs/${CurrentFolder}/`)[1]);
        if ((index - 1) >= 0) {
            gif = lis[index - 1].getElementsByTagName("img")[0];
            inText = lis[index - 1].querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(songs[index - 1], gif, inText);
        } else {
            index = songs.length - 1;
            gif = lis[index].getElementsByTagName("img")[0];
            inText = lis[index].querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(songs[index], gif, inText);
        }
    });

    Next.addEventListener("click", () => {
        let index = songs.indexOf(audio.src.split(`/songs/${CurrentFolder}/`)[1]);
        if ((index + 1) < songs.length) {
            gif = lis[index + 1].getElementsByTagName("img")[0];
            inText = lis[index + 1].querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(songs[index + 1], gif, inText);
        } else {
            index = 0;
            gif = lis[index].getElementsByTagName("img")[0];
            inText = lis[index].querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(songs[index], gif, inText);
        }
    });

    audio.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(audio.currentTime)}/${secondsToMinutesSeconds(audio.duration)}`;
        document.querySelector(".Circle").style.left = (audio.currentTime / audio.duration) * 100 + "%";

        let index = songs.indexOf(audio.src.split(`/songs/${CurrentFolder}/`)[1]);
        if (`${audio.currentTime}` == `${audio.duration}` && (index + 1) < songs.length) {
            console.log("Equal");
            gif = lis[index + 1].getElementsByTagName("img")[0];
            inText = lis[index + 1].querySelector(".playnow").getElementsByTagName("div")[0];
            PlayMusic(songs[index + 1], gif, inText);
        }
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".Circle").style.left = percent + "%";
        audio.currentTime = ((audio.duration) * percent) / 100;
    });

    Array.from(document.getElementsByClassName("card-2")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(`${item.currentTarget.dataset.folder}`);
        });
    });

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(`${item.currentTarget.dataset.folder}`);
            play_btn.src = "Assets/Images/Play-Bar/Play-btn.svg";
            PlayMusic(songs[0], gif, inText);
        });
    });
}

main();
