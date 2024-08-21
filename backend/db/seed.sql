\c ausome_dev;

-- Insert users with funny puns on their names
INSERT INTO users (email, username, password_hash, profile_picture, bio) VALUES
('punnyuser1@example.com', 'Olive Yew', 'password123', 'profile1.png', 'I love you!'),
('punnyuser2@example.com', 'Anita Bath', 'password123', 'profile2.png', 'I need a bath.'),
('punnyuser3@example.com', 'Chris P. Bacon', 'password123', 'profile3.png', 'Crispy bacon, anyone?'),
('punnyuser4@example.com', 'Lois Carmen Denominator', 'password123', 'profile4.png', 'Math is life.'),
('punnyuser5@example.com', 'Paige Turner', 'password123', 'profile5.png', 'I flip through life.'),
('punnyuser6@example.com', 'Sue Yu', 'password123', 'profile6.png', 'I’m always ready for court.'),
('punnyuser7@example.com', 'Marge Innovera', 'password123', 'profile7.png', 'Change is inevitable.'),
('punnyuser8@example.com', 'Al Beback', 'password123', 'profile8.png', 'I’ll be back.'),
('punnyuser9@example.com', 'Rick O’Shea', 'password123', 'profile9.png', 'I bounce back quickly.'),
('punnyuser10@example.com', 'Dustin T. Wind', 'password123', 'profile10.png', 'Gone with the wind.'),
('punnyuser11@example.com', 'Barb Dwyer', 'password123', 'profile11.png', 'Watch out, I’m sharp.'),
('punnyuser12@example.com', 'Harry Shins', 'password123', 'profile12.png', 'I’m a hairy situation.'),
('punnyuser13@example.com', 'Justin Case', 'password123', 'profile13.png', 'Just in case, I’m here.'),
('punnyuser14@example.com', 'Sue Flay', 'password123', 'profile14.png', 'I’m the master of all dishes.'),
('punnyuser15@example.com', 'Tim Burr', 'password123', 'profile15.png', 'I’m falling for you.'),
('punnyuser16@example.com', 'Sal Monella', 'password123', 'profile16.png', 'I’m dangerous if undercooked.'),
('punnyuser17@example.com', 'Eileen Dover', 'password123', 'profile17.png', 'I bend but don’t break.'),
('punnyuser18@example.com', 'Don Keigh', 'password123', 'profile18.png', 'I do the heavy lifting.'),
('punnyuser19@example.com', 'Gene Poole', 'password123', 'profile19.png', 'I’m where life begins.'),
('punnyuser20@example.com', 'Warren Peace', 'password123', 'profile20.png', 'I’m always at peace.');

-- Insert posts for the users
INSERT INTO posts (user_id, content) VALUES
(1, 'Olive you all so much!'),
(2, 'Feeling like I really need a bath today.'),
(3, 'Cooking up some crispy bacon!'),
(4, 'Math puns make me irrational.'),
(5, 'Just flipped through another great book!'),
(6, 'Court is now in session.'),
(7, 'Embrace the change, it’s inevitable.'),
(8, 'I’ll be back, just like I said!'),
(9, 'Bouncing back from a rough day.'),
(10, 'Gone with the wind, and loving it.'),
(11, 'Sharp minds think alike.'),
(12, 'Hairy situations are my specialty.'),
(13, 'Just in case you were wondering, I’m here.'),
(14, 'Cooking up a storm in the kitchen!'),
(15, 'Falling for the puns today.'),
(16, 'Careful with that chicken, folks!'),
(17, 'Bending over backwards today!'),
(18, 'Lifting heavy things, one rep at a time.'),
(19, 'Swimming in the gene pool of life.'),
(20, 'Peace out, everyone.');

-- Insert likes on various posts
INSERT INTO likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 2),
(5, 2), (6, 3), (7, 3),
(8, 4), (9, 4), (10, 5),
(11, 5), (12, 6), (13, 6),
(14, 7), (15, 7), (16, 8),
(17, 8), (18, 9), (19, 9),
(20, 10), (1, 10), (3, 11),
(5, 12), (7, 13), (9, 14),
(11, 15), (13, 16), (15, 17),
(17, 18), (19, 19), (2, 20);

-- Insert comments on various posts
INSERT INTO comments (user_id, post_id, content) VALUES
(2, 1, 'Olive this post!'),
(3, 1, 'So much love here!'),
(4, 2, 'You really do, don’t you?'),
(5, 2, 'Nothing like a good bath!'),
(6, 3, 'Crispy and delicious!'),
(7, 3, 'Bacon for everyone!'),
(8, 4, 'Math is life indeed!'),
(9, 4, 'Irrationally funny!'),
(10, 5, 'Can’t stop flipping pages!'),
(11, 5, 'Books are the best.'),
(12, 6, 'Court is now in session!'),
(13, 6, 'Let’s get to the verdict.'),
(14, 7, 'Change is inevitable indeed.'),
(15, 7, 'Embrace the change!'),
(16, 8, 'Can’t wait to see you back!'),
(17, 8, 'We’ll be here when you return.'),
(18, 9, 'Bounce back stronger!'),
(19, 9, 'Resilience is key.'),
(20, 10, 'Gone but not forgotten!'),
(1, 10, 'Loving the wind today.'),
(3, 11, 'Sharp minds think alike.'),
(5, 12, 'Hairy situations are tough.'),
(7, 13, 'Just in case, I’m here.'),
(9, 14, 'Cooking up something special!'),
(11, 15, 'Falling for these puns.'),
(13, 16, 'Undercooked indeed!'),
(15, 17, 'Bending but not breaking.'),
(17, 18, 'Heavy lifting all day!'),
(19, 19, 'Swimming in the gene pool!'),
(2, 20, 'Peace out everyone.');

-- Insert friends relationships
INSERT INTO friends (user_id, friend_id, status) VALUES
(1, 2, 'accepted'), (1, 3, 'accepted'), (1, 4, 'pending'),
(2, 5, 'accepted'), (2, 6, 'pending'), (3, 7, 'accepted'),
(3, 8, 'accepted'), (4, 9, 'accepted'), (4, 10, 'pending'),
(5, 11, 'accepted'), (5, 12, 'pending'), (6, 13, 'accepted'),
(6, 14, 'pending'), (7, 15, 'accepted'), (7, 16, 'pending'),
(8, 17, 'accepted'), (8, 18, 'pending'), (9, 19, 'accepted'),
(9, 20, 'pending'), (10, 1, 'accepted'), (11, 2, 'accepted'),
(12, 3, 'accepted'), (13, 4, 'accepted'), (14, 5, 'accepted'),
(15, 6, 'accepted'), (16, 7, 'accepted'), (17, 8, 'accepted'),
(18, 9, 'accepted'), (19, 10, 'accepted'), (20, 11, 'accepted');
