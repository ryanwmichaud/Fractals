


(function (){
    let canvas, ctx

    function init(){
        canvas = document.getElementById('canvas')
        if(canvas.getContext) {
            ctx = canvas.getContext('2d')
        }else{
            console.log('browser not support');
            return
        }

  
        const directions = {
            0 : 'right',
            1 : 'down',
            2 : 'left',
            3 : 'up'
        }

        class Turtle{
            constructor(x, y){
                this.x=x
                this.y=y
                this.direction = 0
                ctx.beginPath()
                ctx.moveTo(x,y)
            }

            forward(dist){
                //console.log('before: ',this.x,this.y)
                if(this.direction===0){
                    this.x+=dist;
                    
                }
                if(this.direction===1){
                    this.y+=dist;
                    
                }
                if(this.direction===2){
                    this.x-=dist;
                   
                }
                if(this.direction===3){
                    this.y-=dist;
                    
                }
                ctx.lineTo(this.x,this.y)
                ctx.stroke()
                //console.log('now ',this.x,this.y);
            }
            turnRight(){
                this.direction = (this.direction + 1)%4;   
            }
            turnLeft(){
                this.direction = (this.direction - 1)%4;
                if(this.direction<0){
                    this.direction=3
                }
                console.log(this.direction);
            }
        }


       

        function rec(t, size, depth, scale, str){
            //console.log('depth',depth);
            function recForward(){
                rec(t,size/scale,depth-1,scale,str)
            }
            
            if(depth===0){
                t.forward(size)
            }
            else{
                
                for(const i of str ){
                    if (i === 'f'){
                        recForward()
                    }else if(i === '+'){
                        t.turnRight()
                    }else if(i === '-'){
                        t.turnLeft() 
                    }
                }
            }
        }
        
        t = new Turtle(150,150)
        const size = 200
        const depth = 4
        const scale = 4
        rec(t,size,depth,scale,'f+f-f-f+ff')
        /*
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        */
        
     
        
        
        

        
    }

    document.addEventListener('DOMContentLoaded',init)
    //once DOM loads, init canvas and context

})()


/*
recForward()
t.turnLeft()
recForward()
t.turnRight()
recForward()
t.turnRight()
recForward()
recForward()
t.turnLeft()
recForward()
t.turnLeft()
recForward()
t.turnRight()
recForward()
*/