import type { FieldArrayPath, FieldPath } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { I18nNameDependent } from '@/FormData/i18n';
import I18nInput from '@/components/FormInputs/i18n/I18nInput';
import { FlexBox } from '@/components/styled';

interface I18nTextInputIntf {
  basePath: string;
  required?: boolean;
}

export default function I18nTextInput<T extends I18nNameDependent>(props: I18nTextInputIntf) {
  const { basePath, required } = props;
  const formPath = basePath as FieldArrayPath<T>;
  const { control } = useFormContext<T>();
  const { fields: names } = useFieldArray({
    control,
    name: formPath,
  });

  const arrayFieldValuePath = (index: number) => `${basePath}.${index}.value` as FieldPath<T>;
  const arrayFieldLangPath = (index: number) => `${basePath}.${index}.lang` as FieldPath<T>;

  return (
    <FlexBox sx={{ alignItems: 'center', width: '100%' }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 1, width: '100%' }}>
        {names.map((field, index) => {
          return (
            <I18nInput<T>
              valuePath={arrayFieldValuePath(index)}
              langPath={arrayFieldLangPath(index)}
              key={`nation-input-value-${index}`}
              required={required}
            />
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}
