precision mediump float;

uniform mat4 matrix_transform;
uniform mat4 matrix_view;
 
attribute vec3 vertPosition;
attribute vec3 vertColor;


void main(){
  
    mat4 m = mat4(
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    )
    gl_Position =  m * vec4(vertPosition, 1.0);
    //gl_Position = vec4(vertPosition,1.0);
}