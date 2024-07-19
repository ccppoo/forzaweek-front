import ReactApexChart from 'react-apexcharts';
import { useFormContext } from 'react-hook-form';

import type { TuningEditSchema } from '@/FormData/tuning';
import type { PerformanceTrait } from '@/types/car';

import { chartOption2 } from './chartOption';

export default function PerformanceRadarChart() {
  const performanceTraits: PerformanceTrait[] = [
    'acceleration',
    'speed',
    'braking',
    'offroad',
    'launch',
    'handling',
  ];

  const { watch } = useFormContext<TuningEditSchema>();

  const performanceValue = performanceTraits.map(
    (perfName) => watch('performance')[perfName],
  ) as number[];

  const series = {
    name: 'performance',
    data: [...performanceValue],
  };

  const RADAR_CHART_WIDTH = 500;
  const RADAR_CHART_HEIGHT = 450;

  return (
    <ReactApexChart
      series={[series]}
      options={chartOption2}
      width={RADAR_CHART_WIDTH}
      height={RADAR_CHART_HEIGHT}
      type="radar"
      id={`tuning-detail-radar-chart-${1}`}
    />
  );
}
