import { showMessage } from "react-native-flash-message";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export const showAlert = (type, message, description, onClose) => {
  showMessage({
    position: 'bottom',
    icon: "auto",
    style: {
      borderRadius: SIZES.radius1,
      marginBottom: SIZES.padding,
      marginHorizontal: SIZES.padding2,
    },
    message: message,
    description: description,
    type: type,
    onClose: onClose,
    // backgroundColor: type == "success" && COLORS.primary,
    duration: 3000,
    titleStyle: {
      ...FONTS.body3,
    },
  });
};
