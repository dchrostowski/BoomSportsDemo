# Most Famous NFL Fans on Twitter ( React Native Demo )

## How to run

### React Native App
1. `cd react_native app`
2. `yarn install`
3. Run `yarn start android` for Android or `yarn start ios` if you're an Apple fanboi

As of now, it doesn't display anything, I didn't get a chance to integrate my axios functions (which are working) into it.

### The Twitter API calls
Go easy on this, there are only a finite number of requests that you can make before it will stop working.  Twitter's standard API plans are pretty much worthless and you have to pay them for their tiered premium plans which are much better and would make this project a lot more efficient. I refuse to pay Twitter anything and will probably unleash a hoard of web crawelers to their site just out of spite.


1. `cd twitter_api_calls`
2. `yarn install`
3. Either contact dan@danchrostowski.com to get `SECRET_TOKEN1` (v1.1) and `SECRET_TOKEN2` (v2 early access) or create your own Twitter development account.  You'll need to generate an OAuth Bearer token for both the v1.1 and v2 APIs.  Once acquired, set them in the `.env` file. 
4. Put how many API calls you'd like to make in the `.env` with the `NUMBER_OF_API_REQUESTS` file but keep in mind, you can only do 500,000 per day on the basic plan.  I have defaulted it to 20.
5. `yarn start`