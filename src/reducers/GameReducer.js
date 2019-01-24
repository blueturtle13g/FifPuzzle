import { TOGGLE_NUMBERS, CHANGE_LEVEL,} from "../actions/types";
import { genNumbers } from '../helper';

const INITIAL_STATE = {
    level: 16,
    ex : [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43],
    numbers: genNumbers(16, []),
    correctBlocks: [],
    time: Date.now(),
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case CHANGE_LEVEL:
            return {...state, level: action.payload, correctBlocks: [], time: Date.now(), numbers: genNumbers(action.payload, [])};

        case TOGGLE_NUMBERS:
            if(!action.payload){
                return {...state}
            }
            let {numbers, level, correctBlocks, ex } = state;
            let newCorrectBlocks = [...correctBlocks];
            let newNumbers = [...numbers];
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
                for(e of ex){
                    if(targetIndex == e && absentIndex == e+1 || targetIndex == e +1 && absentIndex == e){
                        return {...state};
                    }
                }
                newNumbers.splice(targetIndex, 1, newNumbers.splice(absentIndex, 1, newNumbers[targetIndex])[0])
            }

            for (let i = 0; i < level -1; i++) {
                if (newNumbers[i].key != i+1) {
                    if(newCorrectBlocks.includes(i+1)){
                        newCorrectBlocks = newCorrectBlocks.filter(block=> block < i+1);
                    }
                    return {...state, numbers: newNumbers, correctBlocks: newCorrectBlocks};
                } else if(!newCorrectBlocks.includes(i+1)){
                    newCorrectBlocks.push(i+1);
                }
            }

            return {...state, numbers: newNumbers, correctBlocks: newCorrectBlocks};

        default: return INITIAL_STATE;
    }
}