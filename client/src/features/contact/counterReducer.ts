export interface CounterState{
    data:number,
    title:string
}

const initialSatate:CounterState={
    data:42,
    title:"YARC"
}

export default function counterReducer(state=initialSatate,action:any){
    return state;
}