const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particelsArray; 

let mouse = {
    x: null,
    y: null,
    radius : (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener("mousemove", (dets) =>{
    mouse.x = dets.x;
    mouse.y = dets.y;
    
});

// Create particles
class Particles{
    constructor (x, y, directionX, directionY, size , color){
        this.x = x,
        this.y = y,
        this.directionX = directionX,
        this.directionY = directionY,
        this.size = size,
        this.color = color
    }

    // method to draw individual particle

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0, Math.PI * 2, false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    // check particle position , check mouse position, move the particle, draw the particle
    
    update(){
        // if particle is still within canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        // check collision detection  - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.size * 10){
                this.y -= 10;
            }
        }
        this.x += this.directionX
        this.y += this.directionY

        //  draw
        this.draw();
    }

}

function init(){
    particelsArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000 ;
    for(let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2)- (size * 2 )) + size * 2); 
        let y = (Math.random() * ((innerHeight - size * 2)- (size * 2 )) + size * 2);  
        let directionX = (Math.random() * 5) -2.5;
        let directionY = (Math.random() * 5) -2.5;
        let color = "#ffffff"
         
        particelsArray.push(new Particles(x, y, directionX, directionY, size, color))
    }      
};

function connect(){
    let opacityvalue = 1;
    for(let a = 0; a < particelsArray.length; a++){
        for(let b = a; b < particelsArray.length; b++){
            let distance = 
            ( 
                (particelsArray[a].x - particelsArray[b].x)
                * (particelsArray[a].x - particelsArray[b].x)
            ) + (
                (particelsArray[a].y - particelsArray[b].y)
                * (particelsArray[a].y - particelsArray[b].y)
            );
            if(distance < (canvas.width / 8) * (canvas.height / 8)){
                opacityvalue = 1 - (distance / 20000)
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityvalue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particelsArray[a].x, particelsArray[a].y);
                ctx.lineTo(particelsArray[b].x, particelsArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particelsArray.length; i++ ){
        particelsArray[i].update();
    }
    connect();
}

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height =  innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
})

window.addEventListener("mouseout", () =>{
    mouse.x = null;
    mouse.y = null;
})


init();
animate();