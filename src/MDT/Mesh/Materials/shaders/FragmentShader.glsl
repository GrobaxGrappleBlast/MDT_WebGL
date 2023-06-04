precision mediump float;

uniform vec3 fragColor;

void main(){
    //gl_FragColor = vec4(v_Position, 1.0);
    gl_FragColor = vec4(fragColor,1.0);
}
 