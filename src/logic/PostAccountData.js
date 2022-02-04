export const postAccountData = (account) => {
    fetch(
      'https://crypto-dashboard-7dcab-default-rtdb.firebaseio.com/accounts.json',
      {
        method: "PUT",
        body: JSON.stringify(account),
        headers: {
          'Content-Type': "aplication/json",
        }
      }
    )
  }
