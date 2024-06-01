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
  },
  plotOptions: {
    radar: {
      size: 160,
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
      formatter: (value) => {
        return '';
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
    labels: {
      style: {
        colors: '#050505',
        fontWeight: 500,
        fontSize: '18px',
      },
      offsetY: -2,
    },
  },

  fill: {
    opacity: 0.5,
  },
};

export const smallChartOptions: ApexOptions = {
  chart: {
    type: 'radar',
    toolbar: {
      show: false,
    },
    events: {
      mounted: (chart) => {
        chart.windowResizeHandler();
      },
    },
    redrawOnParentResize: true,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    radar: {
      size: 80,
    },
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
      formatter: (value) => {
        return '';
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
    labels: {
      style: {
        colors: '#050505',
        fontWeight: 600,
        fontSize: '10px',
      },
      offsetY: -1,
    },
  },

  fill: {
    opacity: 0.5,
  },
};
