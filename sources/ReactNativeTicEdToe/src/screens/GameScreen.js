import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TurnIndicator from '../components/TurnIndicator';
import Square from '../components/Square';

const GameScreen = ({setIsPlaying}) => {
    /* 
        0 0 0
        0 0 0
        0 0 0
        array[0,0,0,0,0,0....]
        0 = empty space
        1 = blue
        2 = red
    */
    const [board, setBoard] = useState([0,0,0,0,0,0,0,0,0]);
    const [isRedTurn, setIsRedTurn] = useState(true);

    const setSquare = (index) => {
        if(board[index] == 0){
            const newBoard = [...board];
            console.log(newBoard);
            if(isRedTurn){
                newBoard[index] = 2;
            } else {
                newBoard[index] = 1;
            }
            setBoard(newBoard);
            setIsRedTurn(!isRedTurn);
            isGameOver(newBoard, isRedTurn);
        }
    }

    const isGameOver = (board, isRedTurn) => {
        console.log("Checking if somebody won");
        let numZeroes = 0;
        for(let i = 0; i < board.length; i++){
            if(board[i] == 0){
                numZeroes++;
            }
        }
        if(isRedTurn){
            let i = 2;
            let message = "Red Won!";
            if((board[2] == i && board[5] == i && board[8] == i)||(board[1] == i && board[4] == i && board[7] == i)||(board[0] == i && board[3] == i && board[6] == i) || (board[0] == i && board[1] == i && board[2] == i) || (board[3] == i && board[4] == i && board[5] == i) || (board[6] == i && board[7] == i && board[8] == i) || (board[0] == i && board[4] == i && board[8] == i) || (board[2] == i && board[4] == i && board[6] == i)){
                alert(message);
                setBoard([0,0,0,0,0,0,0,0,0]);
                console.log("Somebody won!")
            } else if(numZeroes == 0){
                alert("Tie!");
                setBoard([0,0,0,0,0,0,0,0,0]);
            }
        } else {
            let i = 1;
            let message = "Blue Won!";
            if((board[2] == i && board[5] == i && board[8] == i)||(board[1] == i && board[4] == i && board[7] == i)||(board[0] == i && board[3] == i && board[6] == i) || (board[0] == i && board[1] == i && board[2] == i) || (board[3] == i && board[4] == i && board[5] == i) || (board[6] == i && board[7] == i && board[8] == i) || (board[0] == i && board[4] == i && board[8] == i) || (board[2] == i && board[4] == i && board[6] == i)){
                alert(message);
                setBoard([0,0,0,0,0,0,0,0,0]);
                console.log("Somebody won!")
            } else if(numZeroes == 0){
                alert("Tie!");
                setBoard([0,0,0,0,0,0,0,0,0]);
            }
        }
    }

    return(
        <View style={styles.container}>
            <TurnIndicator isRedTurn={isRedTurn}/>
            <View style={styles.boardContainer}>
                <View style={styles.rowContainer}>
                    <Square value={board[0]} index={0} setSquare={setSquare}/>
                    <Square value={board[1]} index={1} setSquare={setSquare}/>
                    <Square value={board[2]} index={2} setSquare={setSquare}/>
                </View>
                <View style={styles.rowContainer}>
                    <Square value={board[3]} index={3} setSquare={setSquare}/>
                    <Square value={board[4]} index={4} setSquare={setSquare}/>
                    <Square value={board[5]} index={5} setSquare={setSquare}/>
                </View>
                <View style={styles.rowContainer}>
                    <Square value={board[6]} index={6} setSquare={setSquare}/>
                    <Square value={board[7]} index={7} setSquare={setSquare}/>
                    <Square value={board[8]} index={8} setSquare={setSquare}/>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => {
                    setIsPlaying(false);
                }}
            > 
                <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignSelf: "center",
        flex: 1
    },
    boardContainer:{

    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    buttonContainer:{
        paddingVertical: 10,
        paddingHorizontal: 50,
        backgroundColor: 'tomato',
        borderColor: '#000000',
        borderWidth: 3,
        alignSelf: "center",
        borderRadius: 10,
    },
    buttonText:{
        fontFamily: "monospace",
        color: 'white',
        fontSize: 40
    }
});

export default GameScreen;