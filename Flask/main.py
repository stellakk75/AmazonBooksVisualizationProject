# from datetime import datetime
from flask import render_template, Flask 
# from . import app

# API Request/pull



app = Flask(__name__)

@app.route('/')
def index():
    
    return render_template("index.html")


@app.route('/Visualizations')
def Visualizations():
    return render_template("pg2.html")


@app.route('/Analysis')
def Analysis():
    return render_template("pg3.html")

# callign database using datbase
@app.route('/new_books')
def new_books():
    # return jsonify() coming from database

if __name__ == "__main__":
    app.run(debug=True)

