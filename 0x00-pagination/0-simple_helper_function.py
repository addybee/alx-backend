#!/usr/bin/env python3
"""
this module is for index range function
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate the start and end index for a given page and page size.

    Parameters:
    - `page`: An integer representing the page number.
    - `page_size`: An integer representing the size of each page.

    Returns:
    A tuple containing the start and end index for the specified page.
    """
    return (page - 1) * page_size, page * page_size
