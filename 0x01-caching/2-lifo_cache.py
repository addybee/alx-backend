#!/usr/bin/env python3
""" LIFO caching """


BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """LIFO caching implementation using a queue to manage items in the cache.
    """
    def __init__(self):
        """Initialize"""
        super().__init__()
        self.__queue = []

    def en_and_de_queue(self, key, item):
        """ Inserts an item into a FIFO queue,
            managing cache items based on a FIFO strategy.
        """
        if len(self.__queue) >= self.MAX_ITEMS:
            if key not in self.__queue:
                dkey = self.__queue.pop()
                print("DISCARD: {}".format(dkey))
                del self.cache_data[dkey]
            else:
                self.__queue.remove(key)
            self.__queue.append(key)
        else:
            self.__queue.append(key)
        self.cache_data.update({key: item})

    def put(self, key, item):
        """ Add an item in the cache
        """
        if item is None or key is None:
            return
        self.en_and_de_queue(key, item)

    def get(self, key):
        """ Get an item by key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
