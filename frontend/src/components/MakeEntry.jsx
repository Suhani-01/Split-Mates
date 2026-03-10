import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

function MakeEntry({ setMakeEntry, groupDetails }) {
  const {userDetails}=useContext(UserContext);
 

  // console.log(userDetails);
  // console.log(groupDetails)

  //this include each member username and its _id
  const members = groupDetails?.members || [];


  const currentUser = userDetails.userName || "";
  console.log(userDetails)
  const currentUserId=userDetails._id || "";


  //to set the title and description of the payment
  const [titleOfPayment,setTitleOfPayment]=useState("");
  const [description,setDescription]=useState("");

  //multiple payer?? or just a single payer
  const [isMultiplePayer, setIsMultiplePayer] = useState(false);
  //splitting eqally among selected users???
  const [splitEqually, setSplitEqually] = useState(true);


  //total amount we are paying
  const [totalAmount, setTotalAmount] = useState("");

  //who are paying the cost yarrrr
  const [selectedPayer, setSelectedPayer] = useState([currentUser]);
  // payer->amount
  const [payerAmount, setPayerAmount] = useState({});


  //for who we are paying yarrr...
  const [paidFor, setPaidFor] = useState([]);
  // member -> amount
  const [splitMoney, setSplitMoney] = useState({});
  

  useEffect(() => {
    // reset everything for new group
    setTotalAmount("");
    setTitleOfPayment("");
    setDescription("");
    setPaidFor([]);
    setSplitMoney({});
    setSplitEqually(true);
    setIsMultiplePayer(false);
    setSelectedPayer([currentUser]);
    
  }, [groupDetails]);

  // splitting logic
  useEffect(() => {
    const amount = Number(totalAmount);

    if (!amount || paidFor.length === 0) {
      setSplitMoney({});
      return;
    }

    const amountPerPerson = amount / paidFor.length;

    const split = {};

    if (splitEqually) {
      paidFor.forEach((member) => {
        split[member] = amountPerPerson;
      });
    }

    setSplitMoney(split);
  }, [totalAmount, paidFor, splitEqually]);

  // payer toggle
  const handleUserToggle = (name) => {
    if (name === currentUser) return;

    if (selectedPayer.includes(name)) {
      setSelectedPayer(selectedPayer.filter((user) => user !== name));
    } else {
      setSelectedPayer([...selectedPayer, name]);
    }
  };

  // toggle paidFor
  const handlePaidForToggle = (name) => {
    if (paidFor.includes(name)) {
      setPaidFor(paidFor.filter((person) => person !== name));
    } else {
      setPaidFor([...paidFor, name]);
    }
  };

  // select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setPaidFor(members.map((m) => m.userName));
    } else {
      setPaidFor([]);
    }
  };

  //add the payment in the db *********************
  async function addPayment(e){
    e.preventDefault();
  
    if(paidFor.length===0){
      alert("Select the people you are paying for");
      return;
    }

    if(!totalAmount) {
      alert("Enter a valid amount")
      return;
    }
    if(titleOfPayment.trim().length===0){
      alert("Enter a title please")
      return;
    }

    // [ {userId:'............. , amount : 920} ]
    const paidForData=paidFor.map((name)=>{
      const member=members.find(m=>m.userName===name);

      return {
        userId:member._id,
        amount:splitMoney[name],
      }
    })

    //paid by
    // const paidByData=selectedPayer.map((name)=>{
    //   const member=members.find((m)=> m.userName===name);

    //   return {
    //     userId:member._id,
    //     amount:payerAmount[name] || 0,
    //   }
    // })

    //abhi bhs ek payer haiii baad me multiple kr denge

    const paidByData=[
      {
        userId:currentUserId,
        amount:Number(totalAmount),
      }
    ];

    //the datat we will send to the backend
    const payload={
      groupId:groupDetails._id,
      title:titleOfPayment,
      description,
      totalAmount:Number(totalAmount),
      
      paidBy:paidByData,
      paidFor:paidForData,

      createdBy:currentUserId,
    }
    console.log(payload)

    const API="http://localhost:7000/api/expense/create-expense";
    
    const res=await fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials: "include", // send cookie automatically cross origin ke case me bhejna pdta hai same me hota tho nahi bhejna pdta browser automatically bhej deta
      body:JSON.stringify(payload),
    })

    const data=await res.json();

    if(!res.ok){
      alert(data.message || "Something went wrong")
      
      return;
    }

    alert("Expense added");
    setMakeEntry(false);


  }

  return (
    <form onSubmit={addPayment} className="h-full p-5 flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-10">

          {/* Title */}
          <div className="flex gap-3">
            <label className="font-bold">Title</label>
            <input value={titleOfPayment} onChange={(e)=>{
              setTitleOfPayment(e.target.value)
            }} required className="bg-white px-2 flex-1 border rounded" />
          </div>

          {/* Description */}
          <div className="flex gap-3">
            <label className="font-bold">Description</label>
            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="bg-white  px-2 border rounded w-70 h-20 resize-none"
              placeholder="optional description..."
            />
          </div>

          {/* Amount + payer */}
          <div className="flex gap-3 justify-between">
            <div className="flex gap-3">
              <label className="font-bold">Paid</label>

              <input
                placeholder="enter the amount you paid"
                value={totalAmount}
                type="number"
                onChange={(e) => setTotalAmount(e.target.value)}
                className="border w-70 h-6 px-1 bg-white rounded"
              />

              <label className="font-bold">By</label>

              {!isMultiplePayer && <p>{currentUser}</p>}

              {isMultiplePayer && (
                <div className="flex flex-col gap-2">
                  {members.map((member) => (
                    <label key={member._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPayer.includes(member.userName)}
                        onChange={() => handleUserToggle(member.userName)}
                        disabled={member.userName === currentUser}
                      />

                      {member.userName}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* multiple payer toggle */}
            <div className="flex h-6 gap-3 px-2">
              <input
                type="checkbox"
                checked={isMultiplePayer}
                onChange={() => {
                  setIsMultiplePayer(!isMultiplePayer);
                  setSelectedPayer([currentUser]);
                }}
              />

              <span>Multiple Payers</span>
            </div>
          </div>

          {/* Paid for */}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <label className="font-bold">For</label>

              <div className="flex flex-col gap-2">
                <label>
                  <input
                    onChange={handleSelectAll}
                    checked={paidFor.length === members.length}
                    className="mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  Select All
                </label>

                {members.map((member) => (
                  <div key={member._id} className="flex gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={paidFor.includes(member.userName)}
                      onChange={() => handlePaidForToggle(member.userName)}
                    />

                    <label>{member.userName}</label>

                    <input
                      disabled={
                        splitEqually || !paidFor.includes(member.userName)
                      }
                      value={splitMoney[member.userName] || 0}
                      className="bg-white px-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                className="h-7"
                type="checkbox"
                checked={splitEqually}
                onChange={() => setSplitEqually(!splitEqually)}
              />

              <label>Split Equally</label>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex gap-4 mt-4">
        <button
          className="bg-red-200 cursor-pointer flex-1 h-10 rounded"
          onClick={() => setMakeEntry(false)}
        >
          Close
        </button>

        <button type="submit" className="flex-1 cursor-pointer text-white rounded bg-blue-600">
          Submit
        </button>
      </div>
    </form>
  );
}

export default MakeEntry;