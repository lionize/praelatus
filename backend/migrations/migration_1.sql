/* 1 */
create table if not exists db_info(
    db_version integer,
);

insert into db_info (db_version) VALUES (1);

create table if not exists users (
    id         serial primary key,
    email      varchar(100) NOT NULL UNIQUE,
    username   varchar(100) NOT NULL UNIQUE,
    password   varchar(250) NOT NULL,
    fullName   varchar(250) NOT NULL,
    profilePic varchar(250) NOT NULL
);

create table if not exists jobs (
    id        serial primary key,
    name      varchar(250) NOT NULL,
    note_name varchar(250) NOT NULL,
    body      varchar(250),
    owner     integer references users(id)
);

create table if not exists job_notifications (
    job_id  integer references jobs(id) NOT NULL,
    user_id integer references users(id) NOT NULL
);
