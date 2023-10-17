'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const id = React.useId()
  const [timer, setTimer] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (!timer) {
      return;
    }
    const startCounter = window.setInterval(() => {
      setSeconds((currentVal) => currentVal + 1);
    }, 1000);
    return () => {
      window.clearInterval(startCounter);
    };
  }, [timer]);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[seconds % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`colors-${id}`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{seconds}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              setTimer(!timer);
            }}
          >
            {timer ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setTimer(false);
              setSeconds(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>{!timer ? 'Play' : 'Pause'}</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
