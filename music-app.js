let leftbtn=document.querySelector(".leftbtn")
let righttbtn=document.querySelector(".rightbtn")

let playbtn=document.querySelector(".playbtn")
let pausebtn=document.querySelector(".pausebtn")

let piccontainer=document.querySelector(".pic")

let singer=document.querySelector(".singername")


let audio=document.querySelector(".audio")
// Timers

let progresscontainer=document.querySelector('.progresscontainer')
let starttime=document.querySelector('.starttime')
let endtime=document.querySelector('.endtime')


let pics=[
{id:1,img:'pics/images(1).jpeg'},
{id:2,img:'pics/images.jpeg'},
{id:3,img:'pics/images3.jpg'},

];
let picindex=0

let songs=['music/music1.mp3',"music/music2.mp3",'music/music3.mp3'];
let singername=["Tom","oggy","simon"];
let singerindex=0;
let songindex=0;

const showpic=(index)=>{
    piccontainer.innerHTML=`
    <img src=${pics[index].img} alt=${picindex+1} class="songimg">
    `
    //Will do load corresponding songs...
    loadmusic(songs[index]);
      // Will load corresponding sinernames...
    showsingername(singername[singerindex])
    

}

const showsingername=(name)=>{
    singer.innerHTML=`${name}`
}

const loadmusic=(song)=>{
 audio.src=song
}
function playsong(){
    audio.play()
}
function pausesong(){
    audio.pause()
}

function prevsong(){
songindex--
if(songindex<0){
songindex=songs.length-1;

}
else{
    loadmusic[songs[songindex]]
}
playsong()
}
function nextsong()
{
songindex++
if(songindex>songs.length-1){
    songindex=0
}  loadmusic[songs[songindex]]
pausesong()

}

leftbtn.addEventListener("click",()=>{
//singer name
singerindex--
if(singerindex>0){
    singerindex--
    showsingername(singername[singerindex])
}
else{
    singerindex=singername.length-1;
    showsingername(singername[singerindex])
}


    //music
prevsong()
// check if pic len is 0
if(picindex>0){
    picindex--
    showpic(picindex)
}
else{
    picindex=pics.length-1;
    showpic(picindex)
}

})

righttbtn.addEventListener("click",()=>{
singerindex++
if(singerindex<singername.length-1){
    singerindex++
    showsingername(singername[singerindex])
}
else{
    singerindex=0;
    showsingername(singername[singerindex])
}



nextsong()

if(picindex<pics.length-1){
    picindex++
    showpic(picindex)
}
   
else{
    picindex=0
    showpic(picindex)
}



})

playbtn.addEventListener("click",()=>{
    //1.music will get played...


//audio.play()
playsong()
    //2.play btn will get hide


    playbtn.classList.add('none');
    playbtn.classList.remove('show');
    //3.pause btn will get displayed..
    pausebtn.classList.add('show')
    pausebtn.classList.remove('none');
})






pausebtn.addEventListener("click",()=>{
    //1.music will get played...
//audio.pause()
pausesong()
    //2.play btn will get show


    playbtn.classList.add('show');
    playbtn.classList.remove('none');

    //3.pause btn will hide..
    pausebtn.classList.add('none')
    pausebtn.classList.remove('show')
})

function updatetime(e) {
    progresscontainer.style.display='block'
    let endtimevalue = e.srcElement.duration;
    let starttimevalue = e.srcElement.currentTime;

    
    let formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    };

    // Update the text content
    endtime.textContent = formatTime(endtimevalue);
    starttime.textContent = formatTime(starttimevalue);
}

audio.addEventListener('timeupdate', updatetime);

//when our muics got ended 

audio.addEventListener('ended',nextsong);
showpic(picindex)
