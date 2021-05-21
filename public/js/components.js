class miniPlayer extends HTMLElement{
    constructor(){
        super();
        getHTML('miniPlayer.html').then(html =>{
            this.innerHTML = html
            console.log('this is volume ' + volume)
            updateVolumeSlider(volume);
            if(song){
                console.log('update slider max')
                console.log(song.duration)
                setSongSliderPosition(song.currentTime)
                updateSongSliderMax(song.duration)
                if(song.paused) {
                    console.log('song is paused')
                    togglePlayButtonClass('play')
                 } else {
                    togglePlayButtonClass('pause')
                 }
            }else{
                togglePlayButtonClass('play')
            }
        })

    }
}

class songTable extends HTMLElement {
    constructor() {
        super();
        getHTML('songTable.html').then(html=>{
            this.innerHTML = html
        }).then((value)=>{
            appendSongs()
        })
    }
}

class DataFormControl extends HTMLElement{
    constructor(){
        super();


        getHTML('dataFormControl.html').then(html=>{
            this.innerHTML = html
        }).then(() => {
            this.dataForm = this.getAttribute('form')
            console.log(this.dataForm)
            getForm(this.dataForm).then(form => {
                $("#data-form-control-body").append(form)
            })
        })
    }
}

function getForm(form){
    return new Promise(resolve => {
        $.get(`/form/${form}`, (data) => {
            resolve(data)
        })
    })
}

function getHTML(file){
    return new Promise(resolve =>{
        $.get( `/component/${file}`, function( data ) {
            resolve(data)
        });
    })
}


window.customElements.define("data-form-control", DataFormControl);
