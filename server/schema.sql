-- SQLite version of the database schema for Cloudflare D1

-- This will drop the existing table and clear all previous data
DROP TABLE IF EXISTS active_images;

-- Create the fresh empty table
CREATE TABLE active_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    section_type TEXT NOT NULL,
    alt_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Note: We have removed the default images. 
-- The database is now completely empty and ready for fresh Base64 uploads!
