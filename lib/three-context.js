var THREE = require('three');
THREE.SimplifyModifier = require('./SimplifyModifier.js')
 
class ThreeContext
{
    constructor() {
        this.stack = 0;
        this.context = {
            center : {
                x : 0,
                y : 0
            },
            scale : {
                w : 1,
                h : 1
            },
            shape : new THREE.Shape(),
            group : new THREE.Group(),
        };
        this.strokeStyle = null;
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.miterLimit = 4;
        this.font = null;
        this.fillStyle = null;
    }

    fill() {        
        var shape = this.context.shape;        
        var group = this.context.group;

        if (shape.curves.length>0 || shape.holes.length>0)
        {
            var amount = 6 + group.children.length*0.2;
            try {
                var geometry = new THREE.ExtrudeGeometry( shape, {
                    amount: amount,
                    bevelEnabled: this.stack == 0
                } );
                for (var i=0;i<geometry.vertices.length;i++) 
                {
                    geometry.vertices[i].z += -amount/2;
                }
                geometry.verticesNeedUpdate = true;
                geometry.normalsNeedUpdate = true;
                geometry.groupsNeedUpdate = true;
                var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                    color: this.fillStyle,
                    emissive: this.fillStyle,
                }));
                group.add(mesh);            
            } catch (ex) {
                console.log(shape.curves);
                console.error(ex);
            }
        }

        this.context.shape = new THREE.Shape();
    }
    
    translate(x, y) {
        this.context.center.x += x;
        this.context.center.y += y;
    }

    scale(width, height) {
            this.context.scale.width = width;
            this.context.scale.height = height;
    }

    beginPath() {
            // this.context.shape.beginPath();
    }
    moveTo(x, y) {
        this.context.shape.moveTo( x + this.context.center.x, y + this.context.center.y );
    }

    bezierCurveTo() {
        for (var i=0;i<arguments.length;i+=2) {
            arguments[i] += this.context.center.x;
            arguments[i+1] += this.context.center.y;
        }
        this.context.shape.bezierCurveTo.apply(this.context.shape, arguments);
    }

    quadraticCurveTo() {
        for (var i=0;i<arguments.length;i+=2) {
            arguments[i] += this.context.center.x;
            arguments[i+1] += this.context.center.y;
        }

        this.context.shape.quadraticCurveTo.apply(this.context.shape, arguments);
    }

    save() {

    }

    stroke() {

    }

    restore() {

    }

    rotate(angle) {

    }

    lineTo() 
    {
        for (var i=0;i<arguments.length;i+=2) {
            arguments[i] += this.context.center.x;
            arguments[i+1] += this.context.center.y;
        }

        this.context.shape.lineTo.apply(this.context.shape, arguments);
    }
    
    arc() {
        arguments[0] += this.context.center.x;
        arguments[1] += this.context.center.y;

        this.context.shape.moveTo(arguments[0]+arguments[2], arguments[1]);

        arguments[0] = -arguments[2];
        arguments[1] = 0;

        this.context.shape.arc.apply(this.context.shape, arguments);
        //this.context.shape.closePath();
    }

    closePath() {
        this.context.shape.closePath();
    }

    measureText() {

    }

    fillText() {

    }

    strokeText() {

    }

    createLinearGradient() {
        
    }

    addColorStop() {
        
    }

    transform() {
        
    }

    addColorStop() {
        
    }
    
    calibrateTransformation(obj, v) {
        var axis = new THREE.Vector3( 0, 0, 1 );
        var angle = Math.PI;

        if (obj.geometry) 
        {
            for (var i=0;i<obj.geometry.vertices.length;i++) 
            {
                obj.geometry.vertices[i].add(v);
                obj.geometry.vertices[i].applyAxisAngle( axis, angle );
            }
            obj.geometry.verticesNeedUpdate = true;
            var modifer = new THREE.SimplifyModifier();
            obj.geometry = modifer.modify( obj.geometry ); 
        }
        for (var i=0;i<obj.children.length;i++) 
        {
            this.calibrateTransformation(obj.children[i], v);
        }
    }

    getObject() {
        var group = this.context.group;

        var box = new THREE.Box3().setFromObject(group);        
        var v = new THREE.Vector3( - (box.min.x + box.max.x/2), -(box.min.y + box.max.y/2), 0);
        this.calibrateTransformation(group, v);

        return group;
    }
}

module.exports = ThreeContext;
