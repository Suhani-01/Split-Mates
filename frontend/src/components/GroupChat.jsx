import React from 'react'
import SettlementsToDo from './SettlementsToDo'

function GroupChat(props) {
  console.log("Hello I am selected group from groupChat",props.selectedGroup)
  return (
    <div className='h-full w-full flex-1'>
      

      {/* load this only when we have the groupdetails else loading... */}

      
      <div className='p-5 flex-1  overflow-y-auto'>
        {props.groupDetails &&
          <SettlementsToDo groupDetails={props.groupDetails} selectedGroup={props.selectedGroup}/>
        }

        {
          !props.groupDetails &&
          <div>Loading........</div>
        }
      </div>


      <div className='w-full gap-4 flex p-5'>
        <button onClick={()=>{props.setMakeEntry(true)}} className='bg-blue-500 text-white p-3 w-full rounded-xl cursor-pointer'>Add Entry</button>
      </div>
    </div>
  )
}

export default GroupChat
