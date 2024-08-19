#!/usr/bin/env python3
"""
this module is for index range function and server class
"""
import csv
import math
from typing import List


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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieve a specific page of data from the dataset."""
        assert (isinstance(page, int) and
                isinstance(page_size, int) and
                page > 0 and
                page_size > 0)
        data = self.dataset() if self.__dataset is None else self.__dataset
        start, end = index_range(page, page_size)
        length = len(data)
        if start >= length or end >= length:
            return []
        return self.__dataset[start:end]
