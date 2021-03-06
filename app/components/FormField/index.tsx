import React from "react";
import { View, ViewProps } from "react-native";

import { useTheme } from "app/theme";
import { getOverrides, getStyle, WithOverrides } from "app/utils/Overrides";
import { OptionalString } from "app/utils/types";
import {
  Label,
  LabelPosition,
  LabelProps,
  Text,
  TextProps,
} from "../Typography";

import { dlv } from "app/utils/helpers";
import { Colors } from "app/config/styles";
interface FormFieldBaseProps {
  /**
   * Error message of the field
   */
  error?: OptionalString;

  /**
   * Label of the field.
   */
  label?: OptionalString;

  /**
   * Position of the field.
   * @default "top"
   */
  labelPosition?: LabelPosition;

  /**
   * Description of the field.
   */
  description?: OptionalString;

  /** Content to wrap FormField with. */
  children?: React.ReactNode;
}

export interface FormFieldOverrides {
  Root: RootProps;
  Label: LabelProps;
  Description: DescriptionProps;
  Error: ErrorProps;
}

export interface FormFieldProps
  extends WithOverrides<FormFieldBaseProps, FormFieldOverrides> {}

export const FormField = (props: FormFieldProps) => {
  const {
    label,
    error,
    children,
    description,
    labelPosition = "top",
    overrides = {},
  } = props;
  const theme = useTheme();

  const [Root, rootProps] = getOverrides(
    StyledRoot,
    props,
    {},
    dlv(theme, "overrides.FormField.Root"),
    overrides.Root
  );
  const [LabelR, labelRProps] = getOverrides(
    Label,
    props,
    { label, position: labelPosition },
    dlv(theme, "overrides.FormField.Label"),
    overrides.Label
  );
  const [Description, descriptionProps] = getOverrides(
    StyledDescription,
    props,
    { description },
    dlv(theme, "overrides.FormField.Description"),
    overrides.Description
  );
  const [ErrorR, errorProps] = getOverrides(
    StyledError,
    props,
    { error },
    dlv(theme, "overrides.FormField.Error"),
    overrides.Error
  );

  return (
    <Root {...rootProps}>
      <LabelR {...labelRProps}>{children}</LabelR>
      <Description {...descriptionProps} />
      <ErrorR {...errorProps} />
    </Root>
  );
};

interface PropsWithChildren {
  children?: React.ReactNode;
}

interface RootProps extends ViewProps, PropsWithChildren {}

const StyledRoot = (props: RootProps) => {
  const { children, style, ...viewProps } = props;

  return (
    <View style={[style]} {...viewProps}>
      {children}
    </View>
  );
};

interface DescriptionProps extends TextProps, PropsWithChildren {
  description?: OptionalString;
}

const StyledDescription = (props: DescriptionProps) => {
  const { children, style, description, ...viewProps } = props;

  if (!description) return null;

  return (
    <Text
      color="muted"
      style={[
        {
          paddingBottom: 4,
        },
        getStyle(props, style),
      ]}
      {...viewProps}
    >
      {description}
    </Text>
  );
};

interface ErrorProps extends TextProps, PropsWithChildren {
  error?: OptionalString;
}

const StyledError = (props: ErrorProps) => {
  const { children, style, error, ...viewProps } = props;

  if (!error) return null;

  return (
    <Text style={[getStyle(props, style)]} color="danger" {...viewProps}>
      {error}
    </Text>
  );
};
