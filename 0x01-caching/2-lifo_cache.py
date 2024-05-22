#!/usr/bin/python3
""" LIFO cache """


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFO Cache class"""

    def __init__(self):
        """ init method"""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ puts item to dictionary"""
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.order.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            # Discard the last item put in cache (LIFO algorithm)
            last_key = self.order.pop()
            del self.cache_data[last_key]
            print(f"DISCARD: {last_key}")

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """ Gets item from dictionary"""
        if key is None or key not in self.cache_data:
            return
        return self.cache_data[key]
