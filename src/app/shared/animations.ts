import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from "@angular/animations";

export const flicker = trigger("flicker", [
  transition("* => *", [
    animate(
      "200ms ease",
      keyframes([
        style({
          transform: "translate(1rem, -0.05rem)",
          opacity: 0.1,
          offset: 0.1,
        }),
        style({
          transform: "translate(0, 0.05rem)",
          opacity: 0.2,
          offset: 0.2,
        }),
        style({
          transform: "translate(0.1rem, 0) skewX(1deg)",
          opacity: 0.3,
          offset: 0.5,
        }),
        style({ transform: "translate(0, 0.1rem)", opacity: 0.1, offset: 0.7 }),
      ])
    ),
  ]),
]);

export const slideIn = trigger("slideIn", [
  transition(":enter", [
    animate(
      "200ms ease-in",
      keyframes([
        style({
          width: "0",
          opacity: 0,
        }),
        style({
          width: "50%",
          opacity: 1,
        }),
      ])
    ),
  ]),
  transition(":leave", [
    animate(
      "200ms ease-out",
      keyframes([
        style({
          width: "50%",
          opacity: 1,
        }),
        style({
          width: "0",
          opacity: 0,
        }),
      ])
    ),
  ]),
]);
