import { SnakeCanvasDimensions } from "@/pages/Snake/utils/config";
import { IElement } from "@/types/draw";

interface IDraw {
  ctx: CanvasRenderingContext2D;
  elements: IElement[];
}

export const draw = ({ ctx, elements }: IDraw) => {
  ctx.clearRect(
    0,
    0,
    SnakeCanvasDimensions.width,
    SnakeCanvasDimensions.height
  );
  elements.forEach(({ color, dimensions, positions }) => {
    ctx.fillStyle = color;
    ctx.fillRect(positions.x, positions.y, dimensions.width, dimensions.height);
  });
};
