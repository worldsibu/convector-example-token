# Convector Token Test

## Usage

To start the dev environment and install the chaincodes run: `npm run restart -- 1`. The `1` at the end is the version of the chanincode you want to install

To init the token run: `npm run cc:invoke -- --user user1 token init '{"id":"TKN","balances":{},"totalSupply":100,"name":"token","symbol":"tkn"}'`

To make a transfer run: `npm run cc:invoke -- --user user1 token transfer TKN $(npm run user:fingerprint --silent -- admin) 50`

To find out the account fingerprint (necessary to make the transfers) run: `npm run user:fingerprint -- admin`