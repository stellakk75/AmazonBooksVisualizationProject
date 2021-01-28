# Import Libraries
import datetime as dt
import os
import numpy as np
import pandas as pd
import sqlalchemy
from flask_cors import CORS
from flask import Flask, render_template, redirect, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)
#################################################

# Database Setup
connection = psycopg2.connect(user = "postgres",
                                  password = "Isla",
                                  host = "127.0.0.1",
                                  port = "5432",
                                  database = "books")

db_string = "postgres://postgres:Isla@localhost:5432/books"
engine = connection.cursor()
db = create_engine(db_string)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/analysisBYyears')
def analysisBYyears():
    return render_template("pg2.html")

@app.route('/analysisBYauthors')
def analysisBYauthors():
    return render_template("authors.html")

@app.route('/searchtool')
def searchtool():
    return render_template("searchtool.html")

# **************************qrl pulls*********************************

@app.route("/authors")
def authors():
    authors_df = pd.read_sql_query(
                   ''' SELECT DISTINCT author FROM books \
                       ORDER BY author ASC
                   ''' , db)
    i = 0
    authors_list = []
    for i in range(len(authors_df.to_dict('split')['data'])):
        authors = authors_df.to_dict('split')['data'][i][0]

        data = {
            'Author' : authors
        }
        authors_list.append(data)
    return jsonify(authors_list)

@app.route("/author_books")
def author_books():
    authors_books_df = pd.read_sql_query(
                   ''' SELECT * FROM books \
                       ORDER BY author asc
                   ''' , db)
    author_books_list = []
    # // below for loop has performnace issues
    # for i in range(len(authors_books_df.to_dict('split')['data'])):
    #     name = authors_books_df.to_dict('split')['data'][i][0]
    #     author = authors_books_df.to_dict('split')['data'][i][1]
    #     rating = authors_books_df.to_dict('split')['data'][i][2]
    #     review = authors_books_df.to_dict('split')['data'][i][3]
    #     price = authors_books_df.to_dict('split')['data'][i][4]
    #     year = authors_books_df.to_dict('split')['data'][i][5]
    #     genre = authors_books_df.to_dict('split')['data'][i][6]
   
    for index, row in authors_books_df.iterrows(): 
        data = { 'Author':row["author"], 'Title': row["name"],
                'Reviews':row["reviews"], 'Rating':row["rating"], 
                'Price':row["price"],'Year':row['year'],
                    'Genre':row["genre"]}
        author_books_list.append(data);

        # data = { 
        #         "Author": author,
        #         "Title": name,
        #         "Reviews": review,
        #         "Rating": rating,
        #         "Price": price,
        #         "Year": year,
        #         "Genre": genre
        #         }
        # author_books_list.append(data)
    return jsonify(author_books_list)

# @app.route("/avgprice_yearly")
# def avgprice_yearly():
#     avgprice_df = pd.read_sql_query(
#                    '''  SELECT year,ROUND(avg(price),2) FROM books \
#                         GROUP BY year
#                         ORDER BY year;
#                    ''' , db)
#     i = 0
#     avgprice_list = []
#     for i in range(len(avgprice_df.to_dict('split')['data'])):
#         year = avgprice_df.to_dict('split')['data'][i][0]
#         avgprice = avgprice_df.to_dict('split')['data'][i][1]

#         data = {
#             'Year' : year,
#             'Average Price' : avgprice
#         }
#         avgprice_list.append(data)
#     return jsonify(data=avgprice_list)

# @app.route("/avg_rating")
# def avg_rating():
#     avg_rating_df = pd.read_sql_query(
#                    ''' SELECT year,ROUND(avg(rating),2) FROM books \
#                        GROUP BY year \
#                        ORDER BY year
#                    ''' , db)
#     i = 0
#     avg_rating_list = []
#     for i in range(len(avg_rating_df.to_dict('split')['data'])):
#         year = avg_rating_df.to_dict('split')['data'][i][0]
#         rating =  avg_rating_df.to_dict('split')['data'][i][1]
#         data = {
#             'Year': year,
#             'Average Rating': rating
#         }
#         avg_rating_list.append(data)
#     return jsonify(data=avg_rating_list)

@app.route("/avg_rating_by_author")
def avg_rating_by_author():
    avg_author_rating_df = pd.read_sql_query(
                   ''' SELECT author,ROUND(avg(rating),2) FROM books \
                       GROUP BY author \
                       ORDER BY author
                   ''' , db)
    i = 0
    avg_author_rating_list = []
    for i in range(len(avg_author_rating_df.to_dict('split')['data'])):
        author = avg_author_rating_df.to_dict('split')['data'][i][0]
        rating =  avg_author_rating_df.to_dict('split')['data'][i][1]
        data = {
            'Author': author,
            'AverageRating': rating
        }
        avg_author_rating_list.append(data)
    return jsonify(avg_author_rating_list)


@app.route("/genre_count")
def genre_count():
    genre_count_df = pd.read_sql_query(
                   '''  SELECT year,genre,COUNT(*) FROM books \
                        GROUP BY year,genre \
                        ORDER BY year,genre
                   ''' , db)
    i = 0
    genre_count_list = []
    for i in range(len(genre_count_df.to_dict('split')['data'])):
        year = genre_count_df.to_dict('split')['data'][i][0]
        genre = genre_count_df.to_dict('split')['data'][i][1]
        cnt = genre_count_df.to_dict('split')['data'][i][2]


        data = {
            'Year': year,
            'Genre': genre,
            'Count': cnt
        }
        genre_count_list.append(data)
    return jsonify(genre_count_list)                               


# combined average rating and price per year
@app.route("/avg_rating_price")
def avg_rating_price():
    avg_rating_price_df = pd.read_sql_query(
                   ''' SELECT year, ROUND(avg(rating),2), ROUND(avg(price),2) FROM books \
                       GROUP BY year \
                       ORDER BY year
                   ''' , db)
    i = 0
    avg_rating_price_list = []
    for i in range(len(avg_rating_price_df.to_dict('split')['data'])):
        year = avg_rating_price_df.to_dict('split')['data'][i][0]
        avg_rating =  avg_rating_price_df.to_dict('split')['data'][i][1]
        avg_price =  avg_rating_price_df.to_dict('split')['data'][i][2]     

        data = {
            'Year': year,
            'AvgRating': avg_rating,
            'AvgPrice': avg_price

        }
        avg_rating_price_list.append(data)
    return jsonify(avg_rating_price_list)
   

@app.route("/year_bar")
def year_bar():
    year_bar_df = pd.read_sql_query(
                   ''' SELECT name, year, price, rating FROM books \
                       ORDER BY year
                   ''' , db)
    year_bar_list = [ ]
    for index, row in year_bar_df.iterrows():
        data = {
            "Year": row["year"],
            "Name": row["name"],
            "Rating": row["rating"],
            "Price": row["price"],
            }
        year_bar_list.append(data);
    return jsonify(year_bar_list)


@app.route("/author_count")
def author_count():
    author_count_df = pd.read_sql_query(
                   '''  SELECT author, COUNT(*) FROM books \
                        GROUP BY author \
                        ORDER BY author
                   ''' , db)
    i = 0
    author_count_list = []
    for i in range(len(author_count_df.to_dict('split')['data'])):
        author = author_count_df.to_dict('split')['data'][i][0]
        cnt = author_count_df.to_dict('split')['data'][i][1]

        data = {
            'Author': author,
            'Count': cnt
        }
        author_count_list.append(data)
    return jsonify(data=author_count_list)      

if __name__ == "__main__":
    app.run(debug=True)
