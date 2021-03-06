import ZocialIcon from "react-native-vector-icons/Zocial";
import OcticonIcon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";

export type IconType =
  | "material"
  | "material-community"
  | "simple-line-icon"
  | "zocial"
  | "font-awesome"
  | "octicon"
  | "ionicon"
  | "foundation"
  | "evilicon"
  | "entypo"
  | "antdesign"
  | "feather";

const customIcons: Record<string, any> = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export default (type: IconType) => {
  switch (type) {
    case "zocial":
      return ZocialIcon;
    case "octicon":
      return OcticonIcon;
    case "material":
      return MaterialIcon;
    case "material-community":
      return MaterialCommunityIcon;
    case "ionicon":
      return Ionicon;
    case "foundation":
      return FoundationIcon;
    case "evilicon":
      return EvilIcon;
    case "entypo":
      return EntypoIcon;
    case "font-awesome":
      return FAIcon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "feather":
      return FeatherIcon;
    case "antdesign":
      return AntIcon;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      return MaterialIcon;
  }
};
