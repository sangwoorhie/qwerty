const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/cusAuthMiddleware.js');
const ceoAuthMiddleware = require('../middlewares/ceoAuthMiddleware.js');

const { Orders, OrderMenus, Users, sequelize, Stores, Menus } = require('../models/index.js');
const { Op, Sequelize, Transaction, QueryTypes } = require('sequelize');

// 0. 고객 주문 메뉴 생성 (POST) (성공)
router.post('/user/store/:storeId/order/menu/:menuId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { quantity } = req.body;
  const { menuId } = req.params;

  const menu = await Menus.findOne({ where: { menuId } });
  const totalPrice = quantity * menu.price;
  console.log(userId, parseInt(menuId), quantity, totalPrice);
  try {
    await OrderMenus.create({ userId, menuId: parseInt(menuId), quantity, totalPrice});
    return res.status(200).json({ message: '성공' });
  } catch(error){
    console.log(error)
    return res.status(400).json({ message: '실패' });
  }
});

// 1. 고객 주문 생성 (POST) (성공)
router.post('/user/store/:storeId/order', authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { address } = req.body;
    const { storeId } = req.params
    // storeId = Number(storeId)

    const orderMenus = await OrderMenus.findAll({
      attributes: ['totalPrice'],
      where: { userId },
    });
    let payAmount = 0;
    orderMenus.forEach((orderMenu) => {
      payAmount += orderMenu.totalPrice;
    });
    console.log('payAmount', payAmount)
    const user = await Users.findOne({ where: { userId } });
    if (user.point > payAmount) {
      const afterpoint = user.point - payAmount;
      console.log('afterpoint', afterpoint)
      await Users.update({ point: afterpoint }, { where: { userId }});
      console.log(userId, storeId, payAmount, address)
      await Orders.create({ userId, storeId, payAmount, address });
    } else {
      return res.status(500).json({message: '잔액이 부족합니다. '})
    }
    const order = await Orders.findOne({
      where: { [Op.and]: [{ userId }, { storeId }, { status: false }] }
    })
    await OrderMenus.update({ orderId: order.orderId, status: true }, { where: { status: false } })
    await Orders.update({ status: true }, { where: { [Op.and]: [{ userId }, { storeId }] }})
    return res.status(200).json({ message: '주문 완료!'})
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

// const transaction = await sequelize.transaction({
//   isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
// });
// try{
//   const orderMenus = await OrderMenus.findAll({
//       attributes:['totalPrice'],
//       where: { userId },
//   });
//   let payAmount = 0
//   orderMenus.forEach((orderMenu) => {
//       payAmount += orderMenu.totalPrice
//   })
//   const user = await Users.findOne({ where: { userId } });
//   if (user.point > payAmount) {
//     const afterpoint = user.point - payAmount;
//     await Users.update({ point: afterpoint }, { transaction });
//     await Orders.create({ userId, storeId, payAmount, address }, { transaction });
//     await transaction.commit();
//   }
// } catch (error) {
//   await transaction.rollback();
//   return res.status(500).json({message: 'Transaction Error!'})
// }

// 2. 고객이 배달을 받았는지 여부 (POST) (성공)
router.post('/user/order/:orderId/delivery', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { orderId } = req.params
  try {
    await Orders.update({ delivery: true }, { where: { [Op.and]: [ { userId }, {orderId} ] }});
    return res.status(200).json({ message: '배달 완료 처리되었습니다!'})
  } catch {
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }

});

// 3. 고객 주문조회 (성공)
router.get('/user/order/:orderId', authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user
    const { orderId } = req.params;

    if (!orderId) {
      res.status(404).json({ message: '주문정보가 조회되지 않습니다.' });
    }
    const order = await Orders.findOne({
      attributes: ['payAmount', 'address', 'delivery', 'createdAt'],
      where: { [Op.and]: [ { userId }, {orderId} ] },
    });
    if (!order) {
      res.status(404).json({ message: '주문 정보가 존재하지 않습니다.' });
    }
    return res.status(200).json({ data: order})
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

// // 4. 고객 주문취소
// router.delete('/user/order/:orderId', authMiddleware, async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { userId } = res.locals.user;

//     if (!orderId) {
//       res.status(404).json({ message: '주문정보가 조회되지 않습니다.' });
//     }

//     const transaction = await Sequelize.transaction({
//       isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, //격리수준 설정
//     });
//     try {
//       const user = await OrderMenus.destroy({ where: userId }, { transaction });
//       const afterpoint = user.point + totalPrice;
//       await Users.update({ point: afterpoint }, { transaction });
//       await transaction.commit();
//     } catch (transactionError) {
//       await transaction.rollback();
//       throw new Error(transactionError);
//     }

//     const order = await Orders.findOne({ where: { orderId } });
//     if (!order) {
//       res.status(404).json({ message: '주문정보가 존재하지 않습니다.' });
//     }

//     await Orders.destroy({
//       where: { [Op.and]: [{ orderId }, { userId }] },
//     });
//     return res.status(200).json({ message: '주문 정보가 정상적으로 취소처리 되었습니다.' });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
//   }
// });

// 5. 사장님 주문 조회 API 
router.get('/ceo/:storeId/order', ceoAuthMiddleware, async (req, res) => {
  const { ceoId } = res.locals.user;
  const { storeId } = req.params;

  try {
    const orders = await Orders.findAll({
      attributes: ['payAmount', 'address'],
      order: [['createdAt', 'DESC']],
      where: { storeId }
    });
    return res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '사장님 주문 전체 조회 과정에 오류가 발생하였습니다.' });
  }
});

// 6. 사장님 주문 상세 조회 (완성)
router.get('/ceo/:storeId/order/:orderId', ceoAuthMiddleware, async (req, res) => {
  const { ceoId } = res.locals.user;
  const { orderId } = req.params;

  try {
    const order = await Orders.findOne({ where: { orderId } })
    console.log('order =>', order)
    const userId = order.userId
    console.log('userId =>', userId)
    const orderMenus = await OrderMenus.findAll({
      attributes: ['totalPrice', 'quantity'],
      where: { [Op.and]: [ { userId }, { orderId } ] }
    })
    return res.status(200).json({ data: orderMenus });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '사장님 주문 상세 조회 과정에 오류가 발생하였습니다.' });
  }
});

// 7. 사장님 주문 취소 API (완성)
router.delete('/ceo/:storeId/order/:orderId', ceoAuthMiddleware, async (req, res) => {
  const { ceoId } = res.locals.user;
  const { storeId, orderId } = req.params;
  try {
    await Orders.destroy({
      where: { [Op.and]: [{ storeId: storeId }, { orderId: orderId }] },
    });
    return res.status(200).json({ message: '사장님 주문 취소 완료' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '사장님 주문 취소 과정에 오류가 발생하였습니다.' });
  }
});

module.exports = router;
