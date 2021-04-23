# Most Famous NFL Fans on Twitter (React Native Demo)

## What this does

Uses Twitter's API to analyze the most popular NFL tweets and then determines the top 5 most famous Twitter users who tweeted about the NFL.

## How to run

### React Native App
1. `cd react_native app`
2. Create a `.env` file in the react native base directory, enter `SECRET_TOKEN=<your bearer auth token>` and save it.  You can get your bearer auth token from your Twitter development account.
2. `yarn install`
3. `yarn start`
4. Rev up your simulators and/or emulators
5. Run `yarn android` for Android or `yarn ios` if you're an Apple fanboi

## Screenshots
<img src="https://i.imgur.com/IIC2PDm.png"/>
<img src="https://i.imgur.com/E1JuM2d.png"/>
<img src="https://i.imgur.com/QYvqbjs.png"/>

### The Twitter API calls
Twitter's standard API plans are not very good for the goal of this project but I refuse to pay Twitter anything and will probably unleash a hoard of web crawelers to their site just out of spite.

1. `cd twitter_api_calls`
2. `yarn install`
3. Set the `SECRET_TOKEN` value in `.env`.  This is the bearer token associated with your Twitter developer account.
4. Update how many API requests you want to make (see `.env` file)
5. `yarn start`
