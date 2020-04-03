import {
  trigger,
  transition,
  style,
  animate,
  keyframes
} from "@angular/animations";

export const flicker = trigger("flicker", [
  transition("* => *", [
    animate(
      500,
      keyframes([
        style({
          transform: "translate(1rem, -0.2rem)",
          opacity: 0.1,
          offset: 0.1
        }),
        style({ transform: "translate(0, 0.2rem)", opacity: 0.6, offset: 0.2 }),
        style({
          transform: "translate(0.5rem, 0) skewX(6deg)",
          opacity: 0.9,
          offset: 0.5
        }),
        style({ transform: "translate(0, 0.5rem)", opacity: 0.2, offset: 0.7 })
      ])
    )
  ])
]);

export const slideIn = trigger("slideIn", [
  transition(":enter", [
    animate(
      "200ms ease-in",
      keyframes([
        style({
          width: "0",
          opacity: 0
        }),
        style({
          width: "50%",
          opacity: 1
        })
      ])
    )
  ]),
  transition(":leave", [
    animate(
      "200ms ease-out",
      keyframes([
        style({
          width: "50%",
          opacity: 1
        }),
        style({
          width: "0",
          opacity: 0
        })
      ])
    )
  ])
]);