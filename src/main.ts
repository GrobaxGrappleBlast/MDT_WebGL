import { Core } from './MDT/Core';
import './style.css'  

var canvas = document.getElementById("canvas") as HTMLCanvasElement;
const engine : Core = new Core(canvas); 