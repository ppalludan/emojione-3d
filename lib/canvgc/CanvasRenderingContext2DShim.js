// Generated by CoffeeScript 1.12.3
(function() {
  var CanvasRenderingContext2DShim, _, randomId;

  _ = require('underscore');

  randomId = require('./randomId');

  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

  CanvasRenderingContext2DShim = (function() {

    /*
     * @param {Stenographer} stenographer
     * @param {CanvasRenderingContext2D} realContext
     * @param {Object} defaults
     */
    function CanvasRenderingContext2DShim(stenographer, context2d) {
      this.stenographer = stenographer;
      this.context2d = context2d;
    }

    CanvasRenderingContext2DShim.prototype.get = function(name) {
      return this.context2d[name];
    };

    CanvasRenderingContext2DShim.prototype.set = function(name, value) {
      this.stenographer.setContextProperty(name, value);
      this.context2d[name] = value;
    };

    CanvasRenderingContext2DShim.prototype.invoke = function(fn, args, assignTarget) {
      var ref;
      if (assignTarget == null) {
        assignTarget = null;
      }
      this.stenographer.invokeContext(fn, args, assignTarget);
      return (ref = this.context2d[fn]) != null ? ref.apply(this.context2d, args) : void 0;
    };

    CanvasRenderingContext2DShim.prototype.fill = function() {
      return this.invoke("fill", arguments);
    };

    CanvasRenderingContext2DShim.prototype.stroke = function() {
      return this.invoke("stroke", arguments);
    };

    CanvasRenderingContext2DShim.prototype.translate = function() {
      return this.invoke("translate", arguments);
    };

    CanvasRenderingContext2DShim.prototype.transform = function() {
      return this.invoke("transform", arguments);
    };

    CanvasRenderingContext2DShim.prototype.rotate = function() {
      return this.invoke("rotate", arguments);
    };

    CanvasRenderingContext2DShim.prototype.scale = function() {
      return this.invoke("scale", arguments);
    };

    CanvasRenderingContext2DShim.prototype.save = function() {
      return this.invoke("save", arguments);
    };

    CanvasRenderingContext2DShim.prototype.restore = function() {
      return this.invoke("restore", arguments);
    };

    CanvasRenderingContext2DShim.prototype.beginPath = function() {
      return this.invoke("beginPath", arguments);
    };

    CanvasRenderingContext2DShim.prototype.closePath = function() {
      return this.invoke("closePath", arguments);
    };

    CanvasRenderingContext2DShim.prototype.moveTo = function() {
      return this.invoke("moveTo", arguments);
    };

    CanvasRenderingContext2DShim.prototype.lineTo = function() {
      return this.invoke("lineTo", arguments);
    };

    CanvasRenderingContext2DShim.prototype.clip = function() {
      return this.invoke("clip", arguments);
    };

    CanvasRenderingContext2DShim.prototype.quadraticCurveTo = function() {
      return this.invoke("quadraticCurveTo", arguments);
    };

    CanvasRenderingContext2DShim.prototype.bezierCurveTo = function() {
      return this.invoke("bezierCurveTo", arguments);
    };

    CanvasRenderingContext2DShim.prototype.arc = function() {
      return this.invoke("arc", arguments);
    };

    CanvasRenderingContext2DShim.prototype.createPattern = function() {
      var pattern, targetId;
      targetId = randomId('p');
      pattern = this.invoke("createPattern", arguments, targetId);
      pattern.targetId = targetId;
      return pattern;
    };

    CanvasRenderingContext2DShim.prototype.createLinearGradient = function() {
      var actualAddColorStop, linearGradient, targetId;
      targetId = randomId('lg');
      linearGradient = this.invoke("createLinearGradient", arguments, targetId);
      linearGradient.targetId = targetId;
      actualAddColorStop = linearGradient.addColorStop;
      linearGradient.addColorStop = (function(_this) {
        return function() {
          _this.stenographer.invokeChildObject(targetId, "addColorStop", arguments);
          return actualAddColorStop.apply(linearGradient, arguments);
        };
      })(this);
      return linearGradient;
    };

    CanvasRenderingContext2DShim.prototype.createRadialGradient = function() {
      var actualAddColorStop, radialGradient, targetId;
      targetId = randomId('rg');
      radialGradient = this.invoke("createRadialGradient", arguments, targetId);
      radialGradient.targetId = targetId;
      actualAddColorStop = radialGradient.addColorStop;
      radialGradient.addColorStop = (function(_this) {
        return function() {
          _this.stenographer.invokeChildObject(targetId, "addColorStop", arguments);
          return actualAddColorStop.apply(radialGradient, arguments);
        };
      })(this);
      return radialGradient;
    };

    CanvasRenderingContext2DShim.prototype.fillText = function() {
      return this.invoke("fillText", arguments);
    };

    CanvasRenderingContext2DShim.prototype.strokeText = function() {
      return this.invoke("strokeText", arguments);
    };

    CanvasRenderingContext2DShim.prototype.measureText = function() {
      return this.invoke("measureText", arguments);
    };

    CanvasRenderingContext2DShim.prototype.drawImage = function() {
      return this.invoke("drawImage", arguments);
    };

    CanvasRenderingContext2DShim.prototype.fillRect = function() {
      return this.invoke("fillRect", arguments);
    };

    CanvasRenderingContext2DShim.prototype.clearRect = function() {
      return this.invoke("clearRect", arguments);
    };

    CanvasRenderingContext2DShim.prototype.getImageData = function() {
      return this.invoke("getImageData", arguments);
    };

    CanvasRenderingContext2DShim.prototype.putImageData = function() {
      return this.invoke("putImageData", arguments);
    };

    CanvasRenderingContext2DShim.prototype.isPointPath = function() {
      return this.invoke("isPointPath", arguments);
    };

    CanvasRenderingContext2DShim.property('canvas', {
      get: function() {
        return this.get('canvas');
      },
      set: function(canvas) {
        return this.set('canvas', canvas);
      }
    });

    CanvasRenderingContext2DShim.property('fillStyle', {
      get: function() {
        return this.get('fillStyle');
      },
      set: function(fillStyle) {
        return this.set('fillStyle', fillStyle);
      }
    });

    CanvasRenderingContext2DShim.property('font', {
      get: function() {
        return this.get('font');
      },
      set: function(font) {
        return this.set('font', font);
      }
    });

    CanvasRenderingContext2DShim.property('globalAlpha', {
      get: function() {
        return this.get('globalAlpha');
      },
      set: function(globalAlpha) {
        return this.set('globalAlpha', globalAlpha);
      }
    });

    CanvasRenderingContext2DShim.property('globalCompositeOperation', {
      get: function() {
        return this.get('globalCompositeOperation');
      },
      set: function(globalCompositeOperation) {
        return this.set('globalCompositeOperation', globalCompositeOperation);
      }
    });

    CanvasRenderingContext2DShim.property('lineCap', {
      get: function() {
        return this.get('lineCap');
      },
      set: function(lineCap) {
        return this.set('lineCap', lineCap);
      }
    });

    CanvasRenderingContext2DShim.property('lineDashOffset', {
      get: function() {
        return this.get('lineDashOffset');
      },
      set: function(lineDashOffset) {
        return this.set('lineDashOffset', lineDashOffset);
      }
    });

    CanvasRenderingContext2DShim.property('lineJoin', {
      get: function() {
        return this.get('lineJoin');
      },
      set: function(lineJoin) {
        return this.set('lineJoin', lineJoin);
      }
    });

    CanvasRenderingContext2DShim.property('lineWidth', {
      get: function() {
        return this.get('lineWidth');
      },
      set: function(lineWidth) {
        return this.set('lineWidth', lineWidth);
      }
    });

    CanvasRenderingContext2DShim.property('miterLimit', {
      get: function() {
        return this.get('miterLimit');
      },
      set: function(miterLimit) {
        return this.set('miterLimit', miterLimit);
      }
    });

    CanvasRenderingContext2DShim.property('shadowBlur', {
      get: function() {
        return this.get('shadowBlur');
      },
      set: function(shadowBlur) {
        return this.set('shadowBlur', shadowBlur);
      }
    });

    CanvasRenderingContext2DShim.property('shadowColor', {
      get: function() {
        return this.get('shadowColor');
      },
      set: function(shadowColor) {
        return this.set('shadowColor', shadowColor);
      }
    });

    CanvasRenderingContext2DShim.property('shadowOffsetX', {
      get: function() {
        return this.get('shadowOffsetX');
      },
      set: function(shadowOffsetX) {
        return this.set('shadowOffsetX', shadowOffsetX);
      }
    });

    CanvasRenderingContext2DShim.property('shadowOffsetY', {
      get: function() {
        return this.get('shadowOffsetY');
      },
      set: function(shadowOffsetY) {
        return this.set('shadowOffsetY', shadowOffsetY);
      }
    });

    CanvasRenderingContext2DShim.property('strokeStyle', {
      get: function() {
        return this.get('strokeStyle');
      },
      set: function(strokeStyle) {
        return this.set('strokeStyle', strokeStyle);
      }
    });

    CanvasRenderingContext2DShim.property('textAlign', {
      get: function() {
        return this.get('textAlign');
      },
      set: function(textAlign) {
        return this.set('textAlign', textAlign);
      }
    });

    CanvasRenderingContext2DShim.property('textBaseline', {
      get: function() {
        return this.get('textBaseline');
      },
      set: function(textBaseline) {
        return this.set('textBaseline', textBaseline);
      }
    });

    return CanvasRenderingContext2DShim;

  })();

  module.exports = CanvasRenderingContext2DShim;

}).call(this);
