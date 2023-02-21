AFRAME.registerComponent("shoot-balls",{

    schema:{
        gameState:{type:"string",default:"play"}
    },
    
    init:function(){
        alert("Pop the balloons pressing 'z' key.. ⏳ : 30 sec")

        
        var duration =30;
        var timerE1=document.querySelector("#timer");

        this.startTimer(duration,timerE1)
        
        this.shootBalls()
      
    },

    startTimer: function(duration,timerE1) {
        var minutes;
        var seconds;
        
        //setting interval for the game
        setInterval(()=>{
   
           if(duration>=0){
               this.data.gameState="play";
               
               //converting the string into integers values
               minutes= parseInt(duration / 60);
               seconds= parseInt(duration % 60);
   
               
               if(minutes<10){
                   minutes="0"+minutes;
   
               }
               if(seconds<10){
                   seconds="0"+seconds;
            
               }
   
               //changing the text attribute of the timerE1
               timerE1.setAttribute("text",{
                       //concatenating the value
                       value: minutes + ":" + seconds,
                   });
   
                duration -= 1;  
   
           }
           else{
            this.data.gameState="stop";
            var over = document.querySelector("#over");
            over.setAttribute("visible",true)
            location.reload()
           }
        },1000)
    
       
    },



    shootBalls:function(){
        window.addEventListener("keydown",e=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                })
                ball.setAttribute("material","color","black")
                
                var cam=document.querySelector("#camera-rig")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y+1.3,
                    z:pos.z-0.3
                })

                var camera=document.querySelector("#camera").object3D
                var direction= new THREE.Vector3()

                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",
                    direction.multiplyScalar(-24)
                )

                var scene=document.querySelector("#scene")
                ball.setAttribute("dynamic-body",
                {
                    shape:"sphere",
                    mass:"0"
                })
                ball.addEventListener("collide",this.destroyBal)
                scene.appendChild(ball)

              
            }
        })
    },

    destroyBal:function(e){
        
        
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)

        var scene=document.querySelector("#scene")
        var bal=document.querySelector(".balls")

        
        var element=e.detail.target.el
        var elementHit=e.detail.body.el
        elementHit.setAttribute("position",{x:0, y:-100,z:0})
      
        
        
    
        element.removeEventListener("collide",this.destroyBal)
        scene.removeChild(element)

    },

    
})