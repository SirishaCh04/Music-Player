const menuBtn = document.querySelector('.menu-btn');
container = document.querySelector('.container');

const progressBar =document.querySelector(".bar"),
progressDot =document.querySelector(".dot"),
currentTimeEl =document.querySelector(".current-time"),
durationEl =document.querySelector(".duration");
menuBtn.addEventListener('click',()=>{
    container.classList.toggle('active');
});

let playing = false,
currentSong = 0,
audio = new Audio();

const songs = [
    {
        title: "Nijamee Cheputunaa",
        artist: "Sid Sriram",
        img: "music/nijame.jpg",
        src: "music/nijame.mp3"
    },
    {
        title: "Yem Maya jarugutundee",
        artist: "G.V.Prakash",
        img: "music/yem.jpg",
        src: "music/Yem.mp3"
    },
    {
        title: "Bangaru",
        artist: "Deepu",
        img: "music/bangaru.jpg",
        src: "music/Bangaru.mp3"
    },
    {
        title: "Malliswarive",
        artist: "Jassie",
        img: "music/malli.jpg",
        src: "music/Malliswarive.mp3"
    },
    {
        title: "Manasu Mare",
        artist: "Amit Trivedi",
        img: "music/manasu.jpg",
        src: "music/Manasu.mp3"
    },
    {
        title: "Kanne Kanne",
        artist: "Anurag Kulkarni",
        img: "music/kanne.jpg",
        src: "music/Kanne.mp3"
    },
    {
        title: "Na Roja Nuvve",
        artist: "Abdul",
        img: "music/naroja.jpg",
        src: "music/Na Roja Nuvve.mp3"
    },
    {
        title: "Oh Priya Priya",
        artist: "Adnan Sami",
        img: "music/priya.jpg",
        src: "music/Oh Priya Priya.mp3"
    },
    {
        title: "Gunde Jari Gallanthayyinde",
        artist: "Anup Rubens",
        img: "music/gunde.jpg",
        src: "music/Gallanthayyinde.mp3"
    },
    
]

const playlistContainer = document.querySelector('#playlist'),
infoWrapper = document.querySelector('.info'),
coverImage = document.querySelector('.cover-image'),
currentSongTitle = document.querySelector('.current-song-title'),
currentFavorite = document.querySelector("#current-favourite");

function init(){
    updatePlaylist(songs);
    loadSong(currentSong);
}

init();


function updatePlaylist(songs){
    //remove any existing element
    playlistContainer.innerHTML='';

    //use for each on songs array

    songs.forEach((song,index)=>{
        //extract data from song

        const { title, src } = song;

        //create a tr to wrapped song
    const tr = document.createElement('tr');
    tr.classList.add('song');
    tr.innerHTML = `
                    <td class="no">
                        <h5>${index+1}</h5>
                    </td>
                    <td class="title">
                        <h6>${title}</h6>
                    </td>
                    <td class="length">
                        <h5>2:03</h5>
                    </td>
                    `;
        playlistContainer.appendChild(tr);


        //let's play song when click

        tr.addEventListener("click", (e) => {

            currentSong= index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove("active");
            playPauseBtn.classList.replace("fa-play","fa-pause");
            playing=true;
        })


        const audioForDuration = new Audio(`${src}`);
        audioForDuration.addEventListener("loadedmetadata",()=>{
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h5").innerText = songDuration;
        })
    });
}

function formatTime(time){

    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

//let add audio

function loadSong(num){
    //change all the artist and time 

    infoWrapper.innerHTML=`
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>`;

    currentSongTitle.innerHTML=songs[num].title;

    //change the cover

    coverImage.style.backgroundImage= `url(${songs[num].img})`;

    audio.src=`${songs[num].src}`;

    
}


//lets add play pause functio

const playPauseBtn = document.querySelector("#playpause"),
nextBtn= document.querySelector("#next"),
prevBtn= document.querySelector("#prev");

playPauseBtn.addEventListener("click",() =>{
    if(playing){
        playPauseBtn.classList.replace("fa-pause","fa-play");
        playing=false;
        audio.pause();
    }else{
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing=true;
        audio.play();
    }
})

function nextSong(){

    if(currentSong< songs.length -1){
        currentSong++;
    }else{
        currentSong=0;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

nextBtn.addEventListener("click",nextSong);

function prevSong(){
    
    if(currentSong>0){
        currentSong--;
    }else{
        currentSong= songs.length -1;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

prevBtn.addEventListener("click",prevSong);


function progess(){
    let {duration,currentTime}=audio;

    isNaN(duration)?(duration=0):duration;
    isNaN(currentTime)?(currentTime=0):currentTime;

    currentTimeEl.innerHTML=formatTime(currentTime);
    durationEl.innerHTML=formatTime(duration);
    
    let progressPersentage= (currentTime/duration)*100;
    progressDot.style.left=`${progressPersentage}%`
}

audio.addEventListener("timeupdate",progess);

function setProgress(e){
    let width=this.clientWidth;
    let clickX =e.offsetX;
    let duration=audio.duration;
    audio.currentTime =(clickX/width)*duration;
}










