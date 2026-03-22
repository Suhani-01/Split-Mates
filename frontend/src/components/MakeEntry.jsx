import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

function MakeEntry({ setMakeEntry, groupDetails }) {
  const { userDetails } = useContext(UserContext);

  // console.log(userDetails);
  // console.log(groupDetails)

  //this include each member username and its _id
  const members = groupDetails?.members || [];

  const currentUser = userDetails.userName || "";
  const currentUserId = userDetails._id || "";

  //Title and description of the payment
  const [titleOfPayment, setTitleOfPayment] = useState("");
  const [description, setDescription] = useState("");

  //Multiple Payer?? or just a Single payer
  const [isMultiplePayer, setIsMultiplePayer] = useState(false);

  //Splitting Eqally Among Selected Users???
  const [splitEqually, setSplitEqually] = useState(true);

  //Total Amount
  const [totalAmount, setTotalAmount] = useState("");

  //Who are paying the cost //CREDITOR
  const [selectedPayer, setSelectedPayer] = useState([currentUser]);
  // payer->amount
  const [payerAmount, setPayerAmount] = useState({});

  //For who we are paying //DEBTOR
  const [paidFor, setPaidFor] = useState([]);
  //Member -> Amount
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
  async function addPayment(e) {
    e.preventDefault();

    if (paidFor.length === 0) {
      alert("Select the people you are paying for");
      return;
    }

    if (!totalAmount) {
      alert("Enter a valid amount");
      return;
    }
    if (titleOfPayment.trim().length === 0) {
      alert("Enter a title please");
      return;
    }

    //check if in case of manual split the sum of money is equal to total Amount
    if(!splitEqually){
      let totalSumOfAmount = 0;
      let hasError=false;
      paidFor.forEach((member,i,arr) => {
        if(!arr[member]) {
          alert(`Missing split for ${member}`);
          hasError=true;
          return;
        }
        totalSumOfAmount += Number(arr[member]);
      });
      if(hasError) return;

      if(totalSumOfAmount!=totalAmount){
      alert(`The split amount ${totalSumOfAmount} do not match total paid ${totalAmount}`)
      return;
    }
    }
    

    

    //paid for data
    // [ {userId:'............. , amount : 920} ]
    const paidForData = paidFor.map((name) => {
      const member = members.find((m) => m.userName === name);

      return {
        userId: member._id,
        amount: splitMoney[name],
      };
    });

    //paid by
    // const paidByData=selectedPayer.map((name)=>{
    //   const member=members.find((m)=> m.userName===name);

    //   return {
    //     userId:member._id,
    //     amount:payerAmount[name] || 0,
    //   }
    // })

    //abhi bhs ek payer haiii baad me multiple kr denge

    const paidByData = [
      {
        userId: currentUserId,
        amount: Number(totalAmount),
      },
    ];

    //the datat we will send to the backend
    const payload = {
      groupId: groupDetails._id,
      title: titleOfPayment,
      description,
      totalAmount: Number(totalAmount),
      paidBy: paidByData,
      paidFor: paidForData,
      createdBy: currentUserId,
    };
    console.log(payload);

    const API = "http://localhost:7000/api/expense/create-expense";

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookie automatically cross origin ke case me bhejna pdta hai same me hota tho nahi bhejna pdta browser automatically bhej deta
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");

      return;
    }

    alert("Expense added");
    setMakeEntry(false);
  }

  return (
    <form
      onSubmit={addPayment}
      className="flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden shadow-sm"
    >

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Section 1: Basic Info */}
        <section className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              value={titleOfPayment}
              onChange={(e) => setTitleOfPayment(e.target.value)}
              required
              placeholder="e.g. Dinner at Mario's"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
              placeholder="What was this for?"
            />
          </div>
        </section>


        {/* Section 2: Amount & Payer */}
        <section className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Total Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">₹</span>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
              <input
                type="checkbox"
                id="multiPayer"
                checked={isMultiplePayer}
                onChange={() => {
                  setIsMultiplePayer(!isMultiplePayer);
                  setSelectedPayer([currentUser]);
                }}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
              <label
                htmlFor="multiPayer"
                className="text-xs font-medium text-blue-700 cursor-pointer"
              >
                Multiple Payers
              </label>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-400 block mb-3">
              Paid By
            </label>
            {!isMultiplePayer ? (
              <div className="flex items-center gap-2 text-gray-700 font-medium bg-gray-50 p-2 rounded">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                  You
                </div>
                {currentUser}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {members.map((member) => (
                  <label
                    key={member._id}
                    className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ₹{selectedPayer.includes(member.userName) ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPayer.includes(member.userName)}
                      onChange={() => handleUserToggle(member.userName)}
                      disabled={member.userName === currentUser}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-600">
                      {member.userName}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Splitting */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700">
              Split Between
            </label>
            <button
              type="button"
              onClick={() => setSplitEqually(!splitEqually)}
              className="bg-green-200 text-xs text-green-600 font-semibold py-1 cursor-pointer rounded-xl px-4"
            >
              {splitEqually ? "Splitting Equally" : "Manual Split"}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={handleSelectAll}
                  checked={paidFor.length === members.length}
                  type="checkbox"
                  className="rounded"
                />
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Select All Members
                </span>
              </label>
            </div>

            <div className="divide-y divide-gray-100">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={paidFor.includes(member.userName)}
                      onChange={() => handlePaidForToggle(member.userName)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {member.userName}
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">₹</span>
                    <input
  
                    type="number"
                      disabled={
                        splitEqually || !paidFor.includes(member.userName)
                      }
                      onChange={(e)=>{
                         setSplitMoney(prev=>({
                          ...prev,
                          [member.userName]:e.target.value,
                         }));
                      }}  
                      value={splitMoney[member.userName] || 0}
                      className={`w-20 text-right px-2 py-1 border rounded text-sm ₹{!splitEqually && paidFor.includes(member.userName) ? "bg-white border-blue-300" : "bg-gray-100 border-transparent text-gray-400"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-white border-t flex gap-3">
        <button
          type="button"
          onClick={() => setMakeEntry(false)}
          className="flex-1 cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] cursor-pointer px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Save Transaction
        </button>
      </div>
    </form>
  );
}

export default MakeEntry;
