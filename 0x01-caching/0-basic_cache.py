#!/usr/bin/env python3
""" Basic dictionary """


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache (BaseCaching):

    """ BasicCache class that extends BaseCaching to implement put and get
        methods for caching key-value pairs.
    """
    def put(self, key, item):
        """ Add an item in the cache
        """
        if item is None or key is None:
            return
        self.cache_data.update({key: item})

    def get(self, key):
        """ Get an item by key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
