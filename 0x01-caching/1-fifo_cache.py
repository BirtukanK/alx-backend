#!/usr/bin/python3
""" FIFO cache """


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFO Cache class"""

    def __init__(self):
        """ init method"""
        super().__init__()

    def put(self, key, item):
        """ puts item to dictionary"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            first_key, _ = next(iter(self.cache_data.items()))
            del self.cache_data[first_key]
            print(f"DISCARD: {first_key}")
        self.cache_data[key] = item

    def get(self, key):
        """ Gets item from dictionary"""
        if key is None or key not in self.cache_data:
            return
        return self.cache_data[key]
