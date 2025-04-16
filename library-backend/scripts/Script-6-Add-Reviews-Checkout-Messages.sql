 INSERT INTO review VALUES
	(1, 'example1user@email.com', NOW(), 4, 1, 'First book is pretty good book overall'),
	(2, 'example2user@email.com', NOW(), 4.5, 2, 'Second books is pretty good book overall');

 INSERT INTO checkout VALUES
 	(1, 'example1user@email.com', '2022-05-22', '2022-06-25', 1),
     (2, 'example2user@email.com', '2022-05-22', '2022-06-26', 1),
     (3, 'example1user@email.com', '2022-05-22', '2022-06-01', 2);

 INSERT INTO messages VALUES
 	(1, 'example3user@email.com', 'What should we do here?', 'I have been trying to work this out for a long time and no matter what happens I cannot figure this dang thing out', 'example1user@email.com', 'I do not know what to tell you friend. You are on your own.', 1),
     (2, 'example2user@email.com', 'What should we do here example 2 user?', 'I have been trying to work this out for a long time and no matter what happens I cannot figure this dang thing out', 'example1user@email.com', 'I do not know what to tell you friend. You are on your own.',  1);
