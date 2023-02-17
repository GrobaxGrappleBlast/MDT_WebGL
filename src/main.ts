import { Core } from './MDT/Core';
import './style.css' 

var canvas = document.getElementById("canvas");
const engine : Core = new Core(canvas as HTMLCanvasElement);
engine.StartMDT();