const db = require("../helpers/db");
const { Printer, Image } = require("@node-escpos/core");
const USB = require("@node-escpos/usb-adapter");
const { join } = require("path");
const bill_count = 1;

exports.billAddController = async (req, res) => {
    const {
        customer_id,
        received_date,
        received_time,
        delivery_date,
        delivery_time,
        total,
        advance,
        available_balance,
        items,
    } = req.body;

    let customerData = {};
    let resultDetails = [];
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
                    [
                        customer_id,
                        received_date,
                        received_time,
                        delivery_date,
                        delivery_time,
                        total,
                        advance,
                        available_balance,
                    ],
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
                        [
                            item.category_id,
                            item.price_per_unit,
                            item.qty,
                            item.total,
                            orderMainId,
                        ],
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });
            }

            const customerRequest = await new Promise((resolve, reject) => {
                db.query(
                    "select name,mobile from customer where id=?",
                    [customer_id],
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            });

            customerData = customerRequest;

            const orderDetailsRequest = await new Promise((resolve, reject) => {
                db.query(
                    "select category.name , category.type,order_details.price_per_unit,order_details.price_per_unit,order_details.qty,order_details.total from category,order_details where order_details.category_id=category.id and order_details.order_main_id=?",
                    [orderMainId],
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            });
            resultDetails = orderDetailsRequest;

            // Commit the transaction
            db.commit((err) => {
                if (err) {
                    return res.json({ error: err });
                }



                try {
                    const device = new USB();


                    device.open(async function (err) {
                        if (err) {
                            console.error("Error opening USB device:", err);
                            return;
                        }




                        try {


                            const options = { encoding: "GB18030" /* default */ };
                            let printer = new Printer(device, options);



                            // Path to logo image (top left)
                            const logoFilePath = join("./logo.png");
                            const logoImage = await Image.load(logoFilePath);

                            // Store name
                            const storeName = "DIRTY 2 BEAUTY LAUNDRY";

                            // Address
                            const address1 = "No.264, Bandarnayaka Mawatha,";
                            const address2 = "Katubedaa, Moratuwa";

                            // Mobile numbers
                            const mobileNumber1 = "Tel: 070 61 61 064";
                            const mobileNumber2 = "Tel: 078 61 61 064";

                            // Working hours
                            const workingHours = "Working Hours: Mon-Sun 7am-6pm";

                            // Invoice details
                            const invoiceNumber = "Invoice No: " + orderMainId;
                            const receivedDateTime =
                                "Received: " + received_date + " " + received_time;
                            const deliveredDateTime =
                                "Delivery: " + delivery_date + " " + delivery_time;

                            // Customer details
                            const customerName = "Customer: " + customerData[0].name;
                            const customerPhone = "Phone: " + customerData[0].mobile;

                            // Full total, advance payment, remaining payment
                            const fullTotal = total; // Replace with your own calculation
                            const advancePayment = advance; // Replace with your own calculation
                            const remainingPayment = available_balance;

                            // Thank you message
                            const thankYouMessage = "Thank you, Come again!";
                            const disclaimer1 = "We are not responsible";
                            const disclaimer2 = "after 1 month for any losses";

                            // Footer
                            const footer = "(c) 2024 Code with X  / 077 59 64 727";

                            for (let i = 0; i < bill_count; i++) {


                                printer = await printer.align("CT").image(
                                    logoImage,
                                    "s8" // changing with image,
                                );

                                // Start printing
                                printer
                                    .font("a")
                                    .align("ct")
                                    .style("B")
                                    .size(1, 2)
                                    .text(storeName)
                                    .style("NORMAL")
                                    .size(1, 1) // Store name
                                    .text(address1) // Address1
                                    .text(address2) // Address2
                                    .text(mobileNumber1) // Mobile numbers
                                    .text(mobileNumber2) // Mobile numbers
                                    .text(workingHours) // Working hours
                                    .text("-".repeat(48))
                                    .text(invoiceNumber) // Invoice details
                                    .text(receivedDateTime)
                                    .text(deliveredDateTime)
                                    .text("-".repeat(48))
                                    .text(customerName) // Customer details
                                    .text(customerPhone)
                                    .text("-".repeat(48))
                                    .align("lt") // Align left for item details
                                    .tableCustom(
                                        [
                                            {
                                                text: "Category",
                                                align: "LEFT",
                                                width: 0.33,
                                                style: "B",
                                            },
                                            { text: "Qty", align: "LEFT", width: 0.33, style: "B" },
                                            { text: "Price", align: "LEFT", width: 0.33, style: "B" },
                                            { text: "Total", align: "LEFT", width: 0.33, style: "B" },
                                        ],
                                        { encoding: "cp857", size: [1, 1] }
                                    );

                                // Print item categories
                                resultDetails.forEach((item) => {
                                    const { name, qty, price_per_unit, total, type } = item;
                                    printer.tableCustom(
                                        [
                                            { text: name, align: "LEFT", width: 0.33, style: "B" },
                                            {
                                                text: qty.toFixed(2),
                                                align: "LEFT",
                                                width: 0.33,
                                                style: "B",
                                            },
                                            {
                                                text: price_per_unit.toFixed(2),
                                                align: "LEFT",
                                                width: 0.33,
                                                style: "B",
                                            },
                                            {
                                                text: total.toFixed(2),
                                                align: "LEFT",
                                                width: 0.33,
                                                style: "B",
                                            },
                                        ],
                                        { encoding: "cp857", size: [1, 1] }
                                    );
                                });

                                // Print totals and messages
                                printer
                                    .font("a")
                                    .align("ct")
                                    .text("-".repeat(48))
                                    .text(`Total Amount: ${fullTotal.toFixed(2)}`)
                                    .text(`Advance Payment: ${advancePayment.toFixed(2)}`)
                                    .text(`Remaining Balance: ${remainingPayment.toFixed(2)}`)
                                    .text("-".repeat(48))
                                    .text(thankYouMessage)
                                    .text("-".repeat(48))
                                    .text(disclaimer1)
                                    .text(disclaimer2)
                                    .text("-".repeat(48))
                                    .text(footer)
                                    .text("")
                                    .text("")
                                    .cut();


                            }

                            printer.close();




                        } catch (error) {
                            console.error("Error printing:", error);
                        }





                    });




                } catch (error) {
                    //console.log(error);
                    res.json({
                        message: "Bill added successfully",
                        invoice_id: orderMainId,
                    });
                }


                res.json({
                    message: "Bill added successfully",
                    invoice_id: orderMainId,
                });

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
    db.query(
        "select order_main.id as invoice_id,order_main.customer_id, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name from order_main JOIN customer ON order_main.customer_id = customer.id",
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(result);
            }
        }
    );
};

exports.billGetAllInvoiceNumbersController = async (req, res) => {
    db.query("select id from order_main", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    });
};

