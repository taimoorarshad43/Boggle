from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'

score = 0
timesplayed = 0

@app.route("/")
def index():
    board = boggle_game.make_board()
    print(board)
    session["board"] = board
    return render_template("index.html", board = board)

@app.route("/guess") # GET version
def takeguess():
    word = request.args["guess"].lower()
    word = ' ' if (len(word) == 0) else word
    print(word)
    board = session["board"]

    result = boggle_game.check_valid_word(board, word)
    score = getscore(word, result)

    return jsonify(result, score)


def getscore(word, result): # helper function to calculate score
    if result != 'ok':
        return 0
    
    return len(word)

@app.route("/highestscore", methods = ['GET','POST'])   # Gets highest score and number of times played.
def highestscore():
    print("highscore hit")
    # import pdb
    # pdb.set_trace()
    global score 
    localscore = request.json["score"]
    if localscore > score:
        score = localscore
    global timesplayed 
    timesplayed += 1

    print("Score is: ", score)
    print("Times played is: ", timesplayed)

    return jsonify(score, timesplayed)