from boggle import Boggle
from flask import Flask, render_template, redirect, session, request, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'

@app.route("/")
def index():
    board = boggle_game.make_board()
    print(board)
    session["board"] = board
    return render_template("index.html", board = board)

@app.route("/guess") # GET version
def takeguess():
    word = request.args["guess"].lower()
    print(word)
    board = session["board"]
    result = boggle_game.check_valid_word(board, word)

    return jsonify(result)