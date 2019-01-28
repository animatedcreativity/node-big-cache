# node-big-cache
File based cache for large data. Data is stored in different files with different keys in a single folder.

-----------------------------------------------------

**Usage:**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
```

config:
```
{
  folder: "node-big-cache",
  jsonFile: "node-big-cache-json",
  cacheTime: 3600000 // milliseconds, default 1 hour
}
```
- folder: location of cache files. File name is created using a random key and extension is `.txt`. File key/name is always random and different than data key.
- jsonFile: JSON database which stores all the matches of data key with file key. `.json` is added to the file automatically.

------------------------------------------

**Example (set):**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
var cacheTime = 60000; // milliseconds, 60 seconds
cache.set("my_special_key", "This is some long data.", cacheTime);
```

Sets data for a key. Data is saved in utf-8 format and can be extremely long. If no cache time provided then default is used.

**Example (get):**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
var data = cache.get("my_special_key");
console.log(data);
```

Gets data for a key until it expires. Data is read in utf-8 format.

**Example (list):**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
var list = cache.list();
console.log(list);
```

Gets a list of all keys saved in database.

**Example (remove):**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
cache.remove("my_special_key");
```

Removes any key and its data if exists.

**Example (clear):**

```
var bigCache = require("node-big-cache");
var cache = new bigCache(config);
cache.clear();
```

Removes all the keys and their data.