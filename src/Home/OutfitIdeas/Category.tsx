import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Box, Text } from "../../components";
import { BorderlessButton } from 'react-native-gesture-handler';

interface CategoryProps {
    category: {
        id: string;
        title: string;
        color: string;
    };
    }

    const OUTER_RADIUS = 34;
    const INNER_RADIUS = 30;

    const Category = ({ category: { color: backgroundColor, title } }: CategoryProps) => {
    const [selected, setSelected] = useState(false);

    return (
        <BorderlessButton
            onPress={() => setSelected((prevState) => !prevState)}
        >
            <Box marginLeft="m" marginTop="s" alignItems="center" >
                <Box
                    justifyContent="center"
                    alignItems="center"
                    width={OUTER_RADIUS * 2}
                    height={OUTER_RADIUS * 2}
                >
                    {
                        selected && (
                            <View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    borderRadius: OUTER_RADIUS,
                                    borderColor: backgroundColor,
                                    borderWidth: 2
                                }}
                            />
                        )
                    }
                    <View
                        style={{
                            width: INNER_RADIUS * 2,
                            height: INNER_RADIUS * 2,
                            borderRadius: INNER_RADIUS,
                            backgroundColor
                        }}
                    />
                </Box>
                <Text textAlign="center" marginTop="s">{title}</Text>
            </Box>
        </BorderlessButton>
    );
};

export default Category;
