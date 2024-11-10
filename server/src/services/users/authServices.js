import db from "../../config/users-db.js";
import responses from "../../utils/responses.js";
import bcrypt from "bcrypt";

export const addUser = (props) => {
  const { res, username, email, hashedPassword, fullname } = props;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password, fullname) VALUES (?,?,?,?)`,
      [username, email, hashedPassword, fullname],
      (err) => {
        if (err) {
          responses.serverError(res);
          return reject(new Error(`Database insertion failed: ${err.message}`));
        }

        resolve(true);
      }
    );
  });
};

export const getIdByEmail = (props) => {
  const { res, email } = props;

  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        responses.serverError(res);

        reject(false);
      } else if (!row) {
        responses.notFound(res, "User not found");
        reject(false);
      } else {
        resolve(row);
      }
    });
  });
};

export const updatePassword = async (props) => {
  const { id, newPassword } = props;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id],
      (err) => {
        if (err) {
          reject({ message: "There was an error server", code: 500 });
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
};
