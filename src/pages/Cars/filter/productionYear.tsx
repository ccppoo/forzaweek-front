import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import useCarSearchFilters, { searchOptionMaxLength } from '@/store/carSearchFilters';

function ProductionYearCell({ name }: { name: string }) {
  const filterOption = 'productionYear';
  const [options, { toggleOption }] = useCarSearchFilters();
  const toggleProductionYearOption = (name: string) => toggleOption(name, filterOption);

  const checked = options.productionYear.includes(name);

  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        paddingX: 1,
        paddingY: 0.5,
        minWidth: 40,
        backgroundColor: checked ? '#dfe2e8' : null,
      }}
      component={ButtonBase}
      onClick={() => toggleProductionYearOption(name)}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function CarFilterProductionYearSummary() {
  const [options] = useCarSearchFilters();

  const optionName = 'Production Year';
  const tooManyOptions = options.productionYear.length > 4;
  const optionZeroSelected = options.productionYear.length == 0;
  const optionsAllSelected = options.productionYear.length == searchOptionMaxLength.productionYear;
  const optionsSelected = options.productionYear.length;
  const productionYearsSelected = options.productionYear.slice(
    0,
    tooManyOptions ? 4 : options.productionYear.length,
  );

  const summarizedSelection = `and ${options.productionYear.length - 4} more selected`;

  return (
    <FlexBox sx={{ justifyContent: 'flex-start', alignItems: 'center', columnGap: 1 }}>
      {optionZeroSelected ? (
        <FlexBox>
          <Typography>No option selected!</Typography>
        </FlexBox>
      ) : optionsAllSelected ? (
        <FlexBox>
          <Typography>
            Every Option selected (total {optionsSelected} {optionName}s)
          </Typography>
        </FlexBox>
      ) : (
        <>
          {productionYearsSelected.map((value) => {
            return (
              <FlexBox
                sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  border: '1px black solid',
                  borderRadius: 1,
                  paddingX: 0.5,
                }}
                key={`production-year-option-button-${value}`}
              >
                <Typography sx={{}}>{value}</Typography>
              </FlexBox>
            );
          })}
          {tooManyOptions && <Typography sx={{}}>{summarizedSelection}</Typography>}
        </>
      )}
    </FlexBox>
  );
}

export default function CarFilterProductionYear({
  productionYears,
}: {
  productionYears: string[];
}) {
  const filterOption = 'productionYear';

  const ProductionYear = 'Production Year';
  const RESET = 'reset';
  const CLEAR_ALL = 'clear all';

  const [options, { selectAllSingleOption, unselectAllSingleOption }] = useCarSearchFilters();
  const onClickReset = () => selectAllSingleOption(filterOption);
  const onClickClearAll = () => unselectAllSingleOption(filterOption);

  return (
    <Accordion defaultExpanded={false} disableGutters>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`panel-car-filter-${filterOption}`}
        id={`panel-car-filter-${filterOption}-header`}
      >
        <Typography sx={{ width: 180, flexShrink: 0 }} variant="h6">
          {ProductionYear}
        </Typography>
        <CarFilterProductionYearSummary />
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ paddingTop: 0.5, paddingBottom: 1 }}>
        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            rowGap: 1,
          }}
        >
          <FlexBox
            sx={{
              justifyContent: 'flex-end',
              columnGap: 1,
            }}
          >
            <Tooltip title="reset filter" placement="top">
              <Button variant="contained" size="small" onClick={onClickReset}>
                {RESET}
              </Button>
            </Tooltip>
            <Tooltip title="clear all filter" placement="top">
              <Button variant="contained" size="small" onClick={onClickClearAll}>
                {CLEAR_ALL}
              </Button>
            </Tooltip>
          </FlexBox>
          <FlexBox sx={{ columnGap: 0.8, rowGap: 1.2, flexWrap: 'wrap', paddingX: 1 }}>
            {productionYears.map((years) => (
              <ProductionYearCell name={years} key={`car-search-filter-production-year-${years}`} />
            ))}
          </FlexBox>
        </FlexBox>
      </AccordionDetails>
    </Accordion>
  );
}
