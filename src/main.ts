import { Core } from './MDT/Core';
import './style.css'  

document.addEventListener('DOMContentLoaded', async () => {  

    await delay(1000);
    const test = document.getElementById("canvas"); 
    console.log("STOP HER");
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const engine : Core = new Core(canvas); 
 
});
function delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  