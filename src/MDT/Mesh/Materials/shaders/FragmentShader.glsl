precision mediump float;

uniform vec3 fragColor;
uniform vec2 screenSize;
uniform mat4 matrix_view;

varying vec3 fVertPosition;  // Assuming this is passed from the vertex shader
varying vec3 fragNormals; 

const int numVertices = 0; // Update this value with the actual number of vertices

 
 
void main() { 
    gl_FragColor = vec4(fragColor, 1.0);
}
