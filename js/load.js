const imgUrls = ['img/BG/BG.png','img/Tiles/2.png','img/Object/obj7.png','img/Object/obj8.png','img/enemy/1.gif','img/enemy/2.gif','img/enemy/3.gif'];
const audioUrls = ["audio/swoosh.mp3","audio/hurt.mp3","audio/running.mp3","audio/jump.mp3"];
for (let index = 1; index <= 10; index++) {
    ['Idle', 'Run', 'Jump','Dead', 'Attack', 'JumpAttack'].forEach((act)=>{
        imgUrls.push(`img/knight/${act} (${index}).png`);
    });
}
let total = imgUrls.length + audioUrls.length;
let completed = 0;
console.log("total count:", total);

imgUrls.forEach((url)=>{
    const imgDev = new Image();
    imgDev.src = url;
    imgDev.onload = (evt)=> updataProgressBar(evt.target);
    imgDev.onerror = ()=>{
        console.log("error loading", url);
    }
});

audioUrls.forEach((url)=>{
    const audElm = new Audio(url);
    $(audElm).on('canplay', (evt)=> updataProgressBar(evt.target));
});


function updataProgressBar(elm){
    completed++;
    console.log(completed);
    $(elm).css('position','absolute');
    $(elm).css('visibility','hidden');
    $('#loading-section').append(elm);
    let percentage = Math.ceil(completed/total * 100);
    $('#pb').css('width', `${percentage}%`);
    $('#pb').text(`${percentage}%`);
    // if(completed === total){
    //     $('#loading-section').addClass('invisible');
    //     $('#main-section').removeClass('invisible');
    // }
}