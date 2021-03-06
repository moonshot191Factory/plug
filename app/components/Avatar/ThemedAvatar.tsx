import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  View,
  ViewProps
} from "react-native";

import { useTheme } from "../../theme";
import { isControlSize } from "../../theme/controlSize";
import { ControlSize, FillColor, FillColors } from "../../theme/Theme";
import { getOverrides, getStyle, WithOverrides } from "../../utils/Overrides";
import { Text, TextProps } from "../Typography";
import { dlv } from "app/utils/helpers";

interface AvatarBaseProps {
  /** The source attribute of the image. When it's not available, render initials instead. */
  source?: ImageSourcePropType;

  /**
   * The size of the avatar.
   * @default "medium"
   */
  size?: ControlSize | number;

  /**
   * The name used for the initials and title attribute.
   */
  name?: string;

  /**
   * When true, render a solid background when initials are used.
   * @default false
   */
  isSolid?: boolean;

  /**
   * The color used for the avatar.
   * @default "auto"
   */
  color?: "auto" | FillColor;

  /** Used to locate this view in end-to-end tests. */
  testID?: string;
}

export interface AvatarOverrides {
  Root: RootProps;
  Initials: InitialsProps;
  Image: ImageProps;
}

export interface AvatarProps
  extends WithOverrides<AvatarBaseProps, AvatarOverrides> {}

export const Avatar = (props: AvatarProps) => {
  const {
    source,
    name,
    size = "medium",
    isSolid = false,
    color = "auto",
    testID,
    overrides = {}
  } = props;

  const theme = useTheme();
  const [hasImageFailedLoading, setHasImageFailedLoading] = React.useState(
    false
  );
  const isImageUnavailable = !source || hasImageFailedLoading;

  const [Root, rootProps] = getOverrides(
    StyledRoot,
    props,
    { name, size, isSolid, color, testID },
    dlv(theme, "overrides.Avatar.Root"),
    overrides.Root
  );
  const [Initials, initialsProps] = getOverrides(
    StyledInitials,
    props,
    { name, size, isSolid, color },
    dlv(theme, "overrides.Avatar.Initial"),
    overrides.Initials
  );

  if (!isImageUnavailable && !!source) {
    const [ImageR, imageProps] = getOverrides(
      StyledImage,
      props,
      {
        onError: () => setHasImageFailedLoading(true),
        source
      },
      dlv(theme, "overrides.Avatar.Image"),
      overrides.Image
    );

    return (
      <Root {...rootProps}>
        <ImageR {...imageProps} />
      </Root>
    );
  }

  return (
    <Root {...rootProps}>
      <Initials {...initialsProps} />
    </Root>
  );
};

interface PropsWithChildren {
  children?: React.ReactNode;
}

export const hashCode = (s?: string) => {
  const str = String(s);
  let hash = 0;
  let char;
  if (str.trim().length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    // Convert to 32bit integer
    hash &= hash;
  }
  return Math.abs(hash);
};

export type AvatarColor = "automatic" | keyof FillColors;

const avatarScale: { [size in ControlSize]: number } = {
  large: 2,
  medium: 1.5,
  small: 1
};

interface RootProps extends ViewProps, PropsWithChildren {
  size: ControlSize | number;
  name?: string;
  isSolid: boolean;
  color: "auto" | FillColor;
}

const StyledRoot = (props: RootProps) => {
  const { testID, children, name, size, isSolid, color, style } = props;
  const theme = useTheme();
  const appearances = theme.fills[isSolid ? "solid" : "subtle"];
  const keys = Object.keys(appearances);

  const controlSize = isControlSize(size)
    ? theme.controlHeights[size] * avatarScale[size]
    : size;

  return (
    <View
      style={[
        {
          alignItems: "center",
          backgroundColor:
            appearances[
              color === "auto"
                ? (keys[hashCode(name) % keys.length] as keyof FillColors)
                : color
            ].backgroundColor,
          borderRadius: 9999,
          display: "flex",
          height: controlSize,
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          width: controlSize
        },
        style
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};

const getInitials = (name?: string, fallback = "?") => {
  if (!name) return fallback;

  return name
    .replace(/\s+/, " ")
    .split(" ") // Repeated spaces results in empty strings
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase()) // Watch out for empty strings
    .join("");
};

interface InitialsProps extends TextProps {
  size: ControlSize | number;
  name?: string;
  isSolid: boolean;
  color: "auto" | FillColor;
}

const StyledInitials = (props: InitialsProps) => {
  const { name, size, isSolid, color, style, ...textProps } = props;
  const theme = useTheme();

  const appearances = theme.fills[isSolid ? "solid" : "subtle"];
  const keys = Object.keys(appearances);

  const controlSize = isControlSize(size)
    ? theme.controlHeights[size] * avatarScale[size]
    : size;

  const initials = getInitials(name);

  return (
    <Text
      {...textProps}
      style={[
        {
          color:
            appearances[
              color === "auto"
                ? (keys[hashCode(name) % keys.length] as keyof FillColors)
                : color
            ].color,
          fontSize: controlSize / 2,
          lineHeight: controlSize
        },
        getStyle(props, style)
      ]}
    >
      {initials}
    </Text>
  );
};

const StyledImage = (props: ImageProps) => {
  const { style, ...imageProps } = props;

  return (
    <Image
      style={[
        {
          height: "100%",
          width: "100%"
        },
        style
      ]}
      {...imageProps}
    />
  );
};
