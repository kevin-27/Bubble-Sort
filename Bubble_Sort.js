//Bubble Sort
//Kevin P. Mulcahy

let data = [];
let index = 0;
let indexLimiter = 0;
let speedCtrl;
let swapCounter = 0;
let comparCounter = 0;

function setup() 
{
  //Center the canvas
  let W = 1080;
  let H = 720;
  let centerW = windowWidth/2-W/2;
  let centerH = windowHeight/2-H/2;
  
  let cnv = createCanvas(W, H);
  cnv.position(centerW, centerH);

  //frameRate(60);
  
  //Create Slider and Button
  speedCtrl = createSlider(1, 10, 0);
  speedCtrl.position(centerW + 20, centerH + 20);
  
  button = createButton('Reset');
  button.position(centerW + 200, centerH + 20);
  button.mousePressed(ResetData);

  //Create data to sort
  for (let i = 0; i < width/10; i++)
  {
    let num = random(5, 600);
    data[i] = new Block(0 + i*10, height - num, 10, num);
  }
  
  //Sort5();
}

function draw() 
{
  background(0);
  
  textSize(16);
  fill(255);
  text('Swaps - ' + swapCounter, 20, 75);
  text('Comparisons  - ' + comparCounter, 20, 100);
  
  //Render the data Blocks
  for (let i = 0; i < data.length; i++) 
    data[i].render();
    
  //Sort1();
  //Sort2();
  //Sort3();
  Sort4();
}

function ResetData()
{
  for (let i = 0; i < width/10; i++)
  {
    let num = random(5, 600);
    data[i].h = num;
    data[i].y = height - num;
  }
  index = 0;
  indexLimiter = 0;
  swapCounter = 0;
  comparCounter = 0;
}

//First Attempt 
function Sort1()
{ 
  for (let i = 0; i < data.length-1; i++) 
    if (data[i].h > data[i+1].h)    
      Swap(i, i+1)      
}

//Second Attempt
function Sort2()
{
  for (let i = 0; i < data.length; i++)
    for (let p = 0; p < data.length-i-1; p++)
      if (data[p].h > data[p+1].h)
        Swap(p, p+1)
}

//First Attempt to slow it down
function Sort3()
{
  if (data[index].h > data[index+1].h)
    Swap(index, index+1) 
  
  index++;

  if (index >= data.length-1)
    index = 0;
}

//Second Attempt to slow down
//speed controls how many swaps are done per frame.
//indexLimiter prevents checking for swaps on already sorted data
function Sort4()
{
  let speed = speedCtrl.value();
  
  for (let i = index; i < speed+index; i++)    
    if (i < data.length-1)
      {
        if (indexLimiter < data.length)
          comparCounter++;
        
        if (data[i].h > data[i+1].h)       
          Swap(i, i+1)   
      }
        
  index += speed;

  if (index >= data.length-1-indexLimiter)
  {    
    index = 0;
    indexLimiter++;
  }
}

//Sort2 using async and await with a delay function
//Same speed as Sort3 at lowest setting
async function Sort5()
{
  for (let i = 0; i < data.length; i++)
    for (let p = 0; p < data.length-i-1; p++)
      if (data[p].h > data[p+1].h)
        await Swap2(p, p+1)
}

function Swap(a, b)
{
  swapCounter++;
  
  let tempH = data[a].h;
  data[a].h = data[b].h;
  data[b].h = tempH;

  let tempY = data[a].y;
  data[a].y = data[b].y;
  data[b].y = tempY;
}

//For Sort5
async function Swap2(a, b)
{
  await sleep(1);
  swapCounter++;
  
  let tempH = data[a].h;
  data[a].h = data[b].h;
  data[b].h = tempH;

  let tempY = data[a].y;
  data[a].y = data[b].y;
  data[b].y = tempY;
}

class Block
{  
  constructor(x, y, w, h) 
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  render()
  {
    //fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

//Delay
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}