precision mediump float;


uniform vec2 u_tex_size;
uniform sampler2D u_framebuffer;
 
void main() {
 
  float width   = gl_FragCoord.x / u_tex_size.x ;
  float height  = gl_FragCoord.y / u_tex_size.y ;

  vec2 texCoord = vec2( width , height );
  gl_FragColor = texture2D(u_framebuffer, texCoord);
}