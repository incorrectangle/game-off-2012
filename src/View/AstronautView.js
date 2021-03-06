/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* AstronautView.js
* The main this!
* Copyright (c) 12 Schell Scivally. All rights reserved.
* 
* @author   Schell Scivally 
* @since    Sat Nov 10 17:13:15 2012  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/
mod({
    name : 'AstronautView',
    dependencies : [ 
        'moon::View/Toon.js',
        'bang::Utils/Ease.js',
        'moon::View/Sprite.js',
        'bang::Geometry/Rectangle.js',
        'bang::View/View.js',
        'moon::View/Character.js'
    ],
    /** * *
    * Initializes the AstronautView constructor.
    * * **/
    init : function initAstronautViewConstructor(Toon, Ease, Sprite, Rectangle, View, Character) {
        /** * *
        * Constructs new AstronautViews.
        * @constructor
        * @nosideeffects
        * @return {AstronautView}
        * * **/ 
        function AstronautView(x, y) {
            Character.call(this,x,y);

            var startX = 1;
            var startY = -12;
            this.toon = new Toon(startX, startY, 32,32, [
                new Sprite(0, 0, 32, 32, 'img/tiles.png', [
                    new Rectangle(0, 96+0*32, 32, 32), // 0 - forward
                    new Rectangle(0, 96+1*32, 32, 32), // 1 - right
                    new Rectangle(0, 96+2*32, 32, 32), // 2 - left
                    new Rectangle(0, 96+3*32, 32, 32), // 3 - backward
                    new Rectangle(32, 96+0*32, 32, 32), // 4 - forward (spray) 
                    new Rectangle(32, 96+1*32, 32, 32), // 5 - right (spray)
                    new Rectangle(32, 96+2*32, 32, 32), // 6 - left (spray)
                    new Rectangle(32, 96+3*32, 32, 32), // 7 - backward (spray)
                ])
            ]);
            this.toon.isPlaying = false;
            this.toon.shadowAlpha = 1;

            var shadow = new View(12,12,8,8);
            shadow.context.fillStyle = 'rgba(0,0,0,0.3)';
            shadow.context.fillRect(0,0,10,8);
            this.shadow = shadow;

            this.context.strokeStyle = 'rgba(255,0,0,0.5)';
            this.addView(shadow);
            this.addView(this.toon);
            this.hover = this.idleHover(startX, startY).interpolate();
        }

        AstronautView.prototype = new Character(); 
        AstronautView.prototype.constructor = AstronautView;
        //-----------------------------
        //  METHODS
        //-----------------------------
        AstronautView.prototype.idleHover = function AstronautView_idleHover(startX, startY) {
            var toon = this.toon;
            var shadow = this.shadow;
            startX = startX || 0;
            startY = startY || 0;
            return new Ease({
                target : toon,
                duration : 1000,
                properties : {
                    y : startY-8,
                    shadowAlpha : 0.3,
                },
                onComplete : function reverse(hover) {
                    if (toon.y === startY-8) { 
                        hover.config.properties.y = startY;
                        hover.config.properties.shadowAlpha = 1;
                    } else {
                        hover.config.properties.y = startY-8;
                        hover.config.properties.shadowAlpha = 0.3;
                    }
                    hover.interpolate();
                },
                onUpdate : function update(hover) {
                    toon.y = Math.round(toon.y);
                    shadow.alpha = toon.shadowAlpha;
                }
            })
        };
        AstronautView.prototype.quickHover = function AstronautView_idleHover(startX, startY) {
            var toon = this.toon;
            var shadow = this.shadow;
            startX = startX || 0;
            startY = startY || 0;
            return new Ease({
                target : toon,
                duration : 1000,
                properties : {
                    y : startY-8,
                    shadowAlpha : 0.3,
                },
                onComplete : function reverse(hover) {
                    if (toon.y === startY-8) { 
                        hover.config.properties.y = startY;
                        hover.config.properties.shadowAlpha = 1;
                    } else {
                        hover.config.properties.y = startY-8;
                        hover.config.properties.shadowAlpha = 0.3;
                    }
                    hover.interpolate();
                },
                onUpdate : function update(hover) {
                    toon.y = Math.round(toon.y);
                    shadow.alpha = toon.shadowAlpha;
                }
            })
        };
        return AstronautView;
    }
});    
