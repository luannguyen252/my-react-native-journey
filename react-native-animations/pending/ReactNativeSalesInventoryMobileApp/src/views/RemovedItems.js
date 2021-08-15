import React, { Component } from 'react'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Content, DatePicker } from 'native-base'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SalesItemsContainer from '../components/SalesItemsContainer'
import { appUrl } from '../config'
import { Spinner } from 'react-native-ui-kitten'
import axios from 'axios'

class RemovedItems extends Component {
    constructor() {
        super()
        this.state = {
            tableHead: ['TransactionId', 'Item Name', 'Quantity Returned', 'Price(₦)', 'Date'],
            isLoading: true,
            chosenDate: new Date(),
            totalReturnedItems: 0,
            returnedItems: []
        }
        this.setDate = this.setDate.bind(this)
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate, isLoading: true })
        this.fetchItemsFromOnline()
    }

    componentDidMount() {
        this.fetchItemsFromOnline()
    }

    fetchItemsFromOnline = () => {
        let url = appUrl + '/getStaffReturnedItems',
            Staff_ID = this.props.staffData.Staff_ID,
            chosenDate = this.state.chosenDate

        axios
            .post(url, { Staff_ID, chosenDate })
            .then(async response => {
                let tempReturnedItems = [], totalReturnedItems = 0, mnm = []
                if (response.data.hasItems) {
                    tempReturnedItems = response.data.returnedItems
                    tempReturnedItems = tempReturnedItems.map(el => {
                        delete el.Staff_Name
                        delete el.Staff_ID
                        delete el.Branch
                        el.date = new Date(el.date).toDateString()
                        return el
                    })
                    for (let i of tempReturnedItems) {
                        mnm.push(Object.values(i))
                    }
                    if (tempReturnedItems.length > 0) {
                        totalReturnedItems = tempReturnedItems.reduce(
                            (total, obj) => obj.Amount_Returned + total, 0)
                    }
                }
                this.setState({
                    totalReturnedItems,
                    returnedItems: mnm,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderItem = ({ item, index }) => <SalesItemsContainer item={item} />

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.layoutContainer}>
                    <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date(2019, 1, 1)}
                        maximumDate={new Date()}
                        locale={'en'}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={'fade'}
                        androidMode={'default'}
                        placeHolderText={'Click here to choose a date'}
                        textStyle={{ color: '#2e88ce', fontSize: 20 }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 12 }}>
                            Date: {this.state.chosenDate.toString().substr(4, 12)}
                        </Text>
                        <View
                            style={{
                                marginLeft: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Total Amount:{' '}
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontWeight: 'bold' }}
                            >{`₦${this.state.totalReturnedItems}`}</Text>
                        </View>
                    </View>

                    <View style={styles.listContainer}>
                        {this.state.isLoading ? (
                            <View style={styles.emptyContainer}>
                                <Spinner size="giant" status="alternative" />
                            </View>
                        ) : this.state.returnedItems.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <MaterialIcon
                                    name="remove-shopping-cart"
                                    size={50}
                                    color="gray"
                                />
                                <Text style={styles.emptyText}>No Returned Item.</Text>
                            </View>
                        ) : (
                                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                                        <View style={styles.tableContainer}>
                                            <Table borderStyle={{ borderColor: 'transparent' }}>
                                                <Row
                                                    data={this.state.tableHead}
                                                    style={styles.head}
                                                    textStyle={styles.text}
                                                />
                                                {this.state.returnedItems.map((rowData, index) => (
                                                    <TableWrapper
                                                        key={index}
                                                        style={[
                                                            styles.row,
                                                            styles.option,
                                                        ]}
                                                    >
                                                        {rowData.map((cellData, cellIndex) => (
                                                            <Cell
                                                                key={cellIndex}
                                                                data={cellData}
                                                                textStyle={styles.text}
                                                            />
                                                        ))}
                                                    </TableWrapper>
                                                ))}
                                            </Table>
                                        </View>
                                    </ScrollView>
                                )}
                    </View>
                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        staffData: state.homeReducer.staffData
    }
}

export default connect(
    mapStateToProps
)(RemovedItems)

const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
        marginTop: 5,
        backgroundColor: '#F5FCFF',
        paddingLeft: 5,
        paddingRight: 5
    },
    layoutTitleText: {
        fontSize: 17,
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15
    },
    listLayout: {
        marginBottom: 30,
        backgroundColor: 'transparent'
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10
    },
    tableContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    head: { height: 40, backgroundColor: '#ccc', marginBottom: 20 },
    text: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        textAlign: 'center'
    },
    row: { flexDirection: 'row', marginBottom: 20 },
    btn: { backgroundColor: '#3089f9', borderRadius: 3 },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 5,
        paddingBottom: 5
    }
})
