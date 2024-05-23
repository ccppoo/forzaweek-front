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

function ManufacturerCell({ name }: { name: string }) {
  const optionName = 'manufacturer';

  const [options, { toggleOption }] = useCarSearchFilters();
  const toggleManufacturerOption = (name: string) => toggleOption(name, optionName);

  const checked = options.manufacturer.includes(name);

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
      onClick={() => toggleManufacturerOption(name)}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function ManufacturerFilterCharacter({
  char,
  manufacturer,
}: {
  char: string;
  manufacturer: string[];
}) {
  const FIRST_CHAR = char.toLocaleLowerCase();

  return (
    <FlexBox sx={{ width: '100%', paddingY: 0.2 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
        <Typography variant="h5">{char.toUpperCase()}</Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, rowGap: 1, flexWrap: 'wrap', paddingX: 1 }}>
        {manufacturer
          .filter((value) => value.toLocaleLowerCase().startsWith(FIRST_CHAR))
          .map((name) => (
            <ManufacturerCell name={name} key={`manufacturer-select-item-${name}`} />
          ))}
      </FlexBox>
    </FlexBox>
  );
}

function CarFilterManufacturerSummary() {
  const [options] = useCarSearchFilters();

  const optionName = 'manufacturer';
  const tooManyOptions = options.manufacturer.length > 4;
  const optionZeroSelected = options.manufacturer.length == 0;
  const optionsAllSelected = options.manufacturer.length == searchOptionMaxLength.manufacturer;
  const optionsSelected = options.manufacturer.length;
  const manufacturerSelected = options.manufacturer.slice(
    0,
    tooManyOptions ? 4 : options.manufacturer.length,
  );

  const summarizedSelection = `and ${options.manufacturer.length - 4} more selected`;

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
          {manufacturerSelected.map((value) => {
            return (
              <FlexBox
                sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  border: '1px black solid',
                  borderRadius: 1,
                  paddingX: 0.5,
                }}
                key={`manufacturer-option-button-${value}`}
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

export default function CarFilterManufacturer({ manufacturers }: { manufacturers: string[] }) {
  const filterOption = 'manufacturer';

  const Title = 'Manufacturer';
  const RESET = 'reset';
  const CLEAR_ALL = 'clear all';

  const manu_characters = [...new Set<string>([...manufacturers.map((name) => name[0])])].slice(
    0,
    10,
  );

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
          {Title}
        </Typography>
        <CarFilterManufacturerSummary />
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
          <FlexBox sx={{ columnGap: 1, rowGap: 1.2, flexWrap: 'wrap', paddingX: 1 }}>
            {manu_characters.map((value) => (
              <ManufacturerFilterCharacter
                char={value}
                manufacturer={manufacturers}
                key={`car-filter-manufacturer-${value}`}
              />
            ))}
          </FlexBox>
        </FlexBox>
      </AccordionDetails>
    </Accordion>
  );
}
