import bcrypt from "bcrypt";
import db from "../../config/users-db.js";

export const getPassword = (props) => {
  const { id, oldPassword, newPassword } = props;

  return new Promise((resolve, reject) => {
    db.get(`SELECT password FROM users WHERE id = ?`, id, (err, row) => {
      if (err) {
        reject({ message: "There was an error server", code: 500 });
      } else if (!row) {
        console.log(id);

        reject({ message: "User not found", code: 404 });
      } else {
        bcrypt.compare(oldPassword, row.password, (err, result) => {
          if (err) {
            reject({ message: "There was an error server", code: 500 });
          } else if (!result) {
            reject({ message: "Incorrect Password", code: 400 });
          } else {
            bcrypt.compare(oldPassword, newPassword, (err) => {
              if (err) {
                reject({ message: "There was an error server", code: 500 });
              } else if (oldPassword === newPassword) {
                reject({
                  message: "The new password can not be the same",
                  code: 409,
                });
              } else {
                resolve(true);
              }
            });
          }
        });
      }
    });
  });
};

export const searchEmail = (value) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT email FROM users WHERE email = ?`, [value], (err, user) => {
      if (err) {
        return reject({ message: "There was an error server", code: 500 });
      }
      return resolve(user);
    });
  });
};

export const searchPassword = (value, req) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password FROM users WHERE email = ?`,
      [req.body.email],
      (err, row) => {
        if (err) {
          reject({ message: "There was an error server", code: 500 });
        } else if (!row) {
          reject({ message: "User not found", code: 404 });
        } else {
          bcrypt.compare(value, row.password, (err, result) => {
            if (err) {
              reject({ message: "There was an error server", code: 500 });
            }

            if (!result) {
              reject({ message: "Incorrect Password", code: 400 });
            }

            resolve(true);
          });
        }
      }
    );
  });
};

export const searchUsername = (value) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT username FROM users WHERE username = ?`,
      [value],
      (err, user) => {
        if (err) {
          reject({ message: "There was an error server", code: 500 });
        }

        if (user) {
          reject({ message: "Username is already in use", code: 409 });
        }

        resolve(true);
      }
    );
  });
};
