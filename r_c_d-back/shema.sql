CREATE TABLE IF NOT EXISTS user (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(40) NOT NULL,
  activation_status VARCHAR(10) NOT NULL,
  activation_link VARCHAR(40) NOT NULL,
  registration_date INT(11) unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS token (
  user_id varchar(255) NOT NULL,
  refresh_token varchar(255) NOT NULL,
);
