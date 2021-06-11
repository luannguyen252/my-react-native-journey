import { MAX_SPEED, SPEED_CHART_MAX_LENGTH } from '../config/config';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { convertMetersPerSecondToKilometersPerHour, convertMetersPerSecondToMilesPerHour } from '../util/convert-units';

import { MultiLineChart } from 'react-native-d3multiline-chart';
import PropTypes from 'prop-types';
import { UNIT_MEASUREMENT } from '../ducks/unit-measurement';
import { Variables } from '../assets/styles/variables';
import _ from 'lodash';

const styles = StyleSheet.create({
    background: {
        backgroundColor: Variables.colors.primaryDark,
        borderRadius: Variables.border.radius,
        position: 'relative'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Variables.spacer.base
    },
    chart: { marginLeft: - Variables.spacer.base / 2 - 3 },
    text: {
        backgroundColor: 'transparent',
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.small,
        lineHeight: Variables.lineHeights.small,
        position: 'absolute',
        right: Variables.spacer.base / 4
    }
});

export class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = { speedData: Array.from(Array(SPEED_CHART_MAX_LENGTH)).fill(0) };

        this.convertValue = this.convertValue.bind(this);
        this.formatSpeedDataForChart = this.formatSpeedDataForChart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { speed } = nextProps;
        const { speedData } = this.state;

        let updatedSpeedData = speedData;
        updatedSpeedData.push(speed);

        if (speedData.length > SPEED_CHART_MAX_LENGTH) updatedSpeedData.shift();

        this.setState({ speedData: updatedSpeedData });
    }

    convertValue(value) {
        const { unit } = this.props;
        const conversion = unit === UNIT_MEASUREMENT.KILOMETERS ? convertMetersPerSecondToKilometersPerHour : convertMetersPerSecondToMilesPerHour;

        return conversion(value);
    }

    formatSpeedDataForChart() {
        const { speedData } = this.state;

        const result = speedData.map((speed, index) => {
            return { 'y': this.convertValue(speed), 'x': index };
        });

        return result;
    }

    render() {
        const { style, speed, topSpeed } = this.props;

        const chartMax = topSpeed > (MAX_SPEED / 3) ? topSpeed : (MAX_SPEED / 3);
        // const chartMax = MAX_SPEED;
        // const color = Variables.colors.secondary.mix(Variables.colors.warning, speed / chartMax);
        const color = Variables.colors.secondary;
        const graphHeight = 100;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.background}>
                    <Text style={[styles.text, { top: Variables.spacer.base / 4 }]}>{Math.ceil(this.convertValue(chartMax))}</Text>
                    <Text style={[styles.text, { top: (graphHeight / 2) - (Variables.lineHeights.small / 2) }]}>{Math.ceil(this.convertValue(chartMax / 2))}</Text>
                    <Text style={[styles.text, { bottom: Variables.spacer.base / 4 }]}>0</Text>
                    <View style={styles.chart}>
                        <MultiLineChart
                            Color={[color.string()]}
                            GraphHeight={graphHeight}
                            GraphWidth={Variables.device.width - Variables.spacer.base * 1.5}
                            chartHeight={graphHeight + 5}
                            chartWidth={Variables.device.width - (Variables.spacer.base * 1.5)}
                            data={[this.formatSpeedDataForChart()]}
                            dataPointsVisible={false}
                            hideAxis
                            hideXAxisLabels
                            hideYAxisLabels
                            lineWidth={Variables.border.width}
                            maxX={SPEED_CHART_MAX_LENGTH}
                            maxY={this.convertValue(chartMax)}
                            minX={0}
                            minY={0}
                            scatterPlotEnable={false}
                            showLegends={false}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

LineChart.defaultProps = {
    unit: UNIT_MEASUREMENT.MILES
};

LineChart.propTypes = {
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    topSpeed: PropTypes.number,
    unit: PropTypes.number
};
