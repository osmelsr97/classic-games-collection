import { SnakeCanvasDimensions } from "@/pages/Snake/utils/config";
import { IElement } from "@/types/draw";

interface IDraw {
  ctx: CanvasRenderingContext2D;
  elements: IElement[];
}
interface IDrawCustomElement {
  ctx: CanvasRenderingContext2D;
  element: IElement;
}

export const draw = ({ ctx, elements }: IDraw) => {
  ctx.clearRect(
    0,
    0,
    SnakeCanvasDimensions.width,
    SnakeCanvasDimensions.height
  );
  elements.forEach((element) => {
    if (element?.isEmoticon)
      drawEmoticon({
        ctx,
        element,
      });
    else {
      ctx.fillStyle = element.color;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.fillRect(
        element.positions.x,
        element.positions.y,
        element.dimensions.width,
        element.dimensions.height
      );
      ctx.strokeRect(
        element.positions.x,
        element.positions.y,
        element.dimensions.width,
        element.dimensions.height
      );
    }
  });
};

const drawEmoticon = ({ ctx, element }: IDrawCustomElement) => {
  if (!element?.emoticon) return;
  const { color, positions, fontSize = 16, emoticon } = element;
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(emoticon, positions.x, positions.y);
};
