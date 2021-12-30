import React, { useRef } from "react";
import { View, StyleSheet, Dimensions, Image} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  interpolate,
  Extrapolate
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import { AuthNavigationProps } from "../../components/Navigation";
import { Theme, makeStyles, useTheme } from "../../components/Theme";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";
import Dot from "./Dot";

const { width } = Dimensions.get("window");
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopLeftRadius: theme.borderRadii.xl,
    overflow: "hidden"
},
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomEndRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const slides = [
  {
      title: "Relaxed",
      color: "#BFEAF5",
      subtitle: 'Find Your Outfit',
      description: "Confused about your outfit? Don't worry! Find the best outfit here!",
      picture: {
          src: require("./assets/1.png"),
          width: 730,
          height: 1095
      },
  },
  {
      title: "Playfull",
      color: "#BEECC4",
      subtitle: 'Hear it First, Wear it First',
      description: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
      picture: {
          src: require("./assets/2.png"),
          width: 690,
          height: 1070
      },
  },
  {
      title: "Excentric",
      color: "#FFE4D9",
      subtitle: 'Your Style, Your Way',
      description: 'Create your individual & unique style and look amazing everyday',
      picture: {
          src: require("./assets/3.png"),
          width: 730,
          height: 1095
      },
  },
  {
      title: "Funky",
      color: "#FFDDDD",
      subtitle: 'Look Good, Feel Good',
      description: 'Discover the latest trends in fashion and explore your personality',
      picture: {
          src: require("./assets/4.png"),
          width: 616,
          height: 898
      }
  },
]

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
  const theme = useTheme();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    )
  );
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const currentIndex = useDerivedValue(() => x.value / width);
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        {slides.map(({picture}, index) => {
            const style = useAnimatedStyle(() => ({
              opacity: interpolate(
                x.value,
                [(index - 0.5) * width, index * width, (index + 0.5) * width],
                [0, 1, 0],
                Extrapolate.CLAMP
              ),
            }));
            return (
                <Animated.View key={index} style={[styles.underlay, style]}>
                    <Image source={picture.src} style={{
                        width: width - theme.borderRadii.xl,
                        height: ((width - theme.borderRadii.xl) * picture.height) / picture.width,
                }} />
                </Animated.View>
            );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, background]} />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                width: width * slides.length,
              },
              footerStyle,
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll.current?.scrollTo({
                        x: width * (index + 1),
                        animated: true });
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
