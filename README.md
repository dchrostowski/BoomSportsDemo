# Most Famous NFL Fans on Twitter ( React Native Demo )

## How to run

### React Native App
1. `cd react_native app`
2. `yarn install`
3. Run `yarn start android` for Android or `yarn start ios` if you're an Apple fanboi

As of now, it doesn't display anything, I didn't get a chance to integrate my axios functions (which are working) into it.

### The Twitter API calls
Twitter's standard API plans are not very good for the goal of this project but I refuse to pay Twitter anything and will probably unleash a hoard of web crawelers to their site just out of spite.

1. `cd twitter_api_calls`
2. `yarn install`
3. Set the `SECRET_TOKEN` value in `.env`.  This is the bearer token associated with your Twitter developer account.
4. Update how many API requests you want to make (see `.env` file)
5. `yarn start`