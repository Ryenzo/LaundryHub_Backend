import LaundryOrder from "../models/LaundryOrder.js";

export const createOrder = async (req, res) => {
  const { serviceType, weight, pickupDate } = req.body;

  const order = await LaundryOrder.create({
    customer: req.user._id,
    serviceType,
    weight,
    pickupDate,
    status: "pending"
  });

  res.status(201).json(order);
};

export const getOrdersByUser = async (req, res) => {
  const orders = await LaundryOrder.find({ customer: req.user._id });
  res.json(orders);
};
