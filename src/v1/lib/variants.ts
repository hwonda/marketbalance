import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
