import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const SIZES = {
    xSmall:10,
    small:12,
    medium:16,
    large:20,
    xLarge:24,
    xxLarge:44,
    width:windowWidth,
    height:windowHeight
}