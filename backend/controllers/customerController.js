const db = require("../helpers/db");

exports.customerAddController = async (req, res) => {
    const { name, address, mobile } = req.body;
    db.query("insert into customer(name,address,mobile) values(?,?,?)", [name, address, mobile], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else { 
            res.json("customer Added");
        }
    })
}


exports.customerUpdateController = async (req, res) => {
    const id = req.params.id;
    const { name, address, mobile } = req.body;
    db.query("update customer set name=? , address=?,mobile=? where id=?", [name, address, mobile,id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json("customer Updated");
        }
    })
}



exports.customerGetController = async (req, res) => {
    const id = req.params.id;
    const { name, address, mobile } = req.body;
    db.query("select name,address,mobile from customer where id=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result[0]);
        }
    })
}

exports.customerMobileNumberGetController = async (req, res) => {
    db.query("select id,mobile from customer",  (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(result);
        }
    })
}
