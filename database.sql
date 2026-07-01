-- Run this script in your Neon Database SQL Editor to create the necessary tables.

CREATE TABLE IF NOT EXISTS active_images (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    section_type VARCHAR(50) NOT NULL, -- e.g., 'live_stream' or 'top_selling'
    alt_text VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert the default Live Stream images so the website doesn't break initially
INSERT INTO active_images (url, section_type, alt_text) VALUES 
('iphone_front.png', 'live_stream', 'Premium iPhone Showroom Display - Front'),
('iphone_back.png', 'live_stream', 'Premium iPhone Showroom Display - Back'),
('samsung_front.png', 'live_stream', 'Premium Samsung Showroom Display - Front'),
('samsung_back.png', 'live_stream', 'Premium Samsung Showroom Display - Back'),
('family_buying_mobile.png', 'live_stream', 'Happy family buying a mobile phone'),
('happy_customer_mobile.png', 'live_stream', 'Happy customer with brand new mobile phone'),
('repairing_mobile.png', 'live_stream', 'Technician repairing phone');
