import { ResponseType } from "./store/resDataState";

document.body.style.backgroundColor = "pink";

chrome.runtime.sendMessage(
  { type: "content", item: "どうしたらいい？" },
  (res: ResponseType) => {
    if (res.isDom) {
      const html = document.getElementsByTagName("html");
      //hateDiv
      // const hateDiv = document.createElement("div");
      // hateDiv.innerHTML = "<h1 style={font-weight:bold;}>閲覧規制中</h1>";
      // hateDiv.style.width = "100%";
      // hateDiv.style.height = "100%";
      // hateDiv.style.backgroundColor = "#00A0E9";
      // hateDiv.id = "hate";
      // html[0].appendChild(hateDiv);
      //canvas
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 600;
      canvas.style.backgroundColor = "#00A0E9";
      canvas.id = "canvas";
      html[0].appendChild(canvas);
      const script = document.createElement("script");
      script.src = "https://code.createjs.com/1.0.0/createjs.min.js";
      document.head.appendChild(script);
      document.head.insertAdjacentHTML("beforeend", canvasStyle);

      //createJs
      createJs(canvas);
      alert(res.isDom);
    } else {
      alert(res.isDom);
    }
  }
);

const canvasStyle = `
<style>
canvas#canvas {
  position: fixed;
  top: 0;
  opacity: 0.5;
  z-index: 10;
}
</style>
`;

const createJs = (canvas: HTMLCanvasElement) => {
  const stage = new createjs.Stage(canvas);
  const shape = new createjs.Shape();
  shape.graphics
    .beginFill("#ff0000")
    .drawCircle(canvas.width / 2, canvas.height / 2, 40);
  stage.addChild(shape);
  stage.update();
};
