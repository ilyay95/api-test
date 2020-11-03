create table users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	age INT(50) NOT NULL
);
insert into users (id, first_name, age) values (1, 'Idette', 50);
insert into users (id, first_name, age) values (2, 'Nikolas', 28);