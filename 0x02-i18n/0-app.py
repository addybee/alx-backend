#!/usr/bin/env python3
"""
This is a basic Flask application.
"""

from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def hello() -> str:
    """
    This function is a route handler for the root URL of the application.
    It renders an HTML template named '0-index.html'.
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
