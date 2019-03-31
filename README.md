# Convector Token Test

## Usage

```bash
node ./update-paths.js
```

To start the dev environment and install the chaincodes run: `npm start`.

To init the token with all the funds on "user1" run: `hurl invoke token token_init '{"id":"TKN","balances":{},"totalSupply":100,"name":"token","symbol":"tkn"}' -u user1`

To make a transfer to "user2" from "user1" run: `hurl invoke token token_transfer TKN $(npm run user:fingerprint --silent -- user2) 50 -u user1`

* To find out the account fingerprint (necessary to make the transfers, as it works as an unique ID for each wallet) run: `npm run user:fingerprint -- user2`

You can see all balances here: http://localhost:5084/_utils/#database/ch1_token/TKN 

## More transactions!

### Expect an error

Let's try to transfer more than available funds, getting an error.

```bash
# Second transfer will move all the funds from user1 into user2
hurl invoke token token_transfer TKN $(npm run user:fingerprint --silent -- user2) 51
# Third transfer will throw an error
hurl invoke token token_transfer TKN $(npm run user:fingerprint --silent -- user2) 51
# Should get a "The sender does not have enough founds"

# Find some funds from user2 to user3
hurl invoke token token_transfer TKN $(npm run user:fingerprint --silent -- user3) 51 -u user2
```