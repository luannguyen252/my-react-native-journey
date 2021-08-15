import { View, ListView, Image, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Column from './Column';
import styles from '../styles/main';

// assignObjectColumn :: Number -> [Objects] -> [Objects]
export const assignObjectColumn = (nColumns, index, targetObject) => ({...targetObject, ...{ column: index % nColumns }});

// assignObjectIndex :: (Number, Object) -> Object
// Assigns an `index` property` from bricks={data}` for later sorting.
export const assignObjectIndex = (index, targetObject) => ({...targetObject, ...{ index }});

// containMatchingUris :: ([brick], [brick]) -> Bool

export default class Masonry extends Component {
	static propTypes = {
		bricks: PropTypes.array,
		columns: PropTypes.number,
		sorted: PropTypes.bool,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object,
		spacing: PropTypes.number,
		refreshControl: PropTypes.element
	};

	static defaultProps = {
		bricks: [],
		columns: 2,
		sorted: false,
		imageContainerStyle: {},
		spacing: 1
	};

	constructor(props) {
		super(props);
		// Assuming users don't want duplicated images, if this is not the case we can always change the diff check
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => true });
		this.state = {
			dataSource: this.ds.cloneWithRows([]),
			dimensions: {},
			initialOrientation: true,
			_sortedData: [],
			_resolvedData: [],
		};
		// Assuming that rotation is binary (vertical|landscape)
		Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })))
	}

	componentDidMount() {
		this.resolveBricks(this.props);
	}

	componentWillReceiveProps(nextProps) {
        this.resolveBricks(nextProps);
	}

	resolveBricks({ bricks, columns }) {
		//console.log(bricks, bricks.length);

		// Sort bricks and place them into their respectable columns
		this.setState({dataSource: this.ds.cloneWithRows([]),
            _sortedData: [],
            _resolvedData: []});

		const sortedBricks = bricks
			  .map((brick, index) => assignObjectColumn(columns, index, brick))
			.map((brick, index) => assignObjectIndex(index, brick));

		//console.log('sortedBrick', sortedBricks)

		// Do a difference check if these are new props
		// to only resolve what is needed
		const unresolvedBricks = sortedBricks;

		unresolvedBricks.map(brick => {
			//console.log('unresolvedBrick', brick);
			if(brick.index===0){
                brick.dimensions = {
                    width: 200,
                    height: 280,
                };
			} else {
                brick.dimensions = {
                    width: 200,
                    height: 359,
                };
			};
			//console.log(resolvedBrick);
            this.setState(state => {
                //console.log(resolvedBrick);
                const sortedData = _insertIntoColumn(brick, state._sortedData, this.props.sorted);
				//console.log('sortedData', sortedData);
                return {
                    dataSource: state.dataSource.cloneWithRows(sortedData),
                    _sortedData: sortedData,
                    _resolvedData: [...state._resolvedData, brick]
                };
            });;
		})

		//console.log(unresolvedBricks);
		// unresolvedBricks
		// 	.map(brick => resolveImage(brick))
		// 	.map(resolveTask => resolveTask.fork(
		// 		(err) => console.warn('Image failed to load'),
		// 		(resolvedBrick) => {
		// 			this.setState(state => {
		// 				//console.log(resolvedBrick);
		// 				const sortedData = _insertIntoColumn(resolvedBrick, state._sortedData, this.props.sorted);
        //
		// 				return {
		// 					dataSource: state.dataSource.cloneWithRows(sortedData),
		// 					_sortedData: sortedData,
		// 					_resolvedData: [...state._resolvedData, resolvedBrick]
		// 				};
		// 			});;
		// 		}));
	}

	_setParentDimensions(event) {
		// Currently height isn't being utilized, but will pass through for future features
		const {width, height} = event.nativeEvent.layout;

		this.setState({
			dimensions: {
				width,
				height
			}
		});
	}

	render() {
		return (
			<View style={{flex: 1}} onLayout={(event) => this._setParentDimensions(event)}>
			  <ListView
                  //scrollEnabled={false}
				contentContainerStyle={styles.masonry__container}
				dataSource={this.state.dataSource}
				enableEmptySections
				renderRow={(data, sectionId, rowID) =>
						   <Column
                               navigateToDetail={this.props.navigateToDetail}
							   headerHeight={this.props.headerHeight}
								 data={data}
								 columns={this.props.columns}
								 parentDimensions={this.state.dimensions}
								 imageContainerStyle={this.props.imageContainerStyle}
								 customImageComponent={this.props.customImageComponent}
								 customImageProps={this.props.customImageProps}
								 spacing={this.props.spacing}
							 key={`RN-MASONRY-COLUMN-${rowID}`}/> }
				refreshControl={this.props.refreshControl}
				  onEndReachedThreshold={this.props.onEndReachedThreshold}
				  onEndReached={this.props.onEndReached}
				/>
			</View>
		)
	}
};

// Returns a copy of the dataSet with resolvedBrick in correct place
// (resolvedBrick, dataSetA, bool) -> dataSetB
export function _insertIntoColumn (resolvedBrick, dataSet, sorted) {
	let dataCopy = dataSet.slice();
	const columnIndex = resolvedBrick.column;
	const column = dataSet[columnIndex];

	if (column) {
		// Append to existing "row"/"column"
		const bricks = [...column, resolvedBrick];
		if (sorted) {
			// Sort bricks according to the index of their original array position
			bricks = bricks.sort((a, b) => (a.index < b.index) ? -1 : 1);
		}
		dataCopy[columnIndex] = bricks;
	} else {
		// Pass it as a new "row" for the data source
		dataCopy = [...dataCopy, [resolvedBrick]];
	}

	return dataCopy;
};
