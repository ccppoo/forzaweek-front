import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

function get_year_color(year: number): string {
  if (year < 1930) return '#AB933C';
  if (year < 1940) return '#345D98';
  if (year < 1950) return '#B38069';
  if (year < 1960) return '#68BBB8';
  if (year < 1970) return '#758C33';
  if (year < 1980) return '#CA7CD8';
  if (year < 1990) return '#287E9E';
  if (year < 2000) return '#E33056';
  if (year < 2010) return '#2BD566';
  if (year < 2020) return '#85e309';
  if (year < 2030) return '#093ce3';
  return '#1ed6d9';
}

export function YearCard({ year }: { year: number }) {
  const YEAR_COLOR = get_year_color(year);
  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
        minHeight: 25,
        backgroundColor: YEAR_COLOR,
        borderRadius: 1,
      }}
    >
      <Typography fontSize={15} fontWeight="fontWeightMedium" color="white">
        {year}
      </Typography>
    </FlexBox>
  );
}
