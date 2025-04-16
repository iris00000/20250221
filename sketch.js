let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3],[2,-6],[-2,-3],[-4,-2],[-5,-1],[-6,1],[-6,-2]];
let fishImages = [];
let fishPositions = [];
let fishSpeeds = [];
let song;
let amplitude;

function preload() {
  for (let i = 1; i <= 10; i++) {
    fishImages.push(loadImage(`assets/fish${i}.png`));
  }
  song = loadSound('assets/midnight-quirk-255361.mp3'); // 載入音樂檔案
}

function setup() { //設定
  //一個充滿視窗的畫布
  createCanvas(windowWidth, windowHeight); //視窗大小
  for (let i = 0; i < 10; i++) {
    fishPositions.push(createVector(random(width), random(height)));
    fishSpeeds.push(createVector(random(-2, 2), random(-2, 2)));
  }
  song.loop(); // 讓音樂循環播放
  amplitude = new p5.Amplitude(); // 創建振幅分析物件
}

function draw() { //畫
  background("#e3d5ca"); //背景顏色只有一個顏色，所以只有一個參數
  //畫一個有顏色的圓。框線為黃色，圓的顏色為紅色，框線粗細為5
  stroke("#003049");//框線
  fill("#d8e2dc");//圓的顏色
  strokeWeight(5);//框線粗細
  ellipse(200, 200, 100, 100);//
  //在上一個圓的上方左右兩邊各畫一個圓，圓跟圓的框線貼齊
  ellipse(150, 150, 50, 50);
  ellipse(250, 150, 50, 50);

  translate(width / 2, height / 2); // 移動畫布原點到中心
  strokeWeight(2);
  fill("#d8e2dc"); // 填充顏色
  let level = amplitude.getLevel(); // 獲取當前音樂的振幅
  let size = map(level, 0, 1, 20, 100); // 將振幅映射到圖形大小

  beginShape();
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0] * size;
    let y = points[i][1] * size;
    vertex(x, y);
  }
  endShape(CLOSE);
  for (let i = 0; i < points.length - 1; i++) {
    let x1 = points[i][0] * size;
    let y1 = points[i][1] * size;
    let x2 = points[i + 1][0] * size;
    let y2 = points[i + 1][1] * size;
    line(x1, y1, x2, y2);
  }
  // 串聯第一個點和最後一個點
  let x1 = points[points.length - 2][0] * size;
  let y1 = points[points.length - 2][1] * size;
  let x2 = points[0][0] * size;
  let y2 = points[0][1] * size;
  line(x1, y1, x2, y2);

  // 繪製並移動魚
  for (let i = 0; i < fishImages.length; i++) {
    image(fishImages[i], fishPositions[i].x, fishPositions[i].y, 150, 150); // 將魚的大小設為 150x150
    fishPositions[i].add(fishSpeeds[i]);

    // 確保魚在畫布內移動
    if (fishPositions[i].x < 0 || fishPositions[i].x > width) {
      fishSpeeds[i].x *= -1;
    }
    if (fishPositions[i].y < 0 || fishPositions[i].y > height) {
      fishSpeeds[i].y *= -1;
    }
  }
}