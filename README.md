# List of words that end in -us that, in plural form, end in -i

**Input**: wordslist.txt

**Output**: us-list.txt - total of 559 words out of 479829, or 0.12%, approximately


## To Run

```
$ git clone [this repo]
$ cd [this repo]
$ node index
```

(built on node v7.9)

## Implementation

* If a word ends in -us *and* in plural form it ends in -i, then the plural form will always be before the singular form for that word in the corpus (assuming corpus is alphabetized, which it is).
* As such, we store two data structures, an array and an object. The array is the entire list of words, split by new line. For each word, we check to see if it ends in -us *and* we add to object as `true`.
* WHEN we find a word ending in -us, we look at the object (which contains all words we have looped through so far) and see if we can find the plural form. If we can, we clear the object (so tht lookup times stay fast...ish) and continue our way.
