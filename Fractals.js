"use strict";

var gl;
var theta = 0.0;
var thetaLoc;
var color = vec4(0.0, 0.0, 1.0, 1.0); // Default color: blue
var colorLoc;
var delay = 100;
var rotation = true;

init();

function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(0.00, 1.00),
        vec2(-0.87, -0.50),
        vec2(0.87, -0.50)
    ];

    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate shader variables with the data buffer
    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    thetaLoc = gl.getUniformLocation(program, "uTheta");
    colorLoc = gl.getUniformLocation(program, "aColor");


    // Set up texture coordinates
    var texCoords = [
        vec2(0.5, 0.0), // Top
        vec2(0.0, 1.0), // Bottom left
        vec2(1.0, 1.0)  // Bottom right
    ];

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW);

    var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texCoordLoc);

        // Set up texture
        var image = document.getElementById("texImage");
        configureTexture(image);

        thetaLoc = gl.getUniformLocation(program, "uTheta");

        window.onkeydown = event => {
            var key = String.fromCharCode(event.keyCode);
            switch (key) {
                case '1':
                    configureTexture(image);
                    break;
                case '2':
                    color = vec4(1.0, 0.0, 0.0, 1.0); // Red
                    break;
                case '3':
                    color = vec4(0.0, 1.0, 0.0, 1.0); // Green
                    break;
            }
        };
    
        render();

    };



function configureTexture(image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Set the texture unit
    var texLoc = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), "uTextureMap");
    gl.uniform1i(texLoc, 0);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    theta += (rotation ? 0.1 : 0.0);
    gl.uniform1f(thetaLoc, theta);

    // Apply color
    gl.uniform4fv(colorLoc, color);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Request the next frame
    setTimeout(function () { requestAnimationFrame(render); }, delay);
}
