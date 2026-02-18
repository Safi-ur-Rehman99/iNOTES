import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState=(props)=>{
 const initialNote=[
  {
    "_id": "698d8ca0456b4b939ec6f889",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes",
    "description": "this is test note",
    "tag": "personal",
    "date": "2026-02-12T08:17:36.591Z",
    "__v": 0
  },
  {
    "_id": "69942bb471c691e062147e24",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes 2",
    "description": "this is secound test note",
    "tag": "personal",
    "date": "2026-02-17T08:49:56.215Z",
    "__v": 0
  },  {
    "_id": "698d8ca0456b4b3939ec6f889",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes",
    "description": "this is test note",
    "tag": "personal",
    "date": "2026-02-12T08:17:36.591Z",
    "__v": 0
  },
  {
    "_id": "69942bb4714c691e062147e24",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes 2",
    "description": "this is secound test note",
    "tag": "personal",
    "date": "2026-02-17T08:49:56.215Z",
    "__v": 0
  },  {
    "_id": "698d8ca04556b4b939ec6f889",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes",
    "description": "this is test note",
    "tag": "personal",
    "date": "2026-02-12T08:17:36.591Z",
    "__v": 0
  },
  {
    "_id": "69942bb471c691e0662147e24",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes 2",
    "description": "this is secound test note",
    "tag": "personal",
    "date": "2026-02-17T08:49:56.215Z",
    "__v": 0
  },  {
    "_id": "698d8ca0456b4b939e7c6f889",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes",
    "description": "this is test note",
    "tag": "personal",
    "date": "2026-02-12T08:17:36.591Z",
    "__v": 0
  },
  {
    "_id": "69942bb4871c691e062147e24",
    "user": "697f580829b2b3c439960ea5",
    "title": "test notes 2",
    "description": "this is secound test note",
    "tag": "personal",
    "date": "2026-02-17T08:49:56.215Z",
    "__v": 0
  }
]
   const [notes,setnotes]=useState(initialNote);

    
    
return(
    <NoteContext.Provider value={{notes,setnotes}}>
    {props.children}
    </NoteContext.Provider>
)
}


export default NoteState;