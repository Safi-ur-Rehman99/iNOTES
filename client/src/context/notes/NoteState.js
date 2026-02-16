import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const state={
        "name":"Safi ur Rehman",
        "class":"BSCS-6A"
    }
return(
    <NoteContext.Provider value={{state}}>
    {props.children}
    </NoteContext.Provider>
)
}


export default NoteState;