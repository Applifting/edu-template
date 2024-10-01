import { Switch, type SwitchProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type SwitchFieldProps = FormFieldBaseProps<SwitchProps>;

export function SwitchField({ id, name, ...switchProps }: SwitchFieldProps) {
  return (
    <FormField id={id} name={name} isRequired={switchProps.isRequired}>
      {({ value, ...field }) => (
        <Switch isChecked={value} {...switchProps} {...field} />
      )}
    </FormField>
  );
}
