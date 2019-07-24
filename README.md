## Code Exercise

Part of the Infinitas Learning interview process is a pair programming exercise where you will have an opportunity to pair program with one of our engineers to demonstrate your ability to write code and to collaborate with others. Since we expect our prospective employees to lead busy lives, we do not have a take-home exercise that you would work during your own time and subsequently extend during our pairing exercise. Additionally, we do not like the pressure placed on candidates by simply dropping into an
exercise and being given a problem to solve without any lead time.

Therefore, the Infinitas Learning code exercise is going to be based around an existing code base. You are free to look at the code base at your leisure prior to the interview to familiarize yourself with the existing code. The challenge is described below. You will have 45 minutes ~ 1 hour to work on the code with one of our engineers. The expectation is NOT that you will finish the exercise but rather to see how you think, how you interact and how you approach the code to solve the problem.

**This is the game based version of the assessment**

## Gaming

In the primary education market one of the best ways to let pupils learn is by using gamification. For this we have a created a new game. The game is a proof of concept but based on the first feedback from pupils we think we might be on to something.

Currently the game consist of the following features:

1. Split into multiple screens
2. The player can walk on screen
3. Flames are coming towards the player. If he/she touches those the player will restart from the beginning, loosing one life.
4. Dragons are spitting the fire. If you touch a dragon you will also loose a life and restart from the beginning.
5. If you've restarted 3 times the game is over
6. If you can make it to the chest a coin can be earned

Our Product Manager talked with teachers about features they'd ❤ to have. The game in its current stage doesn't involve learning all that much, so the Product Manager asked you how to best approach this.

1. Could you come up with ideas how we can involve learning within this game
2. Instead of 3 lives the Product Manager thinks we should extend it to 5.
3. We now show the heart and coin icons. We also want to show the number of hearts and coins that you have. So if you have three hearts the player sees them, but also the number 3 between parentheses is shown, like: (3)

### Assignment

In the pair programming session, you will work on some of the features listed above. The structure of the session will be like this:

- 5-10 minutes of examining the existing code base
- 35-40 minutes of pair programming
- 5-10 minutes of reflection on the process

### Tips

- It is worth preparing by looking at the code before you come into the interview; a portion of the interview will be focused on the various pieces of code.
- Please make sure that it runs on your machine and bring your laptop to the interview. If you don't have a laptop, please let us know and we will provide you with a laptop with the code on it.
- It might be helpful if you have an idea of an implementation approach
- If you choose to implement the assignment on your own time, there will be further enhancements available, but we will neither give you bonus points nor an easier ride if you choose to do this.

## Running the game

## Requirements

- Install the latest version of NodeJs before proceeding.
- Clone this repository on your computer
- Navigate inside the cloned folder and install all dependencies with the `npm install` command

## Run

The next commands are available to help you with development:

| Command | Description |
|---------|-------------|
| `npm start` | Launch the browser of choice and navigate to [http://localhost:8080/](http://localhost:8080/). <br> Press `Ctrl + C` in the terminal to kill **webpack-dev-server** process. |
