class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, is_me){
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.move_length = 0;
        this.eps = 0.1;

        this.cur_skill = null; //有没有选择技能

    }
    start(){
        if(this.is_me){
            this.add_listening_events();
        }
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function(){
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e){
            if(e.which === 3){
                outer.move_to(e.clientX, e.clientY);
            }else if(e.which === 1){
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX, e.clientY); //鼠标点击事件
                }

                outer.cur_skill = null; //技能清空
            }
        });

        $(window).keydown(function(e){  //按下q键
            if(e.which === 81){ //q
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }

    //发射火球
    shoot_fireball(tx, ty){
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1.0;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length);
    }

    //获得距离
    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    move_to(tx, ty){
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        //console.log(this.move_length, this.vx, this.vy);
    }
    update() {
        if(this.move_length < this.eps){
            this.move_length = 0;
            this.vx = this.vy = 0;
        }else{
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            //console.log(this.speed, this.timedelta);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.render();
    }

    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
