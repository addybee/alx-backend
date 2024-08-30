#!/usr/bin/env python3
"""
This is a basic Flask application.
"""

from flask import Flask, render_template, request
from flask_babel import Babel  # type: ignore
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
    """
        Returns the best-matching language for the user based on the accepted
        languages in the request headers and the available languages in
        the app configuration.

    Returns:
        str | None: The best-matching language code or None if no match found.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello() -> str:
    """
    This function is a route handler for the root URL of the application.
    It renders an HTML template named '0-index.html'.
    """
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run()
