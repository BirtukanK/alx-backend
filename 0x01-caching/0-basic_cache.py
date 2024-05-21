#!/usr/bin/python3
""" Defines Basic cache """


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ Basic cache class"""

    def __init__(self):
        """ init method for basic cache class"""
        super().__init__()

    def put(self, key, item):
        """ puts value to dictionary"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ gets value from dictionary"""
        if key is None or key not in self.cache_data:
            return
        return self.cache_data[key]
