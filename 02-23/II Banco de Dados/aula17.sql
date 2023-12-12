DROP DATABASE IF EXISTS av2a;
CREATE DATABASE IF NOT EXISTS av2a;
USE av2a;

CREATE TABLE uf (
 id    INT AUTO_INCREMENT,
 sigla CHAR(2) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE cidade (
 id      INT AUTO_INCREMENT,
 uf_id   INT NOT NULL,
 nome    VARCHAR(45) NOT NULL,
 capital BOOLEAN,
 PRIMARY KEY (id),
 FOREIGN KEY (uf_id) REFERENCES uf(id)
);

CREATE TABLE atleta (
 id         INT AUTO_INCREMENT,
 cidade_id  INT NOT NULL,
 apelido    VARCHAR(45) NOT NULL,
 altura     DECIMAL(10,2),
 peso       DECIMAL(10,2),
 PRIMARY KEY (id),
 FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

