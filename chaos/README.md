> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

***Complete as many questions as you can.***

## Question 1

You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": [
    "Hello",
    1,
    5,
    "World",
    "!"
  ]
}
```

the handler returns the following JSON:

```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)

Write SQL (Postgres) `CREATE` statements to create the following schema. Be sure to include foreign keys to appropriately model the relationships and,
if appropriate, make relevant tables `CASCADE` upon deletion. You may enrich the tables with additional columns should you wish. To help you answer
the question, a simple diagram is provided.
![Database Schema](db_schema.png)

**Answer box:**

```postgresql
CREATE TABLE IF NOT EXISTS "Users"
(
    -- Identification
    id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "playlists"
(
    -- Identification
    id      INTEGER PRIMARY KEY,
    user_id INTEGER,

    -- Playlist information
    name    TEXT,

    -- Foreign keys
    CONSTRAINT fkey_playlists_user_id FOREIGN KEY (user_id)
        REFERENCES "Users" (id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "songs"
(
    -- Identification
    id       INTEGER PRIMARY KEY,

    -- Song information
    title    TEXT,
    artist   TEXT,
    duration INTERVAL
);

CREATE TABLE IF NOT EXISTS "playlist_songs"
(
    -- Identification
    playlist_id INTEGER,
    song_id     INTEGER,

    -- Primary key
    PRIMARY KEY (playlist_id, song_id),

    -- Foreign keys
    CONSTRAINT fkey_playlists_songs_playlist_id FOREIGN KEY (playlist_id)
        REFERENCES "playlists" (id)
        ON DELETE CASCADE,
    CONSTRAINT fkey_playlists_songs_song_id FOREIGN KEY (song_id)
        REFERENCES "songs" (id)
        ON DELETE CASCADE
);
```

### b)

Using the above schema, write an SQL `SELECT` query to return all songs in a playlist in the following format, given the playlist id `676767`

```
| id  | playlist_id | title                                      | artist      | duration |
| --- | ----------- | ------------------------------------------ | ----------- | -------- |
| 4   | 676767      | Undone - The Sweater Song                  | Weezer      | 00:05:06 |
| 12  | 676767      | She Wants To Dance With Me - 2023 Remaster | Rick Astley | 00:03:18 |
| 53  | 676767      | Music                                      | underscores | 00:03:27 |
```

**Answer box:**

```sql
SELECT "songs"."id",
       "playlist_songs"."id"                     as "playlist_id",
       "songs"."title",
       "songs"."artist",
       TO_CHAR("songs"."duration", 'HH24:MI:SS') as "duration"
FROM "playlist_songs"
         JOIN "songs"
WHERE "playlist_songs"."playlist_id" = 676767
```