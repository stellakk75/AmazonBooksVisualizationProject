# from datetime import datetime
from flask import render_template, Flask 
# from . import app

# API Request/pull



app = Flask(__name__)

@app.route('/')
def Home():
    
    return render_template("index.html")


@app.route('/Years')
def Year():
    return render_template("pg2.html")


@app.route('/Authors')
def Authors():
    return render_template("authors.html")

@app.route('/Search')
def Search():
    return render_template("searchtool.html")

# callign database 
@app.route('/new_books')
def new_books():
    # return jsonify() coming from database

if __name__ == "__main__":
    app.run(debug=True)

