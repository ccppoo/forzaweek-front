import { getPrecision } from '@/utils/math';

export const rangeNumberInput = (
  newValue: string,
  min: number,
  max: number,
  step: number = 1,
  minMaxReversed: boolean = false,
): number => {
  let numberValue = 0;
  var value = newValue;
  value = value.replaceAll(/\.{2,}/g, '.');
  // 숫자, -, . 제외 제거
  if (!value.match(/^[0-9.-]+$/)) {
    const replaced = value.replace(/[^0-9.-]/g, '');
    value = replaced;
  }

  try {
    const sliderVal = Number.parseFloat(value);
    // console.log(`sliderVal : ${sliderVal}`);
    if (Number.isFinite(sliderVal)) {
      if (!minMaxReversed) {
        if (sliderVal < min) {
          numberValue = min;
          value = min.toString();
        } else if (sliderVal > max) {
          numberValue = max;
          value = max.toString();
        } else {
          numberValue = sliderVal;
        }
      }
      if (minMaxReversed) {
        if (sliderVal < max) {
          numberValue = max;
          value = max.toString();
        } else if (sliderVal > min) {
          numberValue = min;
          value = min.toString();
        } else {
          numberValue = min - sliderVal;
        }
      }
    }
    if (Number.isNaN(sliderVal)) {
      numberValue = 0;
    }
  } catch {
    // 소수점 입력 시작
    if (value.endsWith('.')) {
      const num = Number.parseFloat(value.substring(0, -1));
      numberValue = num;
    }
  }

  const inValidStep = getPrecision(numberValue) <= step - 1;
  if (!inValidStep) {
    numberValue = Number.parseFloat(numberValue.toFixed(getPrecision(step)));
  }

  return numberValue;
};
