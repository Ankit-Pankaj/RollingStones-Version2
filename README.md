## RollingStones-Version2.0

#### One of the most complex but most awesome and my favourite project😄. But the learning is exponentially incresed due to its complexity.
Its just version 2.0 of Roling stones app which I created before.

There I used the curl request to get the required data from their servers and then saved it locally to render on browser.
Here I wanted to implement same functionality but with auto fetching of data by creating an authorization workflow.

**Note: This project is still under construction while all the new and complex tasks are completed already and I am able to fetch the required data through authorization workflow. Just building UI like version1 is left**

### How it works
So spotify provides us with a *__CLIENT_ID__* and a *__CLIENT_SECRET__* which is used here to get an initial access code when user login into their system.

Now this initial access code is used to send an request to their servers to get the required *__ACCESS_TOKEN__*.

Now this access token is used to fetch the required data in JSON format. 

Now after getting this json data its pretty simple to show it on the front-end same as I did in the version1.
