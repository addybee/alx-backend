#!/usr/bin/env python3
"""
This is a basic Flask application.
"""

from flask import Flask, render_template
from flask_babel import Babel
app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    configuration class for flask app
    """
    LANGUAGES = ['en', 'fr']
    # Set Babel's default locale
    BABEL_DEFAULT_LOCALE = 'en'

    # Set Babel's default timezone
    BABEL_DEFAULT_TIMEZONE = 'UTC'


@app.route('/')
def hello() -> str:
    """
    This function is a route handler for the root URL of the application.
    It renders an HTML template named '0-index.html'.
    """
    return render_template('1-index.html')


app.config.from_object(Config)


if __name__ == '__main__':
    app.run()
