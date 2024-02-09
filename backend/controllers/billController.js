const db = require("../helpers/db");

exports.billAddController = async (req, res) => {
    const { customer_id, received_date, received_time, delivery_date, delivery_time, total, advance, available_balance, items } = req.body;

    // Start a transaction
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json({ error: err });
        }

        try {
            // Insert into order_main table
            const orderMainResult = await new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO order_main(customer_id, received_date, received_time, delivery_date, delivery_time, total, advance, available_balance) VALUES (?,?,?,?,?,?,?,?)",
                    [customer_id, received_date, received_time, delivery_date, delivery_time, total, advance, available_balance],
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            });

            const orderMainId = orderMainResult.insertId;

            // Insert into order_items table within the loop
            for (const item of items) {
                await new Promise((resolve, reject) => {
                    db.query(
                        "INSERT INTO order_details(category_id, price_per_unit, qty, total, order_main_id) VALUES (?,?,?,?,?)",
                        [item.category_id, item.price_per_unit, item.qty, item.total, orderMainId],
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });
            }

            // Commit the transaction
            db.commit((err) => {
                if (err) {
                    return res.json({ error: err });
                }
                res.json({ message: "Bill added successfully" ,invoice_id:orderMainId});
            });
        } catch (error) {
            // Rollback the transaction in case of an error
            db.rollback(() => {
                res.json({ error: "Transaction failed. Changes rolled back." });
            });
        }
    });
};

exports.billGetAllController = async (req, res) => {
    db.query("select order_main.id as invoice_id,order_main.customer_id, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name from order_main JOIN customer ON order_main.customer_id = customer.id", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};
 
exports.billGetAllInvoiceNumbersController = async (req, res) => {
    db.query("select id from order_main", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};

exports.billGetAllMobileNumbersController = async (req, res) => {
    db.query("select customer.id,customer.mobile from order_main ,customer where order_main.customer_id = customer.id group by order_main.customer_id", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};

exports.billGetAllByInvoiceAndMobileController = async (req, res) => {
    const { invoice_id, customer_id } = req.body;
    db.query("select order_main.id as invoice_id,order_main.customer_id, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name from order_main JOIN customer ON order_main.customer_id = customer.id where order_main.id=? OR customer.id=?", [invoice_id, customer_id],(err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};

exports.billGetMainDetailsByIdController = async (req, res) => {
    const id = req.params.id;
    db.query("select order_main.id as invoice_id,DATE_FORMAT(STR_TO_DATE(order_main.received_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS received_date,order_main.received_time, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name,customer.mobile as Customer_mobile,customer.address from order_main JOIN customer ON order_main.customer_id = customer.id where order_main.id=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};

exports.billGetOrderItemDetailsByIdController = async (req, res) => {
    const id = req.params.id;
    db.query("select category.name ,order_details.price_per_unit,order_details.qty,order_details.total from order_details JOIN category ON order_details.category_id = category.id where order_details.order_main_id=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
};

exports.billSettleByIdController = async (req, res) => {
    const id = req.params.id;
    db.query("update order_main set available_balance=0 where id=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json("Bill settled");
        }
    })
};

exports.billDeleteController = async (req, res) => {
    const { billIDs } = req.body;

    // Start a transaction
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json({ error: err });
        }

        try {
            // Loop through each billID and delete the corresponding record
            for (const billID of billIDs) {
                await new Promise((resolve, reject) => {
                    db.query("DELETE FROM order_main WHERE id=?", [billID], (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
            }

            // Commit the transaction if all deletions are successful
            db.commit((err) => {
                if (err) {
                    return res.json({ error: err });
                }
                res.json("Orders Deleted");
            });
        } catch (error) {
            // Rollback the transaction in case of an error
            db.rollback(() => {
                res.json({ error: "Transaction failed. Changes rolled back." });
            });
        }
    });
};
