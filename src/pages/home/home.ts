import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import videojs from 'video.js';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
  }

  jump = false;

  ionViewDidLoad(){
    let videoEle = document.getElementById('videoEle');
    console.log(videoEle);
    let player = videojs(videoEle,{
      preload:true,
      errorDisplay: false      
    },()=>{
        
      
      var modal_content = "<div class='center'><div class='errorMsg'>播放错误，请点击重试</div> <div class='refreshButtonContainer'><button id='retryButton' class='refreshButton'>Retry</button></div></div>";
      var contentEl = document.createElement('div');
    // probably better to just build the entire thing via DOM methods
      contentEl.innerHTML = modal_content;

      var ModalDialog = videojs.getComponent('ModalDialog');
      var modal = new ModalDialog(player, {

        // We don't want this modal to go away when it closes.
        content : contentEl,
        temporary: false
      });
      

      player.on('error',()=>{
        player.addChild(modal);
       
        setTimeout(()=>{
          modal.open();
          console.log("error page show !");
          let retryButton = document.getElementById('retryButton');
          retryButton.addEventListener('click',()=>{
            console.log("close the modal ");
            modal.close();
            player.src({
              type: "application/x-mpegURL",
              src : 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            })
            
            setTimeout(()=>{
              this.jumpTo();
            },3000);

          })
        },1000)
      });



        player.one('canplay',()=>{          
          console.log("set current tiem,using can play event");
          player.currentTime(100);
          console.log("current play time is "+player.currentTime());
          
        })
        
    });

  }

  jumpTo(){
      let videoEle :any = document.getElementById('videoEle_html5_api');
      videoEle.currentTime = 100;
      videoEle.play();

  }

  


}
