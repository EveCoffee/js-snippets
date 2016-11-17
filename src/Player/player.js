export class CoffeePlayer{
    
    constructor(config){
        
        this.enablePlayFullScreen = config.enablePlayFullScreen || true;
        

        $(document.body).append(`
            <div class="video-modal">
            
                <div class="mask"></div>
            
                <!--播放器-->
                <div class="player">
                    <video class="v" src="" webkit-playsinline playsinline controls preload="auto"></video>
                </div>
            
            </div>
        `);

        this.player = document.querySelector(".video-modal .player .v");
        this.modal = $(".video-modal");

        this.modal.find(".mask").click((event) => {
            this.hide();
        });

        console.log(this.player);

        this.init();
        this.setSrc();
    }

    init(){

        if(this.enablePlayFullScreen){

            this.player.addEventListener("play", (event)=>{
                console.log(event);
                console.log("我已经开始了");
                // this.player.webkitEnterFullScreen();
            });

            /**
             * 播放结束后退出全屏
             */
            this.player.addEventListener("ended", ()=>{
                // this.player.webkitExitFullScreen();

                // this.hide();
            });

            $(document).on("webkitfullscreenchange", ()=>{
                console.log("退出了全屏!");
                // this.pause();
            });

        }

    }

    isFullScreen(){

    }
    
    play(){

        this.player.play();

        /**
         * 解决瞬间显示又立刻触发遮罩导致的消失bug
         */
        setTimeout(() => {
            this.modal.show();
        }, 0);

        this.player.addEventListener("canplay", (event) => {
            // this.player.webkitEnterFullScreen();
            this.player.play();
        });

        /*if(this.enablePlayFullScreen){
            this.player.webkitEnterFullScreen();
            console.log("我看到了你的全屏请求");
        }

        setTimeout(() => {
            // this.player.play();
            this.player.play();

            this.player.webkitEnterFullScreen();
        }, 500);*/

        // this.player.play();



        return this;
    }

    pause(){
        this.player.pause();
        return this;
    }

    show(){
        this.modal.show();
    }

    hide(){
        this.modal.hide();
        this.player.pause();
    }


    setSrc(path){

        if(path){
            this.player.src = path;
        }

        return this;
    }

    getSrc(){
        return this.player.src;
    }

}

export class Sound{
    
    constructor(){
        
    }
    
}