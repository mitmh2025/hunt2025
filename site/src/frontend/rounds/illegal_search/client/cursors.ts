import default_cursor_image from "../assets/cursors/default.png";
import draggable_cursor_image from "../assets/cursors/draggable.png";
import dragging_cursor_image from "../assets/cursors/dragging.png";
import move_down_cursor_image from "../assets/cursors/move-down.png";
import move_left_cursor_image from "../assets/cursors/move-left.png";
import move_right_cursor_image from "../assets/cursors/move-right.png";
import move_up_cursor_image from "../assets/cursors/move-up.png";
import zoom_cursor_image from "../assets/cursors/zoom.png";

export const default_cursor = `url('${default_cursor_image}') 14 3, auto`;
export const draggable_cursor = `url('${draggable_cursor_image}') 16 16, grabbing`;
export const dragging_cursor = `url('${dragging_cursor_image}') 16 16, grabbing`;
export const move_up_cursor = `url('${move_up_cursor_image}') 0 0, n-resize`;
export const move_down_cursor = `url('${move_down_cursor_image}') 0 0, s-resize`;
export const move_left_cursor = `url('${move_left_cursor_image}') 0 0, w-resize`;
export const move_right_cursor = `url('${move_right_cursor_image}') 0 0, e-resize`;
export const zoom_cursor = `url('${zoom_cursor_image}') 9 9, zoom-in`;
