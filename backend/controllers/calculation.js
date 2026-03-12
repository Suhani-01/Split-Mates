import Expense from "../models/expense.js";
import Settlement from "../models/settlement.js";

async function calculateGroupSettlements(req, res) {
  try {
    const groupId = req.params.groupId;
    console.log(req.user);

    //fetching the expenses of required group
    const groupExpenses = await Expense.find({ groupId });

    // building the balance hashmap
    // balance[A] = +300
    // balance[B] = -100
    // balance[C] = -100
    // balance[D] = -100

    const balance = {};

    groupExpenses.forEach((exp) => {
      //paidBy**************
      exp.paidBy.forEach((payer) => {
        //fetcing the user id who paid
        const id = payer.userId.toString();

        if (!balance[id]) balance[id] = 0;

        balance[id] += payer.amount;
      });

      //paidFor***************
      exp.paidFor.forEach((member) => {
        const id = member.userId.toString();

        if (!balance[id]) balance[id] = 0;

        balance[id] -= member.amount;
      });
    });

    //code to also include settlements that are made till now...
    const settlementsOfGroup = await Settlement.find({ groupId });

    //pending settlements .... A paid B but B ne abhi tk confirm nahi kra ki he/she recieved the payment
    const currentUserId = req.user._id.toString(); // Fixed: toString() for safe comparison
    const pendingSettlementsOfGroup = settlementsOfGroup.filter(
      (st) =>
        st.status === "pending" &&
        (st.paidBy.toString() === currentUserId ||
          st.paidTo.toString() === currentUserId),
    );

    //will use only fulfilled Settlements of the group to do the calculations
    //Update: Added status check to include both fulfilled and pending in calculations
    settlementsOfGroup.forEach((st) => {
      if (st.status === "fulfilled" || st.status === "pending") {
        //paid by
        const paidBy = st.paidBy.toString();
        const paidTo = st.paidTo.toString();
        const amount = st.amount;

        if (!balance[paidBy]) balance[paidBy] = 0;
        if (!balance[paidTo]) balance[paidTo] = 0; // Fixed: Typo balance[paidFor] to balance[paidTo]

        balance[paidBy] += amount;
        balance[paidTo] -= amount;
      }
    });

    // lets create creditors and debtors array
    // [ { user:A , amount:300 } , { user:B , amount:100 } ] ....
    const creditors = [];
    const debtors = [];

    for (let user in balance) {
      // Small epsilon check (0.01) to handle JS floating point issues
      if (balance[user] > 0.01) {
        creditors.push({ user, amount: balance[user] });
      }

      if (balance[user] < -0.01) {
        debtors.push({ user, amount: -balance[user] });
      }
    }

    //sum of creditors and sum of debtors amount will always be equal...
    //using greedy approach to allocate the amnt to be paid by whom to whom

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    let i = 0; //creditor pointer
    let j = 0; //debtor pointer

    //  settlements=[
    //  { from: "B", to: "A", amount: 100 },
    //  { from: "C", to: "A", amount: 100 },
    //  { from: "D", to: "A", amount: 100 }
    // ]

    const settlementsToDo = [];

    while (i < creditors.length && j < debtors.length) {
      let creditor = creditors[i];
      let debtor = debtors[j];

      //min amnt amont creditor adn debtor to settle
      let settleAmount = Math.min(creditor.amount, debtor.amount);

      settlementsToDo.push({
        from: debtor.user,
        to: creditor.user,
        amount: Number(settleAmount.toFixed(2)), // Clean decimals for frontend
      });

      creditor.amount -= settleAmount;
      debtor.amount -= settleAmount;

      if (creditor.amount <= 0.01) i++;
      if (debtor.amount <= 0.01) j++;
    }

    // const requestingUserSettlements = settlementsToDo.filter(
    //   (s) => s.from === currentUserId || s.to === currentUserId,
    // );

    return res.status(200).json({
      toDo: settlementsToDo,
      pending: pendingSettlementsOfGroup,
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { calculateGroupSettlements };