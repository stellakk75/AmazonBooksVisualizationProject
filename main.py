# from datetime import datetime
from flask import render_template, Flask 
# from . import app

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")
    

@app.route('/Visualizations')
def visualizations():
    return render_template("pg2.html")


@app.route('/Analysis')
def analysis():
    return render_template("pg3.html")

if __name__ == "__main__":
    app.run(debug=True)