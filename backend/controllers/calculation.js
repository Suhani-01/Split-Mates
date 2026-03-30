import Expense from "../models/expense.js";
import Settlement from "../models/settlement.js";

async function calculateGroupSettlements(req, res) {
  try {
    const groupId = req.params.groupId;
    
    //fetching all the past expenses of required group
    const groupExpenses = await Expense.find({ groupId });

    // building the balance hashmap
    // balance[A] = +300
    // balance[B] = -100
    // balance[C] = -100
    // balance[D] = -100

    const balance = {};
    

    groupExpenses.forEach((exp) => {
      
      // ----------- PAID BY ----------- 
      exp.paidBy.forEach((payer) => {
        const id = payer.userId.toString(); //User Id of Payer

        if (!balance[id]) balance[id] = 0;

        balance[id] += payer.amount;
      });

      // ------------ PAID FOR ------------
      exp.paidFor.forEach((member) => {
        const id = member.userId.toString(); //User Id 

        if (!balance[id]) balance[id] = 0;

        balance[id] -= member.amount;
      });


    });

    // SETTLEMENTS MADE TILL NOW IN THE GROUP
    const settlementsOfGroup = await Settlement.find({ groupId });

    // LOGGED IN USER 
    const currentUserId = req.user._id.toString();

    // SETTLEMENTS THAT ARE NOT CONFIRMED BY THE RECIEVER ("pending")
    // Either payer is the logged in user or the reciever is the logged in user

    // SETTLEMENTS THAT ARE WAITING FOR CONFIRMATION
    const pendingSettlementsOfGroup = settlementsOfGroup.filter(
      (st) =>
        st.status === "pending" &&
        (st.paidBy.toString() === currentUserId ||
          st.paidTo.toString() === currentUserId),
    );



    settlementsOfGroup.forEach((st) => {
    
      const paidBy = st.paidBy.toString();
      const paidTo = st.paidTo.toString();
      const amount = st.amount;

      if (!balance[paidBy]) balance[paidBy] = 0;
      if (!balance[paidTo]) balance[paidTo] = 0; 

      balance[paidBy] += amount;
      balance[paidTo] -= amount;
      
    });

    // CREATE CREDITOR AND DEBTOR ARRAY
    // [ { user:A , amount:300 } , { user:B , amount:100 } ] ....
    const creditors = [];
    const debtors = [];

    for (let user in balance) {

      if (balance[user] > 0) {
        creditors.push({ user, amount: balance[user] });
      }

      if (balance[user] < 0) {
        debtors.push({ user, amount: -balance[user] });
      }

    }

    // SUM OF CREDITOR AMOUNT  == SUM OF DEBTOR AMOUNT
    // ALLOCATE WHO HAD TO PAY TO WHO
    
    // WILL TACKLE LARGE AMOUNT FIRST
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    let i = 0; // creditor pointer
    let j = 0; // debtor pointer

    // settlementsToDo = [
    //  { from: "B", to: "A", amount: 100 },
    //  { from: "C", to: "A", amount: 100 },
    //  { from: "D", to: "A", amount: 100 }
    // ]

    const settlementsToDo = [];

    // ------------- GREEDY ---------------
    while (i < creditors.length && j < debtors.length) {
      let creditor = creditors[i];
      let debtor = debtors[j];

      // MAX AMOUNT THAT WE CAN SETTLE
      let settleAmount = Math.min(creditor.amount, debtor.amount);

      settlementsToDo.push({
        from: debtor.user,
        to: creditor.user,
        amount: Number(settleAmount.toFixed(2)), // Clean decimals for frontend
      });

      creditor.amount -= settleAmount;
      debtor.amount -= settleAmount;

      if (creditor.amount <= 0) i++;
      if (debtor.amount <= 0) j++;
    }

    // const requestingUserSettlements = settlementsToDo.filter(
    //   (s) => s.from === currentUserId || s.to === currentUserId,
    // );

    return res.status(200).json({
      toDo : settlementsToDo,
      pending : pendingSettlementsOfGroup,
    });
    
  } catch (err) {

    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

export { calculateGroupSettlements };