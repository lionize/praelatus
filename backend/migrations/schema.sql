/* 1 */
create table if not exists users (
    id         serial primary key,
    username   varchar(100),
    password   varchar(250),
    email      varchar(100),
    fullName   varchar(250),
    profilePic varchar(250)
);

create table if not exists jobs (
    id serial primary key,
    name varchar(250),
    body varchar(250),
    owner integer references users(id)
);

create table if not exists job_notifications (
    job_id integer references jobs(id),
    user_id integer references users(id)
);
