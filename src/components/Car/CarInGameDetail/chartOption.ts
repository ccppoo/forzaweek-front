import { ApexOptions } from 'apexcharts';

export const chartOptions: ApexOptions = {
  chart: {
    type: 'radar',
    toolbar: {
      show: false,
    },
    events: {
      // mounted: (chart) => {
      //   chart.windowResizeHandler();
      // },
    },
    redrawOnParentResize: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radar: {
      size: 45,
      offsetY: 1,
    },
  },
  tooltip: {
    enabled: false,
  },
  yaxis: {
    min: 0,
    max: 10,
    stepSize: 2,
    tooltip: {
      enabled: false,
    },
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    show: false,
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
    labels: {
      show: false,
    },
  },

  fill: {
    opacity: 0.5,
  },
};
