import { AsyncStorage } from 'react-native';
import {
    TOGGLE_NUMBERS,
    CHANGE_LEVEL,
    SET_NEW_RECORD,
    UPDATE_PROP,
    LEVEL_HARD,
    LEVEL_MEDIUM,
    LEVEL_EASY,
    SHAKE,
} from "../actions/types";
import { genNumbers, shuffle } from '../utils';

const INITIAL_STATE = {
    level: LEVEL_EASY,
    ex : [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43],
    numbers: genNumbers(LEVEL_EASY),
    correctBlocks: [],
    time: Date.now(),
    modal_open: false,
    new_record: 0,
    easy_records: [],
    medium_records: [],
    hard_records: [],
    name: "",
    game_finished: false,
    records_level_shown: LEVEL_EASY,
    can_shake: 3
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case CHANGE_LEVEL:
            return {
                ...state,
                level: action.payload,
                correctBlocks: [],
                time: Date.now(),
                numbers: genNumbers(action.payload),
                modal_open: false,
                game_finished: false,
                new_record: 0,
                can_shake: 3
            };

        case SET_NEW_RECORD:
            const {
                new_record,
                easy_records,
                medium_records,
                hard_records,
                name
            } = state;
            let records = [...easy_records, ...medium_records, ...hard_records];
            let new_records = [];
            if(records.length > 0){
                new_records = [...records, {name, time: new_record, level: state.level}];
            }else{
                new_records = [{name, time: new_record, level: state.level}];
            }
            AsyncStorage.setItem('records', JSON.stringify(new_records));
            let new_easy_records = [];
            let new_medium_records= [];
            let new_hard_records = [];
            new_records.map(record=>{
                switch (record.level){
                    case LEVEL_HARD:
                        new_hard_records.push(record);
                        break;
                    case LEVEL_MEDIUM:
                        new_medium_records.push(record);
                        break;
                    case LEVEL_EASY:
                        new_easy_records.push(record);
                        break;
                }
            });
            return {
                ...state,
                easy_records: new_easy_records,
                medium_records: new_medium_records,
                hard_records: new_hard_records,
                new_record: 0,
                name: ""
            };

        case UPDATE_PROP:
            let newProps = {};
            if(Array.isArray(action.payload)){
                for(let prop of action.payload){
                    newProps = {...newProps, [prop.key]: prop.value}
                }
                return {...state, ...newProps}
            }
            return {...state, [action.payload.key]: action.payload.value};

        case SHAKE:
            let newCorrectBlocks = [...state.correctBlocks];
            let incorrectNumbers = [];
            let correctNumbers = [];
            state.numbers.map(number=>{
                if(newCorrectBlocks.includes(parseInt(number.key))){
                    correctNumbers.push(number);
                }else{
                    incorrectNumbers.push(number);
                }
            });
            let newNumbersCollection = [...correctNumbers, ...shuffle(incorrectNumbers)];
            for (let i = 0; i < state.level -1; i++) {
                if (newNumbersCollection[i].key != i+1) {
                    if(newCorrectBlocks.includes(i+1)){
                        newCorrectBlocks = newCorrectBlocks.filter(block=> block < i+1);
                    }
                    return {
                        ...state,
                        numbers: newNumbersCollection,
                        correctBlocks: newCorrectBlocks,
                        can_shake: state.can_shake - 1
                    };
                } else if(!newCorrectBlocks.includes(i+1)){
                    newCorrectBlocks.push(i+1);
                }
            }
            return {
                ...state,
                numbers: newNumbersCollection,
                correctBlocks: newCorrectBlocks,
                can_shake: state.can_shake - 1
            };

        case TOGGLE_NUMBERS:
            if(!action.payload){
                return {...state}
            }
            newCorrectBlocks = [...state.correctBlocks];
            let newNumbers = [...state.numbers];
            let targetIndex = null;
            let absentIndex = null;
            newNumbers.map(number =>{
                targetIndex = number.key == action.payload ? newNumbers.indexOf(number) : targetIndex;
                absentIndex = number.key == 0 ? newNumbers.indexOf(number) : absentIndex;
            });

            if(targetIndex + 1 === absentIndex ||
                targetIndex - 1 === absentIndex ||
                targetIndex + 4 === absentIndex ||
                targetIndex -4 === absentIndex){
                for(e of state.ex){
                    if(targetIndex == e && absentIndex == e+1 || targetIndex == e +1 && absentIndex == e){
                        return {...state};
                    }
                }
                newNumbers.splice(targetIndex, 1, newNumbers.splice(absentIndex, 1, newNumbers[targetIndex])[0])
            }

            for (let i = 0; i < state.level -1; i++) {
                if (newNumbers[i].key != i+1) {
                    if(newCorrectBlocks.includes(i+1)){
                        newCorrectBlocks = newCorrectBlocks.filter(block=> block < i+1);
                    }
                    return {...state, numbers: newNumbers, correctBlocks: newCorrectBlocks};
                } else if(!newCorrectBlocks.includes(i+1)){
                    newCorrectBlocks.push(i+1);
                }
            }
            if(newCorrectBlocks.length === state.level -1){
                return {
                    ...state,
                    numbers: newNumbers,
                    correctBlocks: newCorrectBlocks,
                    new_record: Date.now() - state.time,
                    game_finished: true,
                    modal_open: true,
                    records_level_shown: state.level
                };
            }

            return {...state, numbers: newNumbers, correctBlocks: newCorrectBlocks};

        default: return INITIAL_STATE;
    }
}