from boggle import Boggle
from flask import Flask, render_template, redirect, session

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'

@app.route("/")
def index():
    board = boggle_game.make_board()
    print(board)
    return render_template("index.html", board = board)