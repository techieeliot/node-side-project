drop database kanye;
create database kanye;
use kanye

create table quote (
    id int auto_increment,
    quote varchar(280),
    created_at timestamp,
    deleted_at timestamp,
    primary key (id)
)