exports.billGetAllMobileNumbersController = async (req, res) => {
    db.query(
        "select customer.id,customer.mobile from order_main ,customer where order_main.customer_id = customer.id group by order_main.customer_id",
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(result);
            }
        }
    );
};

exports.billGetAllByInvoiceAndMobileController = async (req, res) => {
    const { invoice_id, customer_id } = req.body;
    db.query(
        "select order_main.id as invoice_id,order_main.customer_id, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name from order_main JOIN customer ON order_main.customer_id = customer.id where order_main.id=? OR customer.id=?",
        [invoice_id, customer_id],
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(result);
            }
        }
    );
};

exports.billGetMainDetailsByIdController = async (req, res) => {
    const id = req.params.id;
    db.query(
        "select order_main.id as invoice_id,DATE_FORMAT(STR_TO_DATE(order_main.received_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS received_date,order_main.received_time, DATE_FORMAT(STR_TO_DATE(order_main.delivery_date, '%Y-%m-%dT%H:%i:%s.000Z'), '%Y-%m-%d') AS delivery_date, order_main.delivery_time, order_main.total, order_main.advance, order_main.available_balance,customer.name as Customer_name,customer.mobile as Customer_mobile,customer.address from order_main JOIN customer ON order_main.customer_id = customer.id where order_main.id=?",
        [id],
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(result);
            }
        }
    );
};

exports.billGetOrderItemDetailsByIdController = async (req, res) => {
    const id = req.params.id;
    db.query(
        "select category.name ,order_details.price_per_unit,order_details.qty,order_details.total from order_details JOIN category ON order_details.category_id = category.id where order_details.order_main_id=?",
        [id],
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(result);
            }
        }
    );
};

exports.billSettleByIdController = async (req, res) => {
    const id = req.params.id;
    db.query(
        "update order_main set available_balance=0 where id=?",
        [id],
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json("Bill settled");
            }
        }
    );
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
                    db.query(
                        "DELETE FROM order_main WHERE id=?",
                        [billID],
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
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
