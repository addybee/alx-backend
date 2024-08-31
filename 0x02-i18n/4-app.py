#!/usr/bin/env python3
"""
This is a basic Flask application.
"""

from flask import Flask, render_template, request
from flask_babel import Babel
from typing import Optional
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


app.config.from_object(Config)


@babel.localeselector
def get_locale() -> Optional[str]:
    '''
    Returns the best language locale based on user preferences.

    Checks the 'locale' parameter in the request args and matches
    it with supported languages in the app configuration. If a match is found,
    returns the language. Otherwise, determines the best language match based
    on user's accepted languages.

    Returns:
        Optional[str]: The best language locale or None if no match is found.
    '''
    lang = request.args.get('locale', None)
    if lang and lang in app.config['LANGUAGES']:
        return lang

    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello() -> str:
    """
    Route handler for the root URL of the application.
    Renders the '4-index.html' HTML template.
    Returns the rendered template.
    """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run()
