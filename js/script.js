
//for info-popup
let info_flag = false;

function findGhost(){
    const ghost = document.querySelector('.ghost_wrap');
    const bt = document.querySelector('.bt_find_ghost');
    const wrap = document.querySelector('.wrap');

    const message = document.querySelector('.message');
    
    const wrap_bg = document.querySelectorAll('.wrap_bg');
    const findColor = document.querySelectorAll('.findColor');
    const findColorFill = document.querySelectorAll('.findColorFill');
    const color_text = document.querySelector(".color_text");

    let bgcolor=getRandomColor();

    for(i =0 ;i<findColor.length;i++){
        findColor[i].style.backgroundColor = bgcolor;
    }
    for(i =0 ;i<findColorFill.length;i++){
        findColorFill[i].style.fill = bgcolor;
    }
    color_text.innerText = bgcolor;
    
    // ghost.style.opacity =1;
    bt.style.opacity =0;
    wrap.style.boxShadow = 'inset 0 0 100px #00000080';

    setTimeout(function(){
        message.style.animation = "message 3s";
    },200);

    setTimeout(function() {
        bt.style.display = "none";
    }, 500);

    setTimeout(function() {
        for(i =0;i<wrap_bg.length;i++){
        wrap_bg[i].style.opacity =1;
        }
        ghost.style.opacity =1;
        info_flag=true;
    }, 3000);


}

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function toggleColorInfo(){
    if(info_flag){
        document.querySelector(".color_info_wrap").classList.toggle("hide")
    }
}

function downloadGhost(){
    const ghost = document.querySelector(".ghost");
    const color = document.querySelector(".color_wrap");

    const ghostForDownload = ghost.cloneNode(true);
    const colorForDownload = color.cloneNode(true);

    let downloadWrap = document.createElement('div');
    downloadWrap.classList.add("downloadWrap");
    downloadWrap.appendChild(ghostForDownload);
    downloadWrap.appendChild(colorForDownload);
    document.body.appendChild(downloadWrap);

    makeImage(downloadWrap).then((result) => {
        console.log("성공:", result)
        document.querySelector(".downloadWrap").remove(); 
        document.querySelector(".downloadLink").remove();
        toggleColorInfo();
    })
}

function makeImage(obj){
    return new Promise((resolve, reject) => {
        resolve(html2canvas(obj).then(function(canvas){
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "myGhost.png");
        }));
    });
}

function downloadURI(uri, name){
	const link = document.createElement("a");
    link.classList.add("downloadLink");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
}



async function share(){
    navigator.share({
        title: 'What color is my ghost?',
        text: 'Make your ghost',
        url: window.location.href
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
